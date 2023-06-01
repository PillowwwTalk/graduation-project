import { Row, Col,Avatar, List} from 'antd'
import { Header } from 'antd/es/layout/layout'
import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
const left_headerStyle: React.CSSProperties = {
  textAlign: 'left',
  color: 'black',
  paddingInline: 10,
  lineHeight: '32px',
  backgroundColor: 'white',
  fontSize: '20px',
  height: '64px'
};
type PaginationPosition = 'top' | 'bottom' | 'both';
export default function page3() {
  const [data, setData] = useState([])
  const [position, setPosition] = useState<PaginationPosition>('bottom');
  const {fileList} = useSelector((state:RootState)=>({
    fileList: state.fl
  }))
  useEffect(()=>{
    setData(fileList)
  })
  const handleRemove = (item:any) => {
    axios({
      method: "DELETE",
      url: `http://127.0.0.1:5002/delete/${item.name}`,
    }).then(res =>{
      console.log(fileList)
      setData(fileList)
      window.location.reload()
    });
}
  return (
    <>
      <Row>
        <Col span={24}>
          <Header style={left_headerStyle}>数据库后台管理系统</Header>
        </Col>
        </Row>
        <List
          pagination={{position}}
          dataSource={data}
          // href={'http://127.0.0.1:5002/delete/'+item.name}
          renderItem={(item: any, index) => (
            <List.Item actions={[<a onClick={(e)=>handleRemove(item)}>delete</a>]}>
              <List.Item.Meta
                avatar={<Avatar src={item.url} />}
                title={<a href={item.url}>{item.name}</a>}
                description="Captcha Database"
              />
            </List.Item>
          )}
        />
    </>
  )
}
