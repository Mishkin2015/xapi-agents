import assertProfile from '../../../utils/assertProfile';
import createObjectProfile from '../../../utils/createObjectProfile';
import getTestProfile from '../../../utils/getTestProfile';
import {
  ALTERNATE_CONTENT_TYPE,
  JSON_CONTENT_TYPE,
  TEST_MBOX_AGENT,
  TEST_OBJECT_MERGED_CONTENT,
  TEST_OBJECT_PATCH_CONTENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter.postProfile using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should merge when patching with object content ', async () => {
    await createObjectProfile();
    const getProfileResult = await getTestProfile();
    await supertest
      .post('/xAPI/agents/profile')
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .query({
        method: 'POST',
      })
      .send({
        'Content-Type': JSON_CONTENT_TYPE,
        'If-Match': getProfileResult.etag,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        content: TEST_OBJECT_PATCH_CONTENT,
        profileId: TEST_PROFILE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertProfile(TEST_OBJECT_MERGED_CONTENT);
  });
});