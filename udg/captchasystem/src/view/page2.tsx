import { Row, Col, List, Avatar} from 'antd'
import { Header } from 'antd/es/layout/layout'
import axios from 'axios';
import { useEffect, useState } from 'react'
import * as React from 'react';
import { PaginationPosition } from 'antd/es/pagination/Pagination';
import Chart from '../components/chart1';

const left_headerStyle: React.CSSProperties = {
  textAlign: 'left',
  color: 'black',
  paddingInline: 10,
  lineHeight: '32px',
  backgroundColor: 'white',
  fontSize: '20px',
  height: '64px'
};
  
export default function page2() {
  const advfileList : any = []
  const graphList : any = []
  const [data, setData] = useState([])
  const [graphdata, setGraphdata] = useState([])
  const [position, setPosition] = useState<PaginationPosition>('bottom');
  const [loading, setLoading] = useState('')

  const loadMoreData = async () => {
      await axios({
        method: "POST",
        url: 'http://127.0.0.1:5002/init_adv'
      }).then(res => {
        for (let value of res.data.values()) {
          let json_data = {uid: value["uid"], name: value["name"], url: value["url"]};
          advfileList.push(json_data)
        }
        setData(advfileList)
      }
      )
  }

  useEffect(()=>{
    loadMoreData()
    },[])

  const handleClick = async(item: any) => {
    setLoading('true')
    await axios({
      method: "POST",
      url: `http://127.0.0.1:5002/safety_adv/${item.name}`,
    }).then(res =>{
      console.log(res.data)
      for (let value of res.data.values()) {
        let json_data = {label: value["label"], model: value["model"], prob: value["prob"]};
        console.log(json_data)
        graphList.push(json_data)
      }
      setGraphdata(graphList)
      setLoading('false')
    });
  }

  const handleRemove = (item : any) => {
    axios({
      method: "DELETE",
      url: `http://127.0.0.1:5002/delete_adv/${item.name}`,
    }).then(res =>{
      console.log(advfileList)
      setData(advfileList)
      window.location.reload()
    });
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Header style={left_headerStyle}>对抗验证码测验系统</Header>
        </Col>
        </Row>
        <List
            pagination={{position,defaultPageSize:3}}
            dataSource={data}
            renderItem={(item : any, index) => (
              <List.Item actions={[<a onClick={(e)=>handleRemove(item)}>delete</a>]}>
                <List.Item.Meta
                  avatar={<Avatar src={item.url} />}
                  title={<a onClick={(e)=>handleClick(item)} >{item.name}</a>}
                  description="AdvCaptcha Database"
                />
              </List.Item>
            )}
          />
        <Chart graphdata={graphdata} loading={loading}/>
    </>
  )
  }
