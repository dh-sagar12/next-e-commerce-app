// import {
//   HomeOutlined,
//   GoldOutlined,
//   AppstoreAddOutlined,
//   ShoppingCartOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   LogoutOutlined

// } from '@ant-design/icons';

// import { Layout, Menu } from 'antd';
// import React, { useState, useEffect } from 'react';
// import 'antd/dist/antd.css';
// import Link from 'next/link';
// // import AddProduct from '../../pages/admin/add-product';
// const { Header, Sider, Content } = Layout;

// const NavHeader = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [Time, setTime] = useState(null)


//   let getTodayTime = ()=>{
//     let today=   new Date().toLocaleDateString('pt-PT')
//     return today
//   }

//   useEffect(() => {
//     let time  =  getTodayTime()
//     setTime(time)
//   }, [])
  
//   getTodayTime()
//   return (

//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="logo h-16 w-5 " />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           items={[
//             {
//               key: '1',
//               icon: <HomeOutlined />,
//               label: 'Home',
//               href: 'admin/dashboard'
              
//             },
//             {
//               key: '2',
//               icon: <GoldOutlined />,
//               label: 'Products',
//               href: 'admin/product'
//             },
//             {
//               key: '3',
//               icon:<AppstoreAddOutlined />,
//               label: 'Inventory',
//               href: 'admin/inventory',

//             },
//             {
//               key: '4',
//               icon: <ShoppingCartOutlined />,
//               label: 'Orders',
//               href: 'admin/orders'
//             }
//           ]}
//         />
//       </Sider>
//       <Layout className="site-layout">
//         <Header
//           className="site-layout-background bg-gray-50"
//           style={{
//             padding: 0,
//           }}
//         >
//           <div className='flex flex-row items-center justify-between mx-8'>
//             <div className='flex items-center  '>
//               {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//                 className: 'trigger text-2xl text-dark hover:text-purple-500 ',
//                 onClick: () => setCollapsed(!collapsed),
//               })}
//               <p className='m-0 p-0 py-4 mx-14 leading-none text-gray-600 text-[15px]' >Manakamana Store pvt ltd</p>
//               <p className='m-0 p-0 py-4 text-gray-600 leading-none  text-[15px]'>Hi Sagar</p>
//             </div>
//             <div className='today-time'>
//               <p className='m-0 p-0 py-4 mx-14 leading-none text-gray-600 text-[15px]'> {Time}</p>
//             </div>

//             <div className=' text-gray-900 hover:text-purple-600  text-2xl cursor-pointer'>
//               <LogoutOutlined />
//             </div>
//           </div>
//         </Header>
//         <Content className='m-4  bg-white min-h-screen'>
//           <div className='h-screen overflow-scroll'>
//              <AddProduct/>
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default NavHeader;