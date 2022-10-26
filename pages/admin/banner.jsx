import React from 'react'
import { Button, Row,Col } from 'antd'
import Search from 'antd/lib/input/Search'
import Link from 'next/link'
import { PlusOutlined } from '@ant-design/icons'




const Banner = () => {
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
            </div>

        </div>
    )
}

export default Banner