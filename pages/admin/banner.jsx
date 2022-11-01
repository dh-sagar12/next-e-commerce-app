import React from 'react'
import { Button, Row, Col, Table, Image, Tooltip, message } from 'antd'
import Link from 'next/link'
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { RiForbidLine } from 'react-icons/ri'




const Banner = () => {
    const base_url = process.env.baseURL

    const [BannerImageState, setBannerImageState] = useState([])
    const [LoadingBar, setLoadingBar] = useState(true)

    useEffect(() => {
        fetchbannerImageData()

    }, [BannerImageState])

    const fetchbannerImageData = () => {
        axios.get(`${base_url}/api/get-banner-image/?active_only=false`).then(res => {
            let result = res.data
            setBannerImageState(result)
            setLoadingBar(false)

        })
    }

    const handleBannerActiveInactive = (banner_id, b_status) => {
        let id = parseInt(banner_id)
        let banner_status = b_status == 'false' ? true : false

        let data = {
            id: id,
            is_active: banner_status
        }
        axios.put(`${base_url}/api/update-banner-image/`, data).then(res => {
            let response = res.data
            if (response.status == 200 && response.msg) {
                message.success(response.msg)
                setBannerImageState([])
                setLoadingBar(true)


            }
            else {
                message.error('error occured')
            }
        }).catch(err => [
            message.error('SOMETHING WENT WRONG!!!')
        ])

    }


    const dataSource = BannerImageState.map(item => {
        return {
            key: item.id,
            image: item.file_name,
            alt_text: item.alt_text,
            redirect_url: item.redirect_url,
            status: item.is_active.toString()
        }
    })

    const columns = [
        {
            title: 'Image',
            key: 'image',
            render: (record) => (
                <>
                    <div className="content-between">
                        <Image
                            width={100}
                            src={`${base_url}${record.image}`}


                        />
                    </div>
                </>
            )
        },
        {
            title: 'Alt Text',
            dataIndex: 'alt_text',
            key: 'alt_text',
        },
        {
            title: 'Redirect URL',
            dataIndex: 'redirect_url',
            key: 'redirect_url',
        },
        {
            title: 'Status',
            key: 'status',
            // dataIndex: 'status',
            render: (record) => (
                <span>{record.status == 'true' ? 'Active' : 'InActive'}</span>
            )
        },
        {
            title: 'Action',
            key: 'operation',
            render: (record) => (
                record.status == 'true' ? <a className='text-2xl text-green-700' onClick={() => handleBannerActiveInactive(record.key, record.status)}><Tooltip title='Mark as Inactive'><CheckCircleOutlined /></Tooltip></a> :
                    <a className='text-3xl  text-red-700' onClick={() => handleBannerActiveInactive(record.key, record.status)}><Tooltip title='Mark as Active'><RiForbidLine className='-rotate-45' /></Tooltip></a>
            )
        }
    ];

    return (
        <div className="h-screen">
            <div className='px-10 py-7 space-y-5'>

                <h2 className='font-extrabold text-lg  text-purple-600'>Banner Image Upload </h2>
                <hr />
                <Row className='flex justify-between'>
                    <Col>
                        <Link href={'/admin/banner/upload'}>
                            <Button icon={<PlusOutlined />} className='flex items-center text-sm bg-gray-700 text-white hover:bg-purple-500 border-0 '>
                                Add New
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <hr className='my-3' />

                <Table dataSource={dataSource} columns={columns} loading={LoadingBar} />;

            </div>

        </div>
    )
}

export default Banner