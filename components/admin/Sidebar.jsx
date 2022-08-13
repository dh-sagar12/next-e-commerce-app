
import {
    HomeOutlined,
    GoldOutlined,
    AppstoreAddOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import Router from  'next/router';
const { Sider } = Layout;


const Sidebar = (props) => {
    let {collapsed} = props



    const items = [
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'Home',
            href: '/admin/dashboard'

        },
        {
            key: '2',
            icon: <GoldOutlined />,
            label: 'Products',
            href: '/admin/product'
        },
        {
            key: '3',
            icon: <AppstoreAddOutlined />,
            label: 'Inventory',
            href: '/admin/inventory',

        },
        {
            key: '4',
            icon: <ShoppingCartOutlined />,
            label: 'Orders',
            href: '/admin/orders'
        }
    ]

    const handleMenuClick  = (item)=>{
        console.log(item);
        Router.push(item.item.props.href)
        
    }

    return (
        <>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo h-16 w-5 " />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items}  onSelect={handleMenuClick}>
                   
                </Menu>
            </Sider>
        </>
    )
}

export default Sidebar 