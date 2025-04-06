/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { MongoChangeStreamError, Timestamp } from 'mongodb';
import { RabbitService } from '../rabbit/rabbit.service';
import { LastEventRepo } from '../lastEvent/lastEvent.repo';
import config from '../config/env.config';
import { ListenerRepo } from './listener.repo';
import { ListenerService } from './listener.service';

const collectionNames = Object.keys(config.rabbit.queues.listenCollections);

jest.mock('logger-genesis');

describe('ListenerService', () => {
  let service: ListenerService;
  let lastEventRepo: LastEventRepo;
  let listenerRepo: ListenerRepo;
  let rabbitService: RabbitService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListenerService,
        {
          provide: LastEventRepo,
          useValue: {
            findLastEvent: jest.fn(),
            updateLastEvent: jest.fn(),
          },
        },
        {
          provide: ListenerRepo,
          useValue: {
            initiateChangeStream: jest.fn(),
          },
        },
        {
          provide: RabbitService,
          useValue: {
            publishMessageToQueue: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ListenerService>(ListenerService);
    lastEventRepo = module.get<LastEventRepo>(LastEventRepo);
    listenerRepo = module.get<ListenerRepo>(ListenerRepo);
    rabbitService = module.get<RabbitService>(RabbitService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(lastEventRepo).toBeDefined();
    expect(listenerRepo).toBeDefined();
    expect(rabbitService).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should start change stream with last event', async () => {
      const mockLastEvent = {
        _id: new Types.ObjectId('82671544A8000000032B022C'),
        id: '82671544A8000000032B022C0100296E5A1004A57805A7BF5B4B4C914A45B978DF783046645F69640064670C1330934AB81AEE32CD8B0004',
        eventTime: new Date(),
        collectionName: collectionNames[0],
      };

      const mockChangeStream = {
        hasNext: jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false),
        next: jest.fn().mockResolvedValueOnce({
          _id: { _data: mockLastEvent.id },
          operationType: 'insert',
          clusterTime: { getHighBits: jest.fn().mockReturnValueOnce(100) },
        }),
      };

      jest.spyOn(lastEventRepo, 'findLastEvent').mockResolvedValueOnce(mockLastEvent);
      jest.spyOn(service, 'startChangeStream').mockResolvedValue(mockChangeStream as any);

      const startChangeStreamSpy = jest.spyOn(service, 'startChangeStream');

      await service.onModuleInit();

      expect(startChangeStreamSpy).toHaveBeenCalledWith(collectionNames[0], mockLastEvent.id);
    });

    it('should start change stream without last event', async () => {
      const mockChangeStream = {
        hasNext: jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false),
        next: jest.fn().mockResolvedValueOnce({
          operationType: 'insert',
          clusterTime: { getHighBits: jest.fn().mockReturnValueOnce(100) },
        }),
      };

      jest.spyOn(lastEventRepo, 'findLastEvent').mockResolvedValueOnce(null);
      jest.spyOn(service, 'startChangeStream').mockResolvedValue(mockChangeStream as any);
      const startChangeStreamSpy = jest.spyOn(service, 'startChangeStream');

      await service.onModuleInit();

      expect(startChangeStreamSpy).toHaveBeenCalledWith(collectionNames[0], undefined);
    });
  });

  describe('startChangeStream', () => {
    it('should start change stream without last event', async () => {
      const mockChangeDoc = {
        _id: { _data: 'mockId' },
        fullDocument: { data: 'mockData' },
        operationType: 'insert',
        clusterTime: new Timestamp({ t: 100, i: 10 }),
      };

      const mockChangeStream = {
        hasNext: jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false),
        next: jest.fn().mockResolvedValueOnce(mockChangeDoc),
      };

      jest.spyOn(listenerRepo, 'initiateChangeStream').mockReturnValueOnce(mockChangeStream as any);

      await service.startChangeStream(collectionNames[0]);

      expect(mockChangeStream.hasNext).toHaveBeenCalled();
      expect(mockChangeStream.next).toHaveBeenCalled();
      expect(lastEventRepo.updateLastEvent).toHaveBeenCalledWith(
        collectionNames[0],
        mockChangeDoc._id._data,
        new Date(100 * 1000),
      );
    });

    it('should start change stream with last event and throw error and retry', async () => {
      const error = new MongoChangeStreamError('');
      error.code = ListenerService.changeStreamHistoryLostError;

      const mockChangeStreamError = {
        hasNext: jest.fn().mockRejectedValue(error as never),
      };

      const mockChangeStreamNext = {
        hasNext: jest.fn().mockResolvedValue(false),
      };

      jest
        .spyOn(listenerRepo, 'initiateChangeStream')
        .mockReturnValueOnce(mockChangeStreamError as any)
        .mockReturnValueOnce(mockChangeStreamError as any)
        .mockReturnValueOnce(mockChangeStreamNext as any);

      await service.startChangeStream(collectionNames[0]);

      expect(listenerRepo.initiateChangeStream).toHaveBeenCalledTimes(4);
    });

    it('should start change stream few times and throw', async () => {
      const error = new MongoChangeStreamError('');
      error.code = ListenerService.changeStreamHistoryLostError;

      const mockChangeStreamError = {
        hasNext: jest.fn().mockRejectedValue(error as never),
      };

      jest.spyOn(listenerRepo, 'initiateChangeStream').mockReturnValue(mockChangeStreamError as any);

      await expect(service.startChangeStream(collectionNames[0])).rejects.toThrow();
    });

    it('should handle undefined clusterTime and take fallback 0', async () => {
      const mockChangeDoc = {
        _id: { _data: 'mockId' },
        fullDocument: { data: 'mockData' },
        operationType: 'insert',
        clusterTime: undefined,
      };

      const mockChangeStream = {
        hasNext: jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false),
        next: jest.fn().mockResolvedValueOnce(mockChangeDoc),
      };

      jest.spyOn(listenerRepo, 'initiateChangeStream').mockReturnValueOnce(mockChangeStream as any);

      await service.startChangeStream(collectionNames[0]);

      expect(mockChangeStream.hasNext).toHaveBeenCalled();
      expect(mockChangeStream.next).toHaveBeenCalled();
      expect(lastEventRepo.updateLastEvent).toHaveBeenCalledWith(
        collectionNames[0],
        mockChangeDoc._id._data,
        new Date(0),
      );
    });
  });

  it('should start change stream with last event and throw error and not retry', async () => {
    const error = new MongoChangeStreamError('');

    const mockChangeStreamError = {
      hasNext: jest.fn().mockRejectedValueOnce(error as never),
    };

    jest.spyOn(listenerRepo, 'initiateChangeStream').mockReturnValueOnce(mockChangeStreamError as any);

    await expect(service.startChangeStream(collectionNames[0])).rejects.toThrow();
  });
});
