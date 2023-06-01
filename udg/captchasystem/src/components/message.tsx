import { Alert} from 'antd'

export default function Message(props:any) {
    if(props.status == 'true') {
        return <Alert
        type="success"
        message="Success"
        banner
        closable
      />
      }
      else if(props.status == 'false'){
        return <Alert type="error" message="Error" banner closable/>
      }
      else {
          return <></>
      }
}
