import { Column} from '@ant-design/charts';
import { Header } from 'antd/es/layout/layout';
import { useEffect } from 'react';
import { useState } from 'react';
const left_headerStyle: React.CSSProperties = {
    textAlign: 'left',
    color: 'black',
    paddingInline: 10,
    lineHeight: '32px',
    backgroundColor: 'white',
    fontSize: '20px',
    height: '64px'
  };
export default function chart(props:any) {
  const [data, setData] = useState([])
  useEffect (()=>{
    setData(props.graphdata)
  })
  const config = {
    data,
    isGroup: true,
    xField: 'model',
    yField: 'prob',
    seriesField: 'label',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle', // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        { type: 'interval-adjust-position' },
        // 数据标签防遮挡
        { type: 'interval-hide-overlap' },
        // 数据标签文颜色自动调整
        { type: 'adjust-color' },
      ],
    },
  };
  if(props.loading === 'false') {
    return (
    <>
    <Header style={left_headerStyle}>原图模型识别结果</Header>
    <Column {...config} />
    </>
    );
  }
  else {
    return (<div></div>)
  }
};