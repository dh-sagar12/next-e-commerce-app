import { message, Spin } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useEffect } from 'react'
import EditProductItem from '../../../../components/admin/EditProductItem'



const EditItem = () => {
    let router = useRouter()
    const { edititems } = router.query

    const base_url = process.env.baseURL


    const [EditPoductInventory, setEditPoductEditPoductInventory] = useState()




    useEffect(() => {
        if (router.isReady) {
            axios.get(`${base_url}/api/get-product-inventory/${edititems}`).then(res => {
                let product_items_fetched = res.data
                if (product_items_fetched.error){
                    message.error(product_items_fetched.error)
                }
                else{
                    setEditPoductEditPoductInventory(product_items_fetched)
                }
                
            }).catch(error => {
                message.error(JSON.stringify(error))
            })
        }

    }, [router.isReady])

    return (
        <>

            {EditPoductInventory !== undefined  ?
                <EditProductItem EditPoductInventory={EditPoductInventory} base_url={base_url} />
                :
                <div className='flex justify-center items-center h-96'>
                    <Spin size='large' className=''></Spin>
                </div>
              
            }
        </>
    )
}

export default EditItem