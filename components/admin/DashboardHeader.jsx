
import {
    HomeOutlined,
    GoldOutlined,
    AppstoreAddOutlined,
    ShoppingCartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
  
  } from '@ant-design/icons';
  
  import { Layout, Menu } from 'antd';
  import React, { useState, useEffect } from 'react';
  import 'antd/dist/antd.css';
  const { Header, Sider, Content } = Layout;

const DashboardHeader = (props ) => {
   
    const {collapsed, setCollapsed} =  props
    
    const [Time, setTime] = useState(null)


  const getTodayTime = ()=>{
    let today=   new Date().toLocaleDateString('pt-PT')
    return today
  }

  useEffect(() => {
    let time  =  getTodayTime()
    setTime(time)
  }, [])
  
  getTodayTime()
    return (
        <>
            <Header
                className="site-layout-background bg-gray-50 shadow-md" 
                style={{
                    padding: 0,
                }}
            >
                <div className='flex flex-row items-center justify-between mx-8'>
                    <div className='flex items-center  '>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger text-2xl text-dark hover:text-purple-500 ',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <p className='m-0 p-0 py-4 mx-14 leading-none text-gray-600 text-[15px] font-bold' >Manakamana Store Pvt Ltd</p>
                        <p className='m-0 p-0 py-4 text-gray-600 leading-none  text-[15px] font-bold'>Hi Sagar</p>
                    </div>
                    <div className='today-time'>
                        <p className='m-0 p-0 py-4 mx-14 leading-none text-gray-600 text-[15px] font-bold'> {Time}</p>
                    </div>

                    <div className=' text-gray-900 hover:text-purple-600  text-2xl cursor-pointer'>
                        <LogoutOutlined />
                    </div>
                </div>
            </Header>
        </>
    )
}

export default DashboardHeader 