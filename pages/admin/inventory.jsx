import { Button, Row, Col, Switch, Tooltip } from 'antd'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'
import ViewAddedProduct from '../../components/admin/ViewAddedProduct'
import Search from 'antd/lib/input/Search'
import { useState } from 'react'
import SearchInput from '../../components/admin/SearchInput'

// import Search from 'antd/lib/transfer/search'



const Inventory = () => {
  const [SearchLoading, setSearchLoading] = useState(false)
  const [Checked, setChecked] = useState(false)

  const handleOnChangeSearch = () => {
    setSearchLoading(true)
  }

  const onChange = (checked) => {
    setChecked(checked)
  };

  return (
    <div className="h-screen">
      <div className='px-10 py-7 space-y-5'>
        <h2 className='font-extrabold text-lg  text-purple-600'>Stocks</h2>
        <Row className='flex justify-between'>
          <Col span={10} className='space-y-5'>
          <Tooltip title="Search By Id">
            <Switch  onChange={onChange} />
          </Tooltip>
            <SearchInput SearchById= {Checked}  placeholder='Search Product' style={{
              width: 400,
            }} >
            </SearchInput>
          </Col>
        </Row>
        <hr className='my-3' />
      </div>
    </div>
  )
}

export default Inventory