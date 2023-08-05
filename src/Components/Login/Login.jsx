import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {

    let navigate=useNavigate()
    const [Loading,SetLoading]=useState(false)
    const[User,SetUser]=useState({
        email:'',
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
    let {data}= await axios.post('https://sticky-note-fe.vercel.app/signin' ,User)
     if(data.message === 'success')
     {
        SetLoading(false);
        navigate('home');
        localStorage.setItem('token',data.token);
        console.log(data);
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
         <label className='mt-2' htmlFor="email">Email :</label>
         <input onChange={getDataFromForm} className='form-control text-white bg-transparent my-2' type="text" name='email' id='email' />
         <label className='mt-2' htmlFor="password">Password :</label>
         <input onChange={getDataFromForm} className='form-control text-white bg-transparent my-2' type="password" name='password' id='password' />
         <button type='submit' className='btn btn-primary float-end mt-4'>{Loading===true? <i className='fa-spinner fas fa-spin'></i>:'log in' }</button>
         <h5 className='text-center pt-5 my-5 h6'> new account ? <NavLink to='register'>Sign UP</NavLink></h5>
         
     </form>

</div>
    </div>
  </>
)
}

