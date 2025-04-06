import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb';
import { getModelToken } from '@nestjs/mongoose';
import config from '../config/env.config';
import { LastEventRepo } from './lastEvent.repo';
import { LastEvent, LastEventSchema } from './lastEvent.schema';

const collectionNames = Object.keys(config.rabbit.queues.listenCollections);

jest.mock('logger-genesis');

describe('LastEventRepo', () => {
  let lastEventRepo: LastEventRepo;
  let mongodbContainer: StartedMongoDBContainer;

  beforeAll(async () => {
    mongodbContainer = await new MongoDBContainer('mongo:7.0').start();
    await mongoose.connect(mongodbContainer.getConnectionString(), { directConnection: true });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LastEventRepo,
        {
          provide: getModelToken(LastEvent.name),
          useValue: mongoose.model(LastEvent.name, LastEventSchema),
        },
      ],
    }).compile();

    lastEventRepo = module.get<LastEventRepo>(LastEventRepo);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongodbContainer.stop();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(lastEventRepo).toBeDefined();
  });

  it('should find last event', async () => {
    const lastEvent = await lastEventRepo.findLastEvent(collectionNames[0]);

    expect(lastEvent).toBeNull();
  });

  it('should update last event', async () => {
    const lastEvent = await lastEventRepo.updateLastEvent(collectionNames[0], 'testId', new Date());

    expect(lastEvent).toBeDefined();
  });
});
