import React from 'react'
import { Button, Row, Col } from 'antd'
import Link from 'next/link'
import { PlusOutlined } from '@ant-design/icons'


const Category = () => {
    return (
        <>
            <div className="h-screen">
                <div className='px-10 py-7'>
                    <h2 className='font-extrabold text-lg text-purple-600'>Cateogories</h2>
                    <Row className='flex justify-between'>
                        <Col>
                            <Link href={'/admin/category/add'}>
                                <Button icon={<PlusOutlined />} className='flex items-center text-sm bg-gray-700 text-white hover:bg-purple-500 border-0 '>
                                    Add Category
                                </Button>
                            </Link>
                        </Col>
                       
                    </Row>
                    <hr className='my-3' />
                    <div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category