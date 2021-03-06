import assertProfile from '../../../utils/assertProfile';
import { xapiHeaderVersion } from '../../../utils/constants';
import {
  JSON_CONTENT_TYPE,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

// These are regression tests for LearningLocker/learninglocker#999.
describe(__filename, () => {
  const { supertest } = setup();

  it('should not error when using a charset for JSON ', async () => {
    await supertest
      .put('/xAPI/agents/profile')
      .set('Content-Type', `${JSON_CONTENT_TYPE}; charset=UTF-8`)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .set('If-None-Match', '*')
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .send(TEST_OBJECT_CONTENT)
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertProfile(TEST_OBJECT_CONTENT);
  });
});
