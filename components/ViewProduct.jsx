import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { BsInstagram, BsFillCartCheckFill, BsTwitter, BsFacebook, BsCartPlus } from 'react-icons/bs'

import { Select, Tooltip, message } from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'
import AddToCartBtn from './AddToCartBtn'
import Router, { useRouter } from 'next/router'


const ViewProduct = (props) => {

    const { FetchedProduct, ItemId } = props

    const cartitem = useSelector(state => state.cartSlice.cart)


    const router  =  useRouter()
    const base_url = process.env.baseURL
    const [FetchedProductItems, setFetchedProductItems] = useState([]) //all product item fetched 
    const [SelectedProductItem, setSelectedProductItem] = useState(0) //selected product item id 
    const [ProductItemAttributes, setProductItemAttributes] = useState() //
    const [ProductItemDetails, setProductItemDetails] = useState() //detail of selected product items
    const [ProductItemStockQty, setProductItemStockQty] = useState([])
    const [StockInventoryData, setStockInventoryData] = useState()
    const [AlreadyAddedProductInCart, setAlreadyAddedProductInCart] = useState()
    const [CurrentPhotoToDisplay, setCurrentPhotoToDisplay] = useState()




    useEffect(() => {
        if (FetchedProduct !== undefined) {
            setFetchedProductItems(FetchedProduct.product_items)
        }

    }, [FetchedProduct])

    useEffect(() => {
        let alreadyAddToCart = cartitem.find(item => item.product_inventory_id === ProductItemDetails?.id)
        setAlreadyAddedProductInCart(alreadyAddToCart)
        setCurrentPhotoToDisplay(ProductItemDetails?.images[0])
    }, [cartitem, ProductItemDetails])


    useEffect(() => {

        if (ItemId == undefined) {
            let defaultItem = FetchedProductItems.find(item => item.is_default == true)

            if (defaultItem !== undefined) {
                setSelectedProductItem(defaultItem?.id);
                FetchProductitemDetail(defaultItem?.id);
                FetchProductAttributeValue(defaultItem?.id);
                FetchStockQtyOfProductItem(defaultItem?.id);
            }
        }
        else {
            setSelectedProductItem(parseInt(ItemId));
            FetchProductitemDetail(parseInt(ItemId));
            FetchProductAttributeValue(parseInt(ItemId));
            FetchStockQtyOfProductItem(parseInt(ItemId));
        }


    }, [FetchedProductItems])




    const handleBuyNow =  ()=>{
        console.log('ProductItemDetails', ProductItemDetails);
        router.push({
            pathname: '/checkout',
            query:{
                product:FetchedProduct?.slug,
                sku: ProductItemDetails?.id,
                type:'only-product-checkout'
            }
        })        
    }



    const handleSelectChange = (e) => {
        setStockInventoryData((preval) => {
            return { ...preval, product_inventory_id: e }
        })
        setSelectedProductItem(e);
        FetchProductitemDetail(e);
        FetchProductAttributeValue(e);
        FetchStockQtyOfProductItem(e);
    }


    const FetchProductAttributeValue = (id) => {

        axios.get(`${base_url}/api/get-item-attribute-value/?product_item_id=${id}`).then((response) => {

            setProductItemAttributes(response.data)
        }).catch(err => {
            message.error('Error On Fetching Attribute Data')
        })

    }

    const FetchStockQtyOfProductItem = (id) => {

        axios.get(`${base_url}/api/stock/get-stock-qty/?product_item_id=${id}`).then((response) => {
            setProductItemStockQty(response.data)
        }).catch(err => {
            message.error('Error on Fetching Stock Quantity!')
        })

    }

    const FetchProductitemDetail = (id) => {
        axios.get(`${base_url}/api/get-product-inventory/${id}`).then((response) => {
            setProductItemDetails(response.data)
        }).catch(err => {
            message.error('Error on Fetching Item Details!')
        })

    }

    const handleChangeInCurrentShowing = (ind) => {
        setCurrentPhotoToDisplay(ProductItemDetails?.images[ind])
    }





    return (
        <>
            <section className="text-gray-600 body-font ">
                <div className="container px-5 py-9 mx-auto">
                    <div className=" flex space-x-5 space-y-8  flex-col md:flex-row">
                        {
                            ProductItemDetails !== undefined ?

                                <div className='md:w-1/3 w-5/6 mx-auto sm:w-3/4 sm:mx-auto lg:w-1/5  md:h-auto  object-cover object-center rounded'>
                                    <img alt="ecommerce" className="object-cover object-center rounded" src={`${base_url}${CurrentPhotoToDisplay?.file_name}`} />
                                    <div className='grid grid-cols-4 mt-5 md:h-[50px]  justify-center  gap-3 '>
                                        {ProductItemDetails?.images.map((item, ind) => (
                                            < div className='border-purple-300  border cursor-pointer' key={ind + 100000} onClick={() => { handleChangeInCurrentShowing(ind) }}>
                                                <img src={`${base_url}${item.file_name}`} alt="product images" className='h-full w-full' />
                                            </div>

                                        ))
                                        }
                                    </div>
                                </div> :

                                <></>
                        }
                        <div className="lg:w-1/2 w-full lg:pl-10 l:py-6 mt-6 lg:mt-0 pr-4">
                            <h2 className="text-sm title-font text-gray-500 mdLtext-xl cursor-pointer hover:text-purple-400 tracking-widest">{FetchedProduct.brand_id.brand_name}</h2>

                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-3">{FetchedProduct.product_name}</h1>

                            {/* rating and  Reviews */}
                            <div className='flex  justify-between pr-6 '>
                                <div className="flex mb-4  flex-col md:flex-row">
                                    <div className='flex flex-col'>
                                        <span className="flex items-center">
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-purple-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-purple-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-purple-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-purple-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-purple-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                        </span>
                                        <span className="text-gray-600  ">4 Reviews</span>
                                    </div>

                                    <span className="flex md:ml-3 md:pl-3 py-2 md:border-l-2 border-gray-200 space-x-2">
                                        <a className="text-gray-500 text-xl cursor-pointer hover:text-purple-400">
                                            <BsFacebook />

                                        </a>
                                        <a className="text-gray-500 text-xl cursor-pointer hover:text-purple-400">
                                            <BsInstagram />

                                        </a>
                                        <a className="text-gray-500 text-xl cursor-pointer hover:text-purple-400">
                                            <BsTwitter />
                                        </a>
                                    </span>

                                </div>

                                {
                                    AlreadyAddedProductInCart == undefined ?
                                        <div className='w-1/3 '>
                                            <AddToCartBtn product={{ product_id: ProductItemDetails?.product_id?.id, product_inventory_id: ProductItemDetails?.id }} />

                                        </div>
                                        :
                                        <div className='md:w-2/5  w-3/5 '>
                                            <div className='flex justify-center my-2 border mx-1 p-1 bg-slate-50 rounded-md border-slate-500 hover:bg-purple-100'>
                                                <button className='flex justify-center space-x-2'>
                                                    <BsFillCartCheckFill className='text-xl self-center cursor-pointer hover:text-purple-500' />
                                                    <span className='font-semibold text-gray-700'>Already Added</span>
                                                </button>
                                            </div>
                                        </div>
                                }
                            </div>

                            {/* item options  and add to cart  */}
                            <div className='flex  justify-between pr-4'>
                                <h4 className='md:text-xl  text-lg font-bold uppercase  pl-1 border-b-2 border-purple-500 w-1/2 '>Item Options</h4>
                                <div className="  items-center">
                                    <span className="title-font font-medium text-xl text-gray-900"> ${ProductItemDetails?.retail_price ?? 0}</span>
                                    {
                                        parseInt(ProductItemStockQty[0]?.stock_qty) > 0 ?
                                            <button className="flex items-center hover:bg-purple-400 text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none  rounded lg:px-5" onClick={handleBuyNow}>
                                                <span className='mr-2'>
                                                    <BsCartPlus />
                                                </span>
                                                <span>Buy Now</span>
                                            </button>
                                            :
                                            <button className="flex items-center cursor-not-allowed  text-white bg-gray-400 border-0 py-2  px-2 lg:px-5 focus:outline-none  rounded  ">
                                                <span>Out Of Stock</span>
                                            </button>
                                    }
                                </div>
                            </div>

                            {/* choose product option */}
                            <div className="grid  grid-cols-2 gap-x-4 md:grid-cols-3 pt-4  justify-between mx-0 md:flex-row  mt-2 md:items-center pb-5 border-b-2 border-gray-100 md:mb-5">
                                <Select className='w-72 first-letter:capitalize'
                                    name="product_item"
                                    value={SelectedProductItem}
                                    onChange={handleSelectChange}
                                >
                                    {
                                        FetchedProductItems.map((attr, ind) => {
                                            return <Select.Option value={attr.id} key={ind} className='first-letter:capitalize'>
                                                <h1 className='font-semibold' >{attr.sku}</h1>
                                                <Tooltip placement='right' title={` retail price: ${attr.retail_price}, store Price: ${attr.store_price}`}>
                                                    <span className='leading-none'>
                                                        retail price: {attr.retail_price}, store Price: {attr.store_price}
                                                    </span>
                                                    <hr />
                                                </Tooltip>
                                            </Select.Option>
                                        })
                                    }

                                </Select>

                            </div>
                            <p className="hidden md:block leading-relaxed">{FetchedProduct.description}</p>

                        </div>

                        {/* Product item details  */}

                        <div>
                            <div className='font-semibold text-xl  pb-4 text-center uppercase'>Product  Details</div>

                            {
                                ProductItemDetails ?
                                    <div className='px-0 grid gap-x-14 grid-cols-2'>
                                        <p className='font-semibold'>SKU: {ProductItemDetails.sku}</p>
                                        <p className='font-semibold'>Store Price: {ProductItemDetails.store_price}</p>
                                        <p className='font-semibold'>Discount: {ProductItemDetails.discount}</p>
                                        <p className='font-semibold'>Retail Price: {ProductItemDetails.retail_price}</p>
                                        <p className='font-semibold'>Status: {ProductItemDetails.is_active ? 'Active' : 'Inactive'}</p>
                                        {
                                            SelectedProductItem > 0 && ProductItemStockQty !== undefined ?
                                                <p className='font-semibold'>Qty Available: {ProductItemStockQty[0]?.stock_qty}</p>
                                                : <></>
                                        }
                                    </div>
                                    :
                                    <></>
                            }

                            {
                                ProductItemAttributes ?
                                    <div className='px-0 grid gap-x-14 grid-cols-2'>
                                        {
                                            ProductItemAttributes.map((item, ind) => {
                                                return <p className='font-semibold' key={ind}>{item.attribute_name}: {item.attribute_value}</p>
                                            })


                                        }

                                    </div>
                                    :
                                    <></>
                            }
                        </div>



                    </div>
                    <div>
                        <h3 className='text-xl text-center font-semibold pt-4 pb-1 uppercase md:hidden'>Description</h3>

                        <p className=" md:hidden leading-relaxed">{FetchedProduct.description} </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewProduct