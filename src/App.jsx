import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home'
import Layout from './Components/LayOut/Layout'
import Login from './Components/Login/Login'
import Notfound from './Components/NotFound/Notfound'

import Register from './Components/Register/Register'

export default function App() {
  let routes=createBrowserRouter([{
    path:'/' ,element:<Layout/> ,children:[
      {index:true,element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'home',element:<Home/>},
      {path:'*',element:<Notfound/>}
    ]
  }])
  return (
    <>
   
    <RouterProvider router={routes} />
    </>
  )
}

