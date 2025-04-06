import { Test, TestingModule } from '@nestjs/testing';
import config from '../config/env.config';
import { RabbitService } from './rabbit.service';

const collectionNames = Object.keys(config.rabbit.queues.listenCollections);

describe('RabbitService', () => {
  let service: RabbitService;
  let clientMock: any;

  beforeEach(async () => {
    clientMock = {
      emit: jest.fn().mockReturnValue({
        subscribe: jest.fn(),
      }),
      connect: jest.fn().mockResolvedValue(true),
      handleDisconnectError: jest.fn(),
      addListener: jest.fn(),
    };

    const queueProviders = Object.values(config.rabbit.queues.listenCollections).map((queueName) => ({
      provide: queueName,
      useValue: clientMock,
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitService, ...queueProviders],
    }).compile();

    service = module.get<RabbitService>(RabbitService);
  });

  describe('onApplicationBootstrap', () => {
    it('should handle disconnect error and listen to "disconnect" event', () => {
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);

      service.onApplicationBootstrap();
      expect(clientMock.handleDisconnectError).toBeDefined();

      clientMock.handleDisconnectError(clientMock);

      expect(clientMock.addListener).toHaveBeenCalledWith('disconnect', expect.any(Function));

      const [, callback] = clientMock.addListener.mock.calls[0];
      callback(new Error('test disconnect error'));

      expect(exitSpy).toHaveBeenCalledWith(1);
    });

    it('should call connect on client', () => {
      service.onApplicationBootstrap();
      expect(clientMock.connect).toHaveBeenCalled();
    });
  });

  describe('publishMessageToQueue', () => {
    it('should call client.emit with correct parameters', () => {
      const eventName = 'testEvent';
      const payload = { key: 'value' };
      const option = { someOption: true };

      service.publishMessageToQueue(collectionNames[0], eventName, payload, option);

      expect(clientMock.emit).toHaveBeenCalledWith(eventName, { eventName, payload, option });
      expect(clientMock.emit(eventName, { eventName, payload, option }).subscribe).toHaveBeenCalled();
    });

    it('should call client.emit without option parameter if not provided', () => {
      const eventName = 'testEvent';
      const payload = { key: 'value' };

      service.publishMessageToQueue(collectionNames[0], eventName, payload);

      expect(clientMock.emit).toHaveBeenCalledWith(eventName, { eventName, payload, option: undefined });
    });
  });
});
