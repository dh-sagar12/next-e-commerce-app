import React from 'react'
import { message, Tabs } from 'antd';
const { TabPane } = Tabs;
import AddProductForm from './AddProductForm';
import { useState, useEffect } from 'react';
import ProductItems from './ProductItems';
import { useDispatch } from 'react-redux'
import axios from 'axios';




const AddProductTabs = () => {



    const [activeTabKey, setActiveTabKey] = useState("1")
    const [FormFinished, setFormFinished] = useState(false)
    const [FetchedCategoriesData, setFetchedCategoriesData] = useState()
    // const [NewProductState, setNewProductState] = useState({})

    const [CategoryData, setCategoryData] = useState([])
    // const [SubCategoryData, setSubCategoryData] = useState({})
    const [BrandsData, setBrandsData] = useState([])

    const dispatch = useDispatch()






    useEffect(() => {
        axios.get('http://localhost:8000/api/get-category/').then(res => {
            let fetchedCategories = res.data
            setFetchedCategoriesData(fetchedCategories)
            let categoryList = []
            fetchedCategories.forEach(e => {
                categoryList.push({
                    label: e.category_name,
                    value: e.id
                })
           
        })
        setCategoryData(categoryList)
    }).catch(e => {
        message.error(`Error; ${e.toString()}`)
    })

    axios.get('http://localhost:8000/api/get-brands/').then(res => {
        let fetchedBrands = res.data
        let brands = []
        fetchedBrands.forEach(e => {
            brands.push({
                label: e.brand_name,
                value: e.id
            })

        })
        setBrandsData(brands)
    }).catch(e => {
        message.error(`Error: ${e.toString()}`)
    })
}, [])





const handleTabClick = (key) => {
    if (FormFinished && key < activeTabKey) {
        setActiveTabKey(key)
    }
}





return (
    <>
        <Tabs activeKey={activeTabKey} size='large' className='font-extrabold' onTabClick={handleTabClick} >
            <TabPane tab="Product" key="1"  >
                <AddProductForm setActiveTabKey={setActiveTabKey} setFormFinished={setFormFinished} CategoryData={CategoryData}
                BrandsData={BrandsData} FetchedCategoriesData={FetchedCategoriesData} />
            </TabPane>
            <TabPane tab="Product Items" key="2" >
                <ProductItems setActiveTabKey={setActiveTabKey} setFormFinished={setFormFinished} />
            </TabPane>

        </Tabs>
    </>
)
}

export default AddProductTabs;