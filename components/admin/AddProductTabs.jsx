import React from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { Button, Checkbox, Form, Input } from 'antd';


const AddProductTabs = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    const tabs = [
        {
            title: 'Product Details',
            key: 1,

        }
    ]
    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Tab 1" key="1">
                    tab 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    
                </TabPane>
            </Tabs>
        </>
    )
}

export default AddProductTabs;