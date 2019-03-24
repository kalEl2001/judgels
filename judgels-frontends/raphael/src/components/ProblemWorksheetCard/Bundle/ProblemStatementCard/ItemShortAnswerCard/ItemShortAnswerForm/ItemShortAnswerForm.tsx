import { Button, Intent, Classes, ControlGroup, Callout } from '@blueprintjs/core';
import * as classNames from 'classnames';
import * as React from 'react';

import { AnswerState, StatementButtonText } from 'components/ProblemWorksheetCard/Bundle/itemStatement';
import { Item, ItemShortAnswerConfig } from 'modules/api/sandalphon/problemBundle';

import './ItemShortAnswerForm.css';

export interface ItemShortAnswerFormProps extends Item {
  initialAnswer?: string;
  meta: string;
  onSubmit?: (answer?: string) => Promise<any>;
  answerState: AnswerState;
}

export interface ItemShortAnswerFormState {
  answerState: AnswerState;
  answer: string;
  wrongFormat: boolean;
}

export default class ItemShortAnswerForm extends React.PureComponent<
  ItemShortAnswerFormProps,
  ItemShortAnswerFormState
> {
  state: ItemShortAnswerFormState = {
    answerState: this.props.answerState,
    answer: this.props.initialAnswer || '',
    wrongFormat: false,
  };

  renderHelpText() {
    switch (this.state.answerState) {
      case AnswerState.NotAnswered:
        return (
          <Callout intent={Intent.NONE} icon="circle" className="callout">
            Not answered.
          </Callout>
        );
      case AnswerState.SavingAnswer:
        return (
          <Callout intent={Intent.NONE} icon="ban-circle" className="callout">
            Saving...
          </Callout>
        );
      case AnswerState.AnswerSaved:
        return (
          <Callout intent={Intent.PRIMARY} icon="confirm" className="callout">
            Answered.
          </Callout>
        );
      default:
        return <div />;
    }
  }

  renderSubmitButton() {
    let buttonText;
    let intent: Intent = Intent.PRIMARY;
    switch (this.state.answerState) {
      case AnswerState.NotAnswered:
        buttonText = StatementButtonText.Answer;
        break;
      case AnswerState.AnswerSaved:
        buttonText = StatementButtonText.Change;
        intent = Intent.NONE;
        break;
      default:
        buttonText = StatementButtonText.Submit;
    }
    return (
      <Button type="submit" text={buttonText} intent={intent} disabled={this.state.wrongFormat} className="button" />
    );
  }

  renderCancelButton() {
    return (
      this.state.answerState === AnswerState.Answering && (
        <Button
          type="button"
          text={StatementButtonText.Cancel}
          intent={Intent.DANGER}
          onClick={this.onCancelButtonClick}
          className="button"
        />
      )
    );
  }

  renderEmptyDiv() {
    return this.state.answerState !== AnswerState.Answering && <div className="button" />;
  }

  renderWrongFormatNotice() {
    return (
      this.state.wrongFormat && (
        <Callout intent={Intent.DANGER} icon="remove" className="callout">
          <strong>Wrong answer format!</strong>
        </Callout>
      )
    );
  }

  renderTextInput() {
    const readOnly =
      this.state.answerState === AnswerState.NotAnswered || this.state.answerState === AnswerState.AnswerSaved;
    const readOnlyClass = readOnly ? 'readonly' : '';
    return (
      <input
        name={this.props.meta}
        value={this.state.answer}
        onChange={this.onTextInputChange}
        readOnly={readOnly}
        className={`text-input ${readOnlyClass} ${classNames(Classes.INPUT)}`}
      />
    );
  }

  onTextInputChange = event => {
    const value = event.target.value as string;
    const config: ItemShortAnswerConfig = this.props.config as ItemShortAnswerConfig;
    const formatValid = value.match(config.inputValidationRegex);
    this.setState({ answer: event.target.value, wrongFormat: !formatValid });
  };

  onSubmit = async event => {
    event.preventDefault();
    const formValue = this.state.answer;
    if (this.state.answerState === AnswerState.NotAnswered || this.state.answerState === AnswerState.AnswerSaved) {
      this.setState({ answerState: AnswerState.Answering });
    } else {
      const oldValue = this.props.initialAnswer || '';
      const newValue = formValue;
      if (this.props.onSubmit && oldValue !== newValue) {
        this.setState({ answerState: AnswerState.SavingAnswer });
        await this.props.onSubmit(newValue);
        this.setState({ answerState: AnswerState.AnswerSaved });
      }
    }
  };

  onCancelButtonClick = () => {
    this.setState({ answerState: this.props.answerState, answer: this.props.initialAnswer!, wrongFormat: false });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit} className="item-short-answer-form">
        <ControlGroup fill className="answer-form">
          {this.renderTextInput()}
          {this.renderSubmitButton()}
          {this.renderCancelButton()}
        </ControlGroup>
        <div>{this.renderWrongFormatNotice()}</div>
        <div>{this.renderHelpText()}</div>
        <div className="clearfix" />
      </form>
    );
  }
}