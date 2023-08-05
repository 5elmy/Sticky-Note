
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'


 export let MediaContext=createContext('')

export default function MediaContextProvider(props)
{
    const token= localStorage.getItem('token')
    // console.log(token)
    const decode=jwtDecode(token);
    let {citizenID}=jwtDecode(token);
    let {NoteID}=jwtDecode(token)
    console.log(decode);
    const userId=decode._id;
    // console.log(userId);
    const [notes, setnotes]=useState([])
    async function getUserNotes()
    {
        let {data}=await  axios.post(`https://sticky-note-fe.vercel.app/getUserNotes`,{token,userId});
         console.log(data.Notes);
        setnotes(data.Notes)
    }
    useEffect(()=> {getUserNotes()} , [])

    return <MediaContext.Provider value={{notes,token,userId,getUserNotes,citizenID,NoteID}}>
       { props.children}
    </MediaContext.Provider>
}