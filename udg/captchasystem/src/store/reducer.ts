import { flushSync } from "react-dom"
import { json } from "react-router-dom"

const defaultState = {
    name:'zhj010326',
    password:'Zhj20010326',
    fl: [],
}
let reducer = (state = defaultState, action:{type:string, val: any})=>{
    let newState = JSON.parse(JSON.stringify(state))
    
    switch(action.type) {
        case "changeList":
            var mark = 0
            newState.fl.map((value: { uid: any }, key: any)=>{
                if(value.uid == action.val.uid) {
                    mark = 1
                }
            }) 
            if(mark === 0) {
            newState.fl.push(action.val)
            }
        default :
            break
    }
    return newState
}
export default reducer