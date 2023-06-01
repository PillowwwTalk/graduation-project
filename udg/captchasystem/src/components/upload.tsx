import { UploadOutlined } from '@ant-design/icons'
import { Upload, Button, UploadFile, UploadProps } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function upload(props: any) {
    
    const handleRemove = (file: UploadFile) => {
        axios({
          method: "DELETE",
          url: `http://127.0.0.1:5002/delete/${file.name}`,
        }).then(res =>{
        });
    }
    const handlePreview = (file: UploadFile) => {
        console.log('Your upload file:', file)
        props.getUrl(file.url)
        console.log(file.name)
    }
    const handleChange =() => {
      window.location.reload()
    }
    const [isLoading, setIsLoading] = useState(false);
    const {fl} = useSelector((state:RootState)=>({
      fl: state.fl
    }))
    const dispatch = useDispatch()
    useEffect(()=>{
        const initFileList = async () => {
        setIsLoading(true)
        await axios({
          method: "POST",
          url: 'http://127.0.0.1:5002/init'
        }).then(res => {
          for (let value of res.data.values()) {
            let json_data = {uid: value["uid"], name: value["name"], url: `@fs/Users/zhj/AI/adv/${value["url"]}`};
            dispatch({type:"changeList", val: json_data})
          }
          setIsLoading(false);
        }
        )}
        initFileList()
      },[])
      if(isLoading===true) {
        return (<div> Loading ...</div>)
      }
  else return(
      <Upload
        action="http://127.0.0.1:5002/upload"
        listType="picture"
        defaultFileList={[...fl]}
        className="upload-list-inline"
        onRemove={handleRemove}
        onPreview={handlePreview}
        onChange={handleChange}
        >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>   
  )
}

