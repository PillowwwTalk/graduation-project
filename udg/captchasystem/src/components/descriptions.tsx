import { Descriptions } from 'antd'
const contentStyle: React.CSSProperties = {
    fontSize: '16px'
  };
  const labelStyle: React.CSSProperties = {
    fontSize: '16px'
  };
export default function descriptions(props:any) {
 
  return (
    <Descriptions title="Attack Info" column={1} contentStyle={contentStyle}>
        <Descriptions.Item label="label" labelStyle={labelStyle}>{props.label}</Descriptions.Item>
        <Descriptions.Item label="adv_target" labelStyle={labelStyle}>{props.adv_target}</Descriptions.Item>
        <Descriptions.Item label="status" labelStyle={labelStyle}>{props.status}</Descriptions.Item>
    </Descriptions>
  )
}

