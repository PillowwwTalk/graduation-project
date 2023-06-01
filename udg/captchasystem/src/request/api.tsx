import request from "./index"

// 请求中： 请求参数和返回值的类型都需要进行约束

// 验证码请求
export const AdvCaptchaAPI = (params:AdvCaptchaAPIReq):Promise<AdvCaptchaAPIRes> =>request.post("http://127.0.0.1:5001/captcha", params);