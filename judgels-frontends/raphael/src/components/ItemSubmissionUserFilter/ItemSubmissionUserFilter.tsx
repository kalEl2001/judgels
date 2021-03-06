import { ButtonGroup, Button } from '@blueprintjs/core';
import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';

import './ItemSubmissionUserFilter.css';

interface ItemSubmissionUserFilterProps extends RouteComponentProps {
  push: (url: string) => void;
}

class ItemSubmissionUserFilter extends React.Component<ItemSubmissionUserFilterProps> {
  render() {
    return (
      <ButtonGroup className="submission-user-filter" fill>
        <Button active={!this.isAll()} text="My result" onClick={this.clickMine} />
        <Button active={this.isAll()} text="All submissions" onClick={this.clickAll} />
      </ButtonGroup>
    );
  }

  private isAll = () => {
    return (this.props.location.pathname + '/').includes('/all/');
  };

  private clickMine = () => {
    if (this.isAll()) {
      const idx = this.props.location.pathname.lastIndexOf('/all');
      this.props.push(this.props.location.pathname.substr(0, idx));
    }
  };

  private clickAll = () => {
    if (!this.isAll()) {
      this.props.push((this.props.location.pathname + '/all').replace('//', '/'));
    }
  };
}

const mapDispatchToProps = {
  push,
};

export default withRouter(connect(undefined, mapDispatchToProps)(ItemSubmissionUserFilter));
