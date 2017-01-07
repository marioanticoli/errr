import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.active,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key={'home'}>
          <a href={'/'}><Icon type={'home'} />Home</a>
        </Menu.Item>
        <Menu.Item key={'matchboard'}>
          <a href={'/matchboard'}><Icon type={'rocket'} />MatchBoard</a>
        </Menu.Item>
        <Menu.Item key={'profile'}>
          <a href={'/profile'}><Icon type={'user'} />Profile</a>
        </Menu.Item>
        <Menu.Item key={'aboutus'}>
          <a href={'/aboutus'}><Icon type={'team'} />About Us</a>
        </Menu.Item>
        <Menu.Item key={'contactus'}>
          <a href={'/contactus'}><Icon type={'customer-service'} />Contact Us</a>
        </Menu.Item>
      </Menu>
    );
  }
}
