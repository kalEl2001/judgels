import * as React from 'react';

import { ContentCardLink } from '../../../../../../components/ContentCardLink/ContentCardLink';
import { FormattedDate } from '../../../../../../components/FormattedDate/FormattedDate';
import { Contest } from '../../../../../../modules/api/uriel/contest';

import './ContestCard.css';

export interface ContestCardProps {
  contest: Contest;
}

export class ContestCard extends React.PureComponent<ContestCardProps> {
  render() {
    const { contest } = this.props;

    return (
      <ContentCardLink to={`/competition/contests/${contest.id}`}>
        <h4 className="contest-card-name">{contest.name}</h4>
        <p className="contest-card-date">
          <small>{this.renderBeginTime(contest)}</small>
        </p>
      </ContentCardLink>
    );
  }

  private renderBeginTime = (contest: Contest) => {
    return <FormattedDate value={contest.beginTime} />;
  };
}
