import * as env from 'env-var';
import 'dotenv/config';

const config = {
  rabbit: {
    url: env.get('RABBIT_URI').required().asString(),
    retryOptions: {
      minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
      retries: env.get('RABBIT_RETRY_RETRIES').default(5).asIntPositive(),
      factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
    },
    logQueue: env.get('LOG_QUEUE').required().asString(),
    queues: {
      listenCollections: env.get('LISTEN_COLLECTIONS').required().asJsonObject(),
    },
  },
  mongo: {
    uri: env.get('MONGO_URI').required().asString(),
    lastEventCollectionName: env.get('LAST_EVENT_COLLECTION_NAME').required().asString(),
    shouldHandleMissingEvents: env.get('SHOULD_HANDLE_MISSING_EVENTS').default('true').asBool(),
  },
  metaData: {
    systemName: env.get('SYSTEM_NAME').required().asString(),
    serviceName: env.get('SERVICE_NAME').required().asString(),
  },
};

export default config;
