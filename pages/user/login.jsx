import React from 'react'
import { FiFacebook } from 'react-icons/fi';
import { RiGoogleLine } from 'react-icons/Ri';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { useRouter } from 'next/router';
import { updateAuthCredential } from '../../redux/auth/authSlice';
import getUserData, { getUserCart } from '../../Functions/getUserData';
import { updateCurrentUser } from '../../redux/auth/userDataSlice';
import { setCartItem } from '../../redux/cart/cartSlice';
import Head from 'next/head';
import Link from 'next/link';



const Login = () => {
  const [LoginCredentials, setLoginCredentials] = useState({ 'remember': true })
  const [uploading, setUploading] = useState(false);
  const router = useRouter()
  const base_url = process.env.baseURL
  const site_url  =process.env.SITE_URL
  const dispatch = useDispatch();





  const onFinish = (values) => {
    handleLogin()

  };
  const onFinishFailed = (errorInfo) => {
    return null;
  };

  const handleLogin = () => {
    setUploading(true)
    axios.post(`${site_url}/api/auth/login/`, LoginCredentials).then(res => {
      let result = res.data
      result.errors ? message.error(result.errors) : ProceedAuthentication(res.data)
      setUploading(false)

    }).catch(err => {
      console.log(err);
      if (err.response.status == 401) {
        message.error(err.response.data.errors) 
      }
      else {

        message.error('SOMETHING WENT WRONG DURING AUTHENTICATION')
      }
      setUploading(false)

    })

  }

  const ProceedAuthentication = async (data) => {
    let user = await getUserData()
    if (user?.data) {
      let cartItems = await getUserCart()
      console.log('cartItems', cartItems);
      // localStorage.setItem('GustyAuthtokens', JSON.stringify(data.token))
      dispatch(updateAuthCredential(data.token))
      dispatch(updateCurrentUser(user?.data))
      dispatch(setCartItem(cartItems.results))
      router?.query?.next ?
        router.push(router?.query?.next) :
        router.push(`/`)
      message.success('Logged In Successfully')
    }
    else {
      message.error('SOMETHING WENT WRONG!!')
    }

  }

  const handleOnchangeInput = (e) => {
    let { value, id } = e.target
    setLoginCredentials(preval => {
      return {
        ...preval,
        [id]: value
      }
    })
  }


  const handleChangeOnCheckBox = (e) => {
    let { checked, id } = e.target
    setLoginCredentials(preval => {
      return {
        ...preval,
        [id]: checked
      }
    })
  }


  return (
    <>
      <Head>
        <title>Login- Gusty Fashion at Doorstep</title>
      </Head>
      <div className='text-center font-bold text-3xl py-12  text-purple-400'>Login</div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center md:items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-0 mr-4">Sign in with</p>
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="inline-block p-2 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                >
                  <FiFacebook className='text-2xl' />

                </button>

                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="inline-block p-2 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                >
                  <RiGoogleLine className='text-2xl' />

                </button>


              </div>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">Or</p>
              </div>


              {/* login form statted */}


              <Form

                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
              >
                <div className="mb-6">
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email!',
                      },
                      { type: 'email' }
                    ]}
                    onChange={handleOnchangeInput}
                  >
                    <Input placeholder='Email ' type='email' className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' />
                  </Form.Item>
                </div>


                <div className="mb-6">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                    onChange={handleOnchangeInput}
                  >
                    <Input.Password placeholder='Password' className='form-control flex w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' />
                  </Form.Item>

                </div>

                <div className="flex justify-between items-center mb-6">
                  <div className=" ">

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={16} className=' text-gray-800 checked:bg-purple-600 checked:border-purple-600 focus:outline-none transition duration-200 mt-1' onChange={handleChangeOnCheckBox}>
                      <Checkbox >Remeber Me!</Checkbox>
                    </Form.Item>
                  </div>
                  <a href="#!" className="text-gray-800">Forgot password?</a>
                </div>

                <div className="text-center lg:text-left">
                  {/* <button
                    type="button"
                    className="inline-block px-7 py-3 bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button> */}
                  <Button htmlType='submit'
                    loading={uploading}
                    className='inline-block  bg-purple-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out'>Login</Button>

                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?

                    <Link href={'/user/signup'}>
                      <a className="text-red-600 hover:text-red-700 focus:text-red-700 transition 
                      duration-200 ease-in-out">
                        Register
                      </a>
                    </Link>
                  </p>
                </div>

              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login;