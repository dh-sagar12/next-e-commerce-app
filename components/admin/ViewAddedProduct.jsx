import React, { useState } from "react";
import "antd/dist/antd.css";
import { Table, Space, Image, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import axios from "axios";
import EditProductData from "./EditProductData";
import PreviewImages from "./PreviewImages";
import AddProductItem from "./AddProductItem";



const ViewAddedProduct = () => {
    const base_url = process.env.baseURL
    const [ProductData, setProductData] = useState([])


    useEffect(() => {
        axios.get(`${base_url}/api/get-full-product/`).then(res => {
            setProductData(res.data)
        }
        ).catch(err => {
            message.error(err.message);
        }

        )
    }, [])

    const fakeFirstLevelData = []


    ProductData.forEach((element, index) => {

        let second_level_data = {}

        element.product_items.forEach((items, index) => {
            second_level_data = {
                id: items.id,
                store_price: items.store_price,
                discount: items.discount,
                retail_price: items.retail_price,
                is_default: items.is_default.toString(),
                is_active: items.is_active.toString(),
                image: items.images[0].file_name
            }
        })

        fakeFirstLevelData.push({
            id: element.id,
            sn: index + 1,
            product_name: element.product_name,
            category: element.category_id.category_name,
            sub_category: element.sub_category_id.sub_category_name,
            brand: element.brand_id.brand_name,
            status: element.is_active.toString(),
            secondLevel: second_level_data
        })

    })
    console.log(fakeFirstLevelData)


    const firstLevelColumns = [
        {
            title: 'S.N',
            dataIndex: 'sn',
            key: 'sn',
            width: 60
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
            width: 360

        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Sub Category',
            dataIndex: 'sub_category',
            key: 'sub_category',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },

        {
            title: 'Action',
            key: 'operation',
            render: (record) => (
                <Space className="text-xl">
                    <a><EditProductData product_id = {record.id} /></a>
                    <a><AddProductItem product_id= {record.id}/></a>
                </Space>
            ),
        },
    ];


    const secondLevelColumns = [
        {
            title: 'Image',
            key: 'image',
            render: (record) => (
                <>
                    <div className="content-between">
                        <Image
                            width={100}
                            src={`${base_url}${record.image}`}
                            getContainer='#img-prevew'

                        />
                    </div>
                </>
            )
        },
        {
            title: 'Store Price',
            dataIndex: 'store_price',
            key: 'store_price'
        },
        {
            title: 'Discount ',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Retail Price',
            dataIndex: 'retail_price',
            key: 'retail_price'
        },
        {
            title: 'Is Default',
            dataIndex: 'is_default',
            key: 'is_default'
        },
        {
            title: 'Is Active',
            dataIndex: 'is_active',
            key: 'is_active'
        },
        {
            title: 'Is Default',
            dataIndex: 'is_default',
            key: 'is_default'
        },
        {
            title: 'Action',
            key: 'operation',
            render: () => (
                <a><EditOutlined /></a>
            )
        },
    ]
    const firstExpandedRow = (record, index, indent, expanded) => {
        let data = []
        data.push(record.secondLevel)
        return (
            <Table
                // rowKey={record => record.}
                columns={secondLevelColumns}
                dataSource={data}
                pagination={false}
                showHeader={true}
            />
        )
    }



    return (
        <>

            <Table
                dataSource={fakeFirstLevelData}
                columns={firstLevelColumns}
                rowKey={record => record.id}
                loading={fakeFirstLevelData.length > 1 ? false : true}
                pagination={false}
                expandable={{
                    expandedRowRender: firstExpandedRow,
                    defaultExpandAllRows: false
                }}
            />
        </>

    )



}

export default ViewAddedProduct