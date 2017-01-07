import React, { Component } from 'react';
import {} from './message-list.less';

class MessageList extends Component {
  render() {
    return (
      <ol className={'message-list'}>
        {this.props.messages.map((message, index) => {
          let messageClass = '';
          let user = 'Me';
          const time = (new Date(message.time)).toLocaleTimeString();
          if (message.userId !== this.props.userId) {
            messageClass = 'is-response';
            user = `User ${message.userId}`;
          }
          return (
            <li key={`message-${index}`} className={'message-item'}>
              <p className={`message ${messageClass}`}>
                {user} @ {time} : {message.text}
              </p>
            </li>
          );
        })}
      </ol>
    );
  }
}

export default MessageList;
