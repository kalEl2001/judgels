import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import { contest } from '../../../../../../fixtures/state';
import {
  ContestAnnouncement,
  ContestAnnouncementsResponse,
} from '../../../../../../modules/api/uriel/contestAnnouncement';

import ContestAnnouncementsPage from './ContestAnnouncementsPage';
import { ContestAnnouncementCard } from '../ContestAnnouncementCard/ContestAnnouncementCard';
import { contestReducer, PutContest } from '../../../modules/contestReducer';
import * as contestAnnouncementActions from '../modules/contestAnnouncementActions';

jest.mock('../modules/contestAnnouncementActions');

describe('ContestAnnouncementsPage', () => {
  let wrapper: ReactWrapper<any, any>;

  const response: ContestAnnouncementsResponse = {
    data: { page: [], totalCount: 0 },
    config: { canSupervise: true, canManage: true },
    profilesMap: {
      userJid1: { username: 'username1' },
      userJid2: { username: 'username2' },
    },
  };

  const render = () => {
    const store: any = createStore(
      combineReducers({ uriel: combineReducers({ contest: contestReducer }), form: formReducer }),
      applyMiddleware(thunk)
    );
    store.dispatch(PutContest.create(contest));

    wrapper = mount(
      <IntlProvider locale={navigator.language}>
        <Provider store={store}>
          <MemoryRouter>
            <ContestAnnouncementsPage />
          </MemoryRouter>
        </Provider>
      </IntlProvider>
    );
  };

  beforeEach(() => {
    (contestAnnouncementActions.getAnnouncements as jest.Mock).mockReturnValue(() => Promise.resolve(response));
    (contestAnnouncementActions.createAnnouncement as jest.Mock).mockReturnValue(() => Promise.resolve({}));
    (contestAnnouncementActions.updateAnnouncement as jest.Mock).mockReturnValue(() => Promise.resolve({}));
  });

  describe('when there are no announcements', () => {
    beforeEach(() => {
      render();
    });

    it('shows placeholder text and no announcements', async () => {
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();

      expect(wrapper.text()).toContain('No announcements.');
      expect(wrapper.find(ContestAnnouncementCard)).toHaveLength(0);
    });
  });

  describe('when there are announcements', () => {
    beforeEach(() => {
      const announcements: ContestAnnouncement[] = [
        {
          jid: 'jid1',
          userJid: 'userJid1',
          title: 'title1',
          content: 'content1',
          updatedTime: 0,
        } as ContestAnnouncement,
        {
          jid: 'jid2',
          userJid: 'userJid2',
          title: 'title2',
          content: 'content2',
          updatedTime: 0,
        } as ContestAnnouncement,
      ];
      (contestAnnouncementActions.getAnnouncements as jest.Mock).mockReturnValue(() =>
        Promise.resolve({ ...response, data: { page: announcements, totalCount: 2 } })
      );

      render();
    });

    it('shows the announcements', async () => {
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();

      expect(wrapper.find(ContestAnnouncementCard)).toHaveLength(2);
    });
  });
});
