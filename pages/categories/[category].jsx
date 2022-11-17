import React from 'react'
import MobileFilterNav from '../../components/MobileFilterNav';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { list } from 'postcss';
import DisplayItems from '../../components/DisplayItems';



const CategorySlug = (props) => {
    const { data } = props
    const [FetchedProductState, setFetchedProductState] = useState(data.results)
    // console.log('data', data);


    let router = useRouter();
    let { category } = router.query;

  



    return (
        <>
            <h1 className='text-4xl text-center '>{category}</h1>
            <MobileFilterNav />
            <hr className='my-3 bg-purple-500' />
           
               
                { 
                    data.results !== undefined?
                        <DisplayItems ProductItems= {data}/>
                    // FetchedProductState.map((product) => {
                    //     return (
                    //         <div key={product.id}>
                    //             <ProductCard product={product} />
                    //         </div>

                    //     )

                    // }
                    
                    // )

                    : <div className='w-screen  flex h-[700px] justify-center  md:font-bold md:text-xl'>
                        <p className='text-gray-700 md:my-12 my-32'>SORRY! NO ITEMS FOR THIS CATEGORY</p>
                    </div>

                }

                
           
        </>
    )
}

export default CategorySlug;


export const getServerSideProps = async (ctx) => {
    const base_url = process.env.baseURL
    const resolved_url = `/categories/${ctx.query.category}`
    console.log('resolvedURL', resolved_url);

    let category = await (await axios.get(`${base_url}/api/get-category/`)).data

    const GetCategoryId = (slug) => {
        let item = category.find(item => item.slug === slug)
        if(item !== undefined){
            return item.id
        }
        else{
            return 0
        }
    }

    const category_id = GetCategoryId(resolved_url);
    console.log('category_id', GetCategoryId(resolved_url));



    try {
        let response = await axios.get(`${base_url}/api/get-product/?category_id=${category_id}`)
        console.log('response', response.data);
        return {
            props: {
                data: response.data
            }
        }
    } catch (error) {
        console.log('error', error);
        return {
            props: {
                data: 'ERROR ON FETCHING DATA FROM SERVER'
            },
        };
    }


}