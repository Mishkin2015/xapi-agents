import assertProfile from '../../../utils/assertProfile';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_INVALID_AGENT,
  TEST_INVALID_JSON_CONTENT,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import overwriteProfile from './utils/overwriteProfile';

describe('expressPresenter.putProfile with non-existing model', () => {
  setup();

  it('should create when using valid agent', async () => {
    await overwriteProfile().expect(NO_CONTENT_204_HTTP_CODE);
    await assertProfile(TEST_CONTENT);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await overwriteProfile({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using invalid json in agent', async () => {
    await overwriteProfile({
      agent: TEST_INVALID_JSON_CONTENT,
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the agent', async () => {
    await overwriteProfile({ agent: undefined }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the profile id', async () => {
    await overwriteProfile({ profileId: undefined }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid json content', async () => {
    await overwriteProfile({}, TEST_INVALID_JSON_CONTENT, JSON_CONTENT_TYPE)
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
