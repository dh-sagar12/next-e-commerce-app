import React from 'react'
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import AddProductForm from './AddProductForm';
import { useState } from 'react';
import ProductItems from './ProductItems';
import {  useDispatch } from 'react-redux'




const AddProductTabs = () => {

    
 
    const [activeTabKey, setActiveTabKey] = useState("1")
    const [FormFinished, setFormFinished] = useState(false)
    const dispatch = useDispatch()

    const handleTabClick = (key) => {
        if (FormFinished && key < activeTabKey ){
            setActiveTabKey(key)
        }
    }


    return (
        <>
            <Tabs activeKey={activeTabKey} size='large' className='font-extrabold' onTabClick={handleTabClick} >
                <TabPane tab="Product" key="1"  >
                    <AddProductForm setActiveTabKey={setActiveTabKey} setFormFinished={setFormFinished} />
                </TabPane>
                <TabPane tab="Product Items" key="2" >
                   <ProductItems setActiveTabKey={setActiveTabKey} setFormFinished={setFormFinished}/>
                </TabPane>
              
            </Tabs>
        </>
    )
}

export default AddProductTabs;