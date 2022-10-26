import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Button, message } from 'antd';
import React, { useState } from 'react';

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => resolve(reader.result);

//     reader.onerror = (error) => reject(error);
//   });

const ImageUploader = (props) => {

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const { fileList, setFileList } = props



  const handleCancel = () => setPreviewVisible(false);


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );


  const handlePreviewFile = () => {

  }


  const properties = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    }
  }
  return (
    <>
      <Upload
        isImageUrl={() => true}
        listType="picture-card"
        fileList={fileList}
        // onPreview={handlePreview}
        previewFile={handlePreviewFile}
        // onChange={handleChange}
        {...properties}
        multiple={true}

      >
        {
          props.count != undefined ?
            (props.count +
              fileList.length) >= 3 ? null : uploadButton
            :
            fileList.length >= 3 ? null : uploadButton
        }
      </Upload>
      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>



    </>
  );
};

export default ImageUploader;