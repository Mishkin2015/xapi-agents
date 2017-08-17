import assertDeleted from '../../../utils/assertDeleted';
import createTextProfile from '../../../utils/createTextProfile';
import {
  ALTERNATE_CONTENT_TYPE,
  TEST_MBOX_AGENT,
  TEST_PROFILE_ID,
} from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter.deleteProfile using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should delete when deleting text', async () => {
    await createTextProfile();
    await supertest
      .post('/xAPI/agents/profile')
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .query({ method: 'DELETE' })
      .send({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        profileId: TEST_PROFILE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted();
  });
});