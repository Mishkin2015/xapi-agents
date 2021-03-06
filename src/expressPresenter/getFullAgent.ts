import { Request, Response } from 'express';
import { xapiHeaderVersion } from '../utils/constants';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getAgent from './utils/getAgent';
import getClient from './utils/getClient';
import { OK_200_HTTP_CODE } from './utils/httpCodes';
import validateVersionHeader from './utils/validateVersionHeader';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));
    validateVersionHeader(req.header('X-Experience-API-Version'));
    const agent = getAgent(req.query.agent);
    const result = await config.service.getFullAgent({ client, agent });
    res.status(OK_200_HTTP_CODE);
    res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
    res.json(result);
  });
};
