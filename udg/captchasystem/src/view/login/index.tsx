import { ChangeEvent, useEffect, useState } from 'react'
import styles from "./login.module.scss"
import initLoginBg from './init.ts'
import { Input, Space, Button, message } from 'antd'
import './login.less'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function login() {
    useEffect(()=>{
        initLoginBg();
        window.onresize = function(){initLoginBg()};
    },[])
    let navigateto = useNavigate()
    const [usernameVal, setUsernameVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")
    const usernameChange = (e:ChangeEvent<HTMLInputElement>)=>{
      setUsernameVal(e.target.value)
    }
    const passwordChange = (e:ChangeEvent<HTMLInputElement>)=>{
      setPasswordVal(e.target.value)
    }
    const userName = useSelector((state:RootState) => state.name)
    const passWord = useSelector((state:RootState) => state.password)
    const gotoLogin = ()=>{
      if(!usernameVal.trim() || !passwordVal.trim()){
        message.warning("请输入完整信息！")
        return
      }
      if(usernameVal!=userName || passwordVal!==passWord)
      {
        message.warning("用户名或密码输入错误，请重新输入！")
        return
      }
      if(usernameVal===userName && passwordVal===passWord)
      {
        message.success("登录成功！")
        localStorage.setItem("token","0326")
        navigateto("/page1")
      }
      
    }
  return (
    <div className={styles.loginPage}>
        <canvas id="canvas" style={{display:"block"}}></canvas>
        <div className={styles.loginBox + " loginbox"}>
          {/* 标题部分 */}
          <div className={styles.title}>
              <h1>对抗验证码后台系统</h1>
          </div>
          <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Input placeholder="User" onChange={usernameChange}/>      
            <Input.Password placeholder="Password" onChange={passwordChange}/>
            <Button type="primary" className="loginBtn" block onClick={gotoLogin}>Login</Button>
          </Space>
        </div>
    </div>
  )
}
