import { profileActions } from './profileActions';
import { user } from '../../../../fixtures/state';
import { AppState } from '../../../../modules/store';
import { PublicUserProfile } from '../../../../modules/api/jophiel/userProfile';
import { UsernamesMap } from '../../../../modules/api/jophiel/user';

describe('profileActions', () => {
  let dispatch: jest.Mock<any>;
  let userProfileAPI: jest.Mocked<any>;
  let userAPI: jest.Mocked<any>;
  const getState = (): Partial<AppState> => ({});

  beforeEach(() => {
    dispatch = jest.fn();

    userProfileAPI = {
      getPublicProfile: jest.fn(),
    };

    userAPI = {
      getUsersByUsernames: jest.fn(),
    };
  });

  describe('getPublicProfile()', () => {
    const { getPublicProfile } = profileActions;
    const doGetPublicProfile = async () =>
      getPublicProfile(user.username)(dispatch, getState, { userProfileAPI, userAPI });

    describe('when user found', () => {
      beforeEach(async () => {
        const publicUserProfile: PublicUserProfile = { name: 'dummy' };
        const users: UsernamesMap = { [user.username]: user };
        userAPI.getUsersByUsernames.mockReturnValue(users);
        userProfileAPI.getPublicProfile.mockReturnValue(publicUserProfile);

        await doGetPublicProfile();
      });

      it('calls API to get user', () => {
        expect(userAPI.getUsersByUsernames).toHaveBeenCalledWith([user.username]);
      });

      it('calls API to get public profile', () => {
        expect(userProfileAPI.getPublicProfile).toHaveBeenCalledWith(user.jid);
      });
    });

    describe('when user not found', () => {
      beforeEach(async () => {
        const users: UsernamesMap = {};
        userAPI.getUsersByUsernames.mockReturnValue(users);
      });

      it('throws NotFoundError', async () => {
        await expect(doGetPublicProfile()).rejects.toMatchObject({});
      });
    });
  });
});