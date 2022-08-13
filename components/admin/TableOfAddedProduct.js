import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space } from "antd";


const handleEditProductItems= (record)=>{
    console.log(record);
}
const columns = [
    {
        title: 'Product Name',
        dataIndex: 'product_name',
        key: '1'
    },
    {
        title: 'Store Price',
        dataIndex: 'store_price',
        key: '2',
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        key: '3',
    },
    {
        title: 'Retail Price',
        dataIndex: 'retail_price',
        key: '4',
    },
    {
        title: 'Action',
        key: '5',
        render: (_, record) => (
          <Space size="small">
            <a><EditOutlined onClick={()=>handleEditProductItems(record)} /></a>
            <a><DeleteOutlined/></a>
          </Space>
        ),
      },
]

export default columns
