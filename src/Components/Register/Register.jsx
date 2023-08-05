import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Joi from 'joi'

export default function Register() {
    let navigate=useNavigate()
    const [Loading,SetLoading]=useState(false)
    const[User,SetUser]=useState({
        first_name:'',
        last_name:'',
        email:'',
        age:'',
        password:'',
    });
    const[errorValidate,SeterrorValidate]=useState([])
    const [error,Seterror]=useState('')
    function getDataFromForm(e)
    {
        let Myuser={...User};
        Myuser[e.target.name]=e.target.value;
        SetUser(Myuser);
         console.log(Myuser);
    }
   async function sendDatatoApi()
   {
    let {data}= await axios.post('https://sticky-note-fe.vercel.app/signup' ,User)
     if(data.message==='success')
     {
        SetLoading(false)
        navigate('/')
     }
     else
    {
        SetLoading(false)
      Seterror(data.message)
    }
   } 
   function SubmitData(e)
   {
    e.preventDefault()
 
    SetLoading(true)
    let validation=validiationtoForm();
    console.log(validation)
    if(validation.error)
    {
      SeterrorValidate(validation.error.details);
      SetLoading(false);
    }
    else
    {
        sendDatatoApi();
        SetLoading(false)
    }
   }
   function validiationtoForm()
   {
    let scheme= Joi.object({
        first_name:Joi.string().pattern(/^[A-Z]/).min(3).max(10).required(),
        last_name:Joi.string().pattern(/^[A-Z]/).min(3).max(10).required(),
        age:Joi.number().min(16).max(70).required(),
        email:Joi.string().email({  tlds: { allow: ['com', 'net'] } }).required(),
        password:Joi.string().pattern(/^[A-Z][a-z]{2,6}/)
  
      });
     return scheme.validate(User,{abortEarly:false})
   }
  return (
    <>
    
      <div className='d-flex justify-content-center align-items-center '>
      <div className="py-5  w-75">
        {error? <div className='alert alert-danger my-2'>{error}</div>:'' }
        {/* {errorValidate.map((ele,index)=> <div key={index} className='alert alert-danger my-2'>{ele.message}</div>)} */}
       
        { errorValidate.map((value,index)=> {
      if(value.context.label==='password')
      {
       return <div key={index} className='alert alert-danger my-2'>password invalid </div>
      }
      else
      {
        return <div key={index} className='alert alert-danger my-2'>{value.message}</div>
      }
    })}
       
       <form onSubmit={SubmitData}>
           <label className='mt-2' htmlFor="first_name">First name :</label>
           <input onChange={getDataFromForm} className='form-control text-white bg-transparent my-2' type="text" name='first_name' id='first_name' />
           <label className='mt-2' htmlFor="last_name">Last name :</label>
           <input onChange={getDataFromForm} className='form-control text-white bg-transparent my-2' type="text" name='last_name' id='last_name' />
           <label className='mt-2' htmlFor="age">Age :</label>
           <input onChange={getDataFromForm} className='form-control text-white bg-transparent my-2' type="number" name='age' id='age' />
           <label className='mt-2' htmlFor="email">Email :</label>
           <input onChange={getDataFromForm} className='form-control text-white bg-transparent my-2' type="text" name='email' id='email' />
           <label className='mt-2' htmlFor="password">Password :</label>
           <input onChange={getDataFromForm} className='form-control text-white bg-transparent my-2' type="password" name='password' id='password' />
           <button type='submit' className='btn btn-primary float-end mt-4'>{Loading===true? <i className='fa-spinner fas fa-spin'></i>:'Register' }</button>
           <h5 className='text-center pt-5 my-5 h6'>If you have an account ? <NavLink to='/'>LogIn</NavLink></h5>
           
       </form>
  
 </div>
      </div>
    </>
  )
}
