import React from 'react'
const { Content } = Layout;
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';



const AppLayout = (props) => {

    const [collapsed, setCollapsed] = useState(false);

    let { Component, pageProps } = props
    return (
        <>
            <Layout>
                <Sidebar collapsed={collapsed} />
                <Layout>
                    <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />
                    <Content className='mx-3 my-5  h-screen  bg-white border-gray-100 border rounded-md shadow-md' >
                            <div className='h-screen overflow-scroll'>
                                <Component {...pageProps} />
                            </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    )

}

export default AppLayout   