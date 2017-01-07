import React from 'react';
import { Tabs, Icon } from 'antd';

const TabPane = Tabs.TabPane;

const Profile = () => (
  <Tabs defaultActiveKey="2">
    <TabPane tab={<span><Icon type="setting" />Account Details</span>} key="1">
      Account Details
    </TabPane>
    <TabPane tab={<span><Icon type="calculator" />Games Played</span>} key="2">
      Games Played
    </TabPane>
    <TabPane tab={<span><Icon type="credit-card" />Balance</span>} key="3">
      Balance
    </TabPane>
  </Tabs>
);

export default Profile;
