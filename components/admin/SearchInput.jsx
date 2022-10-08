import { Select } from 'antd';
import QueryString from 'qs';
import axios from 'axios';

import React, { useState } from 'react';
const { Option } = Select;
let timeout;
let currentValue;


const fetch = (value, SearchById, callback) => {
    const base_url = process.env.baseURL

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    currentValue = value;

    const fake = () => {
        console.log('SerchById', SearchById);
        let str;
        if (SearchById == false) {
            str = QueryString.stringify({
                product_id: 0,
                product_name: value
            });
        }
        else {
            str = QueryString.stringify({
                product_id: value,
                product_name: ''
            });

        }


        axios.get(`${base_url}/api/product-search/?${str}`)
            .then((response) => {
                let output = response.data;
                console.log(output);
                if (currentValue === value) {
                    console.log(output);
                    callback(output);
                }
            })


    };

    timeout = setTimeout(fake, 300);
};

const SearchInput = (props) => {
    const { SearchById } = props
    const [data, setData] = useState([]);
    const [value, setValue] = useState();

    const handleSearch = (newValue) => {
        if (newValue) {
            fetch(newValue, SearchById, setData);
        } else {
            setData([]);
        }
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const options = data.map((d) => (
        <Option key={d.id}>
            <h1 className='font-bold'>{d.product_name}</h1>
            <p className='leading-none'>#{d.id}</p>
        </Option>
    )
    );
    return (
        <>
            
            <Select
                showSearch
                value={value}
                placeholder={props.placeholder}
                style={props.style}
                defaultActiveFirstOption={false}
                showArrow={true}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
            >
                {options}
            </Select>
        </>
    );
};

export default SearchInput
