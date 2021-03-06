import { S3 } from 'aws-sdk';
import { MongoClient } from 'mongodb';
import config from '../config';
import fetchAuthRepo from '../fetchAuthRepo';
import localStorageRepo from '../localStorageRepo';
import memoryModelsRepo from '../memoryModelsRepo';
import Profile from '../models/Profile';
import mongoAuthRepo from '../mongoAuthRepo';
import mongoModelsRepo from '../mongoModelsRepo';
import s3StorageRepo from '../s3StorageRepo';
import testAuthRepo from '../testAuthRepo';
import AuthRepo from './AuthRepo';
import ModelsRepo from './ModelsRepo';
import Repo from './Repo';
import StorageRepo from './StorageRepo';

/* istanbul ignore next */
const getAuthRepo = (): AuthRepo => {
  switch (config.repoFactory.authRepoName) {
    case 'test':
      return testAuthRepo({});
    case 'fetch':
      return fetchAuthRepo({
        llClientInfoEndpoint: config.fetchAuthRepo.llClientInfoEndpoint,
      });
    default: case 'mongo':
      return mongoAuthRepo({
        db: MongoClient.connect(config.mongoModelsRepo.url),
      });
  }
};

/* istanbul ignore next */
const getModelsRepo = (): ModelsRepo => {
  switch (config.repoFactory.modelsRepoName) {
    case 'mongo':
      return mongoModelsRepo({
        db: MongoClient.connect(config.mongoModelsRepo.url),
      });
    default: case 'memory':
      return memoryModelsRepo({
        state: {
          agentProfiles: [] as Profile[],
        },
      });
  }
};

/* istanbul ignore next */
const getStorageRepo = (): StorageRepo => {
  switch (config.repoFactory.storageRepoName) {
    case 's3':
      return s3StorageRepo({
        bucketName: config.s3StorageRepo.bucketName,
        client: new S3(config.s3StorageRepo.awsConfig),
        subFolder: config.s3StorageRepo.subFolder,
      });
    default:
    case 'local':
      return localStorageRepo(config.localStorageRepo);
  }
};

export default (): Repo => {
  const authRepo = getAuthRepo();
  const modelsRepo = getModelsRepo();
  const storageRepo = getStorageRepo();

  return {
    ...authRepo,
    ...modelsRepo,
    ...storageRepo,

    clearRepo: async () => {
      await modelsRepo.clearRepo();
      await storageRepo.clearRepo();
    },
    migrate: async () => {
      await modelsRepo.migrate();
      await storageRepo.migrate();
    },
    rollback: async () => {
      await modelsRepo.rollback();
      await storageRepo.rollback();
    },
  };
};
