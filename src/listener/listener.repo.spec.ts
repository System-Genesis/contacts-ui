/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb';
import { getModelToken } from '@nestjs/mongoose';
import config from '../config/env.config';
import { ListenerRepo } from './listener.repo';
import { createListenerSchema } from './listener.schema';

const collectionNames = Object.keys(config.rabbit.queues.listenCollections);

jest.mock('logger-genesis');

describe('ListenerRepo', () => {
  let listenerRepo: ListenerRepo;
  let mongodbContainer: StartedMongoDBContainer;

  beforeAll(async () => {
    mongodbContainer = await new MongoDBContainer('mongo:7.0').start();
    await mongoose.connect(mongodbContainer.getConnectionString(), { directConnection: true });

    const modelProviders = Object.keys(config.rabbit.queues.listenCollections).map((collectionName) => ({
      provide: getModelToken(collectionName),
      useValue: mongoose.model(collectionName, createListenerSchema(collectionName)),
      name: collectionName,
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ListenerRepo,
          useValue: new ListenerRepo(mongoose.connection),
        },
        ...modelProviders,
      ],
    }).compile();

    listenerRepo = module.get<ListenerRepo>(ListenerRepo);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongodbContainer.stop();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(listenerRepo).toBeDefined();
  });

  it('should return change stream', () => {
    const changeStream = listenerRepo.initiateChangeStream(collectionNames[0]);
    expect(changeStream).toBeDefined();
    expect(changeStream.hasNext).toBeDefined();
  });

  it('should return change stream with lastEventId', () => {
    const changeStream = listenerRepo.initiateChangeStream(collectionNames[0], 'testId');
    expect(changeStream).toBeDefined();
    expect(changeStream.hasNext).toBeDefined();
  });
});
