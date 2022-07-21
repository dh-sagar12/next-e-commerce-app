import React from 'react'
import AddProductTabs from '../../../components/admin/AddProductTabs'

const AddProduct = () => {
  return (
    <div className='px-7 py-10'>
        <h1 className='text-xl font-extrabold text-purple-600'>Products/Product Inventory</h1>
        <AddProductTabs/>
    </div>
  )
}

export default AddProduct