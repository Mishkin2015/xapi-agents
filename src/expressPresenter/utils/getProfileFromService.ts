import { Response } from 'express';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import { OK_200_HTTP_CODE } from './httpCodes';

export interface Options {
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly config: Config;
  readonly profileId: string;
  readonly res: Response;
}

export default async ({ agent, client, config, profileId, res }: Options) => {
  const getProfileResult = await config.service.getProfile({ agent, client, profileId });
  res.status(OK_200_HTTP_CODE);
  res.setHeader('ETag', `"${getProfileResult.etag}"`);
  res.setHeader('Last-Modified', getProfileResult.updatedAt.toISOString());
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.setHeader('Content-Type', getProfileResult.contentType);
  getProfileResult.content.pipe(res);
  return;
};
