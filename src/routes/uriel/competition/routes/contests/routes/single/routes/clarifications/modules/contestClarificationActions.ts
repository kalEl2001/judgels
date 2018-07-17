import { selectToken } from '../../../../../../../../../../modules/session/sessionSelectors';
import { ContestClarificationData } from '../../../../../../../../../../modules/api/uriel/contestClarification';

export const contestClarificationActions = {
  create: (contestJid: string, data: ContestClarificationData) => {
    return async (dispatch, getState, { contestClarificationAPI, toastActions }) => {
      const token = selectToken(getState());
      await contestClarificationAPI.createClarification(token, contestJid, data);
      toastActions.showSuccessToast('Clarification submitted.');
    };
  },

  fetchConfig: (contestJid: string, language: string) => {
    return async (dispatch, getState, { contestClarificationAPI }) => {
      const token = selectToken(getState());
      return await contestClarificationAPI.getClarificationConfig(token, contestJid, language);
    };
  },

  fetchMyList: (contestJid: string, language: string) => {
    return async (dispatch, getState, { contestClarificationAPI }) => {
      const token = selectToken(getState());
      return await contestClarificationAPI.getMyClarifications(token, contestJid, language);
    };
  },

  alertNewAnswered: () => {
    return async (dispatch, getState, { toastActions }) => {
      toastActions.showAlertToast('You have new answered clarification(s).');
    };
  },
};
