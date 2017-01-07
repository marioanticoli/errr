import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout } from 'antd';
// import {} from './app.less';
import MessageList from './message-list';
import MessageEntryBox from './message-entry-box';
import * as messageActionCreators from '../actions/message-actions';

import Navigation from './navigation';

// require('../../node_modules/antd/dist/antd.less');
import '../../node_modules/antd/dist/antd.less';

const { Header, Sider, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Header>
          <Navigation active={this.props.activePage} />
        </Header>
        <Layout>
          <Content>
            {this.props.children}
          </Content>
          <Sider>
            <MessageList userId={this.props.userId} messages={this.props.messages} />
            <MessageEntryBox
              value={this.props.currentMessage}
              userId={this.props.userId}
              onChange={this.props.updateMessage}
              onSubmit={this.props.addMessage}
            />
          </Sider>
        </Layout>
        <Footer>
          Some info
        </Footer>
      </Layout>
    );
  }
}

App.propTypes = {
  activePage: React.PropTypes.string,
  children: React.PropTypes.node,
  userId: React.PropTypes.number,
  messages: React.PropTypes.arrayOf(React.PropTypes.string),
  currentMessage: React.PropTypes.string,
  updateMessage: React.PropTypes.func,
  addMessage: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    userId: state.userId,
    messages: state.messages,
    currentMessage: state.currentMessage,
    activePage: state.activePage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addMessage: messageActionCreators.addMessage,
    updateMessage: messageActionCreators.updateMessage,
    setActivePage: messageActionCreators.setActivePage,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
