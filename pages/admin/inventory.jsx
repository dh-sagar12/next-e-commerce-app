import { Button, Row, Col, Switch, Tooltip } from 'antd'
import React from 'react'
import { EyeOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import SearchInput from '../../components/admin/SearchInput'
import axios from 'axios'
import AddStockPage from '../../components/admin/AddStockPage'

// import Search from 'antd/lib/transfer/search'



const Inventory = () => {
  const [SearchLoading, setSearchLoading] = useState(false)
  const [Checked, setChecked] = useState(false)
  const [SelectedItem, setSelectedItem] = useState(0)
  const [FetchedProduct, setFetchedProduct] = useState()
  const [FetchedProductItems, setFetchedProductItems] = useState([])
  const [StockInventoryData, setStockInventoryData] = useState()

  const base_url = process.env.baseURL


  useEffect(() => {
   console.log(StockInventoryData);
  }, [StockInventoryData])
  





  const onChangeSwitch = (checked) => {
    setChecked(checked)
  };

  const searchProduct = (product_id) => {
    axios.get(`${base_url}/api/get-full-product/${product_id}`)
      .then((response) => {
        let output = response.data
        setFetchedProduct(output.product)
        setSearchLoading(false)
      })
  }

  const handleOnChangeSearch = () => {
    setSearchLoading(!SearchLoading)
    let product_id = parseInt(SelectedItem)
    setStockInventoryData({product_id: product_id})
    setFetchedProduct()
    searchProduct(product_id)
  }

  return (
    <>
      <div className="h-screen">
        <div className='px-10 py-7 space-y-5'>
          <h2 className='font-extrabold text-lg  text-purple-600'>Stocks</h2>
          <Row className='flex justify-between'>
            <Col span={10} className='space-y-4'>

              <Tooltip title="Search By Id">
                <Switch onChange={onChangeSwitch} className='my-3' />
              </Tooltip>
              <div>
                <div className='flex  space-x-2'>
                  <SearchInput setSelectedItem={setSelectedItem} SearchById={Checked} placeholder='Search Product' style={{
                    width: 400,
                    margin: 0
                  }} />
                  <Button icon={<EyeOutlined />} className='flex items-center text-sm bg-gray-700 text-white hover:bg-purple-500 border-0 ' onClick={handleOnChangeSearch} loading={SearchLoading}>
                    Show
                  </Button>
                </div>
                {
                  SelectedItem > 0 ?
                    <p className=' text-sm text-gray-400 m-0 leading-0'>Product Id: {SelectedItem}</p>
                    : <></>
                }
              </div>
            </Col>
          </Row>
          <hr className='my-3' />

          {FetchedProduct !== undefined ? <AddStockPage FetchedProduct={FetchedProduct} setFetchedProductItems={setFetchedProductItems} FetchedProductItems={FetchedProductItems} base_url={base_url} setStockInventoryData={setStockInventoryData}  StockInventoryData={StockInventoryData} setFetchedProduct={setFetchedProduct}/> : <></>}
        </div>
      </div>
    </>
  )
}

export default Inventory