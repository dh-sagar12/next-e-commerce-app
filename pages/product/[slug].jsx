import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ViewProduct from '../../components/ViewProduct';



const Slug = (props) => {

  const router = useRouter()
  const [Product, setProduct] = useState(props.product[0])

  const ItemOfProductCheck = (id) => {
    if (id !== undefined){
      let item = props.product[0].product_items.find(item => item.id == parseInt(id))
      return item !== undefined ? true : false
    }
    else{
      return true
    }
  }


  useEffect(() => {
    if (Product == undefined || ItemOfProductCheck(props.item_id) == false ){
      router.push('/404NotFound')
    }
  }, [Product])
  



  return (
    <>
      {Product !== undefined && ItemOfProductCheck(props.item_id)  ?
        <ViewProduct FetchedProduct={Product} ItemId={props.item_id} />
        :
        <></>}
    </>
  )
}

export default Slug;





export async function getServerSideProps(context) {
  const base_URL = process.env.baseURL
  let { slug, item_id } = context.query

  let response = await fetch(`${base_URL}/api/get-full-product/?slug=${slug}`)
  let result = await response.json()
  let product = result.results

  if (item_id !== undefined) {
    return {
      props: { product, item_id } // will be passed to the page component as props
    }
  }
  else {
    return {
      props: { product } // will be passed to the page component as props
    }
  }
}