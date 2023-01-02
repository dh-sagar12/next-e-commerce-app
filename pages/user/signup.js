import { Button, Form, Input, Select, DatePicker, Col, Space, message } from "antd";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { useRouter } from 'next/router'

const { Option } = Select;

const Signup = () => {

  const [RegisterCredential, setRegisterCredential] = useState({})
  const [GenderData, setGenderData] = useState([])
  const [CountryState, setCountryState] = useState([])
  const [form] = Form.useForm();
  const BASE_URL = process.env.baseURL
  const router = useRouter()


  const genderRequest = axios.get(`${BASE_URL}/api/genders/`)
  const countryRequest = axios.get(`${BASE_URL}/api/countries/`)

  useEffect(() => {
    Promise.all([genderRequest, countryRequest]).then((values) => {
      setGenderData(values[0].data.results)
      setCountryState(values[1].data);
    })
  }, [])


  useEffect(() => {
    console.log(RegisterCredential)
  }, [RegisterCredential])
  


  const handleOnchangeInput = (e) => {
    let { value, id } = e.target
    setRegisterCredential(preval => {
      return {
        ...preval,
        [id]: value
      }
    })
  }

  const handleOnchangeDate = (value, datestring) => {
    setRegisterCredential((preval) => {
      return { ...preval, 'dob': datestring }
    })
  }

  const handleChangeOnCountryCode = (value) => {
    setRegisterCredential((preval) => {
      return { ...preval, 'country_id': value }
    })
  }

  const handleChangeOnGender = (value) => {
    setRegisterCredential((preval) => {
      return { ...preval, 'gender_id': value }
    })
  }



  const onFinish = (values) => {
    handlePostUserRegister()

  };


  const handlePostUserRegister = () => {
    axios.post(`${BASE_URL}/api/signup/`, RegisterCredential).then(res => {
      let result = res.data
      if (result.status == 200) {
        message.success('Account Created Successfully!!!')
        router.push('/user/login/')
        setRegisterCredential({})
      }
    }).catch(err => {
      console.log(err);
      if (err?.response?.data?.status  == 400 && err?.response?.data?.errors ){
        
        message.error(err?.response?.data?.errors?.email[0])
      }
      else{
        message.error('SOMETHING WENT WRONG! PLEASE TRY AGAIN')
      }
    })
  }


  const onReset = () => {
    form.resetFields();
    setRegisterCredential({})
  };



  const prefixSelector = (
    <Form.Item name="country_code" noStyle >
      <Select className='w-24 lg:w-32' showSearch placeholder="Search to Select" optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        name="country_id"
        value={RegisterCredential?.country_id}
        onChange={handleChangeOnCountryCode}
      >
        {
          CountryState.map(country => {
            return <Option value={country.id}>{`${country.phone_code} ${country.iso_3}`}</Option>
          })

        }
      </Select>
    </Form.Item>
  );

  return (
    <>
      <div className="mx-5 sm:mx-auto  sm:my-12 sm:w-2/3 mt-10 ">
        <div className="sm:flex justify-between ">
          <h3 className="sm:font-semibold sm:text-xl md:text-2xl font-bold text-center text-xl ">Create Your Gusty Account</h3>
          <p className="sm:text-lg hidden sm:block">
            Already member?
            <Link href={'/user/login'}>
              <a className="font-semibold text-purple-600 underline">
                Login here.
              </a>
            </Link>
          </p>
        </div>
        <div className="sm:p-4 md:p-12 md:mx-auto sm:border-[1px] sm:bg-slate-50 lg:border-slate-500">

          <Form layout="vertical" form={form} onFinish={onFinish}>

            <div className="lg:flex lg:justify-between lg:space-x-24">
              {/* email input  */}
              <Form.Item
                className="lg:w-1/2"
                name="email"
                label="Email"
                onChange={handleOnchangeInput}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Email!!'
                  },
                ]}
              >
                <Input className="lg:w-full" />
              </Form.Item>


              {/* first name input  */}
              <Form.Item
                className="lg:w-1/2"
                name="first_name"
                label="First Name"
                onChange={handleOnchangeInput}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your First Name!!'

                  },
                ]}
              >
                <Input className="lg:w-full" />
              </Form.Item>
            </div>

            <div className="lg:flex lg:justify-between lg:space-x-24">

              {/* middle name input  */}
              <Form.Item name="middle_name" label="Middle Name" className="lg:w-1/2" onChange={handleOnchangeInput}>
                <Input className="md:w-full" />
              </Form.Item>

              {/* last name input  */}
              <Form.Item
                className="lg:w-1/2"
                name="last_name"
                label="Last Name"
                onChange={handleOnchangeInput}
                rules={[
                  {
                    required: true,
                    message: 'Please Enter Your Last Name!!'

                  },
                ]}
              >
                <Input className="w-full" />
              </Form.Item >

            </div>

            <div className="lg:flex lg:justify-between lg:space-x-24">

              {/* password input  */}
              <Form.Item
                className="lg:w-1/2"
                name="password"
                label="Password"
                hasFeedback
                onChange={handleOnchangeInput}
                rules={[
                  {
                    required: true,
                    message: 'Please Choose Your Password !!'

                  }
                ]}
              >
                <Input.Password className="w-full" />
              </Form.Item>


              {/* confirm password input  */}
              <Form.Item
                className="lg:w-1/2"
                name="confirm"
                onChange={handleOnchangeInput}
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Required!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Password Didn't Matched!!"));
                    },
                  }),
                ]}
              >
                <Input.Password className="w-full" />
              </Form.Item>


            </div>



            {/* contact numbe choose  */}
            <Form.Item
              name="contact"
              label="Phone Number"
              onChange={handleOnchangeInput}
              rules={[
                {
                  required: true,
                  message: 'Required!',
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                className='lg:w-1/2 w-[100%]'
              />
            </Form.Item>


            <div className="flex justify-between lg:space-x-24 ">
              {/* gender choose  */}
              <Form.Item
                className="lg:w-1/2"
                name="gender"
                onChange={handleOnchangeInput}
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: 'Required'

                  },
                ]}>
                <Select
                  placeholder="Choose Gender"
                  allowClear
                  className="sm:w-60 w-44 lg:w-full"
                  onChange={handleChangeOnGender}
                >
                  {
                    GenderData.map(gender => {
                      return <Option value={gender.id}>{gender.gender_name}</Option>
                    })

                  }
                </Select>
              </Form.Item>

              {/* dob choose  */}
              <Form.Item className="lg:w-1/2" label="Date Of Birth" name="dob" rules={[{ type: Object, required: true, message: 'required' }]} >
                <DatePicker className="sm:w-64 lg:w-full" onChange={handleOnchangeDate} />
              </Form.Item>


            </div>


            {/* submit buttons  */}
            <div className="flex  justify-center mb-5 md:mb-10">
              <Button type="primary" htmlType="submit" className="md:items-centermd:space-x-4 hover:bg-purple-500 border-none md:justify-center lg:w-52">
                Sign Up
              </Button>
              <Button htmlType="button" onClick={onReset} className="md:items-centermd:space-x-4 hover:border-purple-400  md:justify-center lg:w-52 hover:text-purple-400 border-purple-700 text-purple-700">
                Reset
              </Button>
            </div>


          </Form>
          <div className="text-center">
            <span className="text-gray-700 ">Or, Signup With</span>
            <div className="flex justify-center space-x-7 mt-5">
              <button className=" flex space-x-3 justify-center items-center py-3 px-6 border-none bg-blue-800 text-white"><BsFacebook /> <span> Facebook</span></button>

              <button className=" flex space-x-3 justify-center items-center py-3 px-6 border-none bg-red-800 text-white"><BsGoogle /> <span>Google</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
