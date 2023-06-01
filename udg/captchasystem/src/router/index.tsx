import { Navigate } from "react-router-dom";
import React, {Children, lazy} from "react"
import Home from "../view/home";
import Login from "../view/login";
const Page1 = lazy(() => import("../view/page1"))
const Page2 = lazy(() => import("../view/page2"))
const Page3 = lazy(() => import("../view/page3"))

const withLoadingCompnent = (comp:JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)
const router = [
    {
        path:"/",
        element:<Navigate to="/page1"/>
    },
    {
        path:"/",
        element:<Home/>,
        children:[
            {
                path:"/page1",
                element:withLoadingCompnent(<Page1/>)
            },
            {
                path:"/page2",
                element:withLoadingCompnent(<Page2/>)
            },
            {
                path:"/page3",
                element:withLoadingCompnent(<Page3/>)
            }
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"*",
        element:<Navigate to="/page1"/>
    }
    
]

export default router
