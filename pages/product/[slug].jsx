import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react';
import ViewProduct from '../../components/ViewProduct';


const Slug = (props) => {

    const router  = useRouter()
  const [Product, setProduct] = useState(props.product[0])

  return (
    <>
      {Product !== undefined ?
        <ViewProduct FetchedProduct={Product} />
        :
        <>
          {router.push('/404notfound')}
        </>}
    </>
  )
}

export default Slug;





export async function getServerSideProps(context) {
  const base_URL = process.env.baseURL
  let { slug } = context.query
  let response = await fetch(`${base_URL}/api/get-full-product/?slug=${slug}`)
  let result = await response.json()
  let product = result.results

  return {
    props: { product } // will be passed to the page component as props
  }
}