import React, { Component } from 'react';
import {} from './message-entry-box.less';

class MessageEntryBox extends Component {
  handleChange(ev) {
    this.props.onChange(ev.target.value);
  }

  handleKeyPress(ev) {
    if (ev.which === 13) {
      const trimmedMessage = this.props.value.trim();

      if (trimmedMessage) {
        this.props.onSubmit({
          text: trimmedMessage,
          userId: this.props.userId,
          time: (new Date()).getTime(),
        });
      }

      ev.preventDefault();
    }
  }

  render() {
    return (
      <div className={'message-entry-box'}>
        <textarea
          name={'message'}
          placeholder={'Enter a message'}
          value={this.props.value}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
        />
      </div>
    );
  }
}

export default MessageEntryBox;
