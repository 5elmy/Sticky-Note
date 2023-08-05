import axios from 'axios';
import React, { useContext, useState } from 'react'
import {AiOutlineFileAdd} from 'react-icons/ai'
import Swal from 'sweetalert2';
import { MediaContext } from '../../Context/StoreContext';
export default function AddNotes() {
    let{token,userId,getUserNotes, citizenID}= useContext(MediaContext);
    
   
    const [userData, setuserData] = useState({
     
        title:'',
        desc:'',
       
    })

    function getUserNotesInAddNote(e)
    {
     let User={...userData};
     User[e.target.name]=e.target.value;
     setuserData(User);
     console.log(User)
    }
    async function AddNote(e)
    {
        e.preventDefault();
        let data=await axios.post(`https://sticky-note-fe.vercel.app/addNote`,{title:userData.title,desc:userData.desc,citizenID,token}) 
        console.log(data);
        if(data.data.message === 'success')
        {
          Swal.fire('Added!', '', 'success').then(()=>{  getUserNotes();})
          
        }
    }
  return (
    <>
    {/* <!-- Button trigger modal --> */}
<div>
  <button 
  type="button" 
  className="btn btn-light shadow-lg ms-auto my-3" 
  data-bs-toggle="modal" 
  data-bs-target="#exampleModal">
   <AiOutlineFileAdd className='me-1 fs-4'/> New Note
  </button>
 
  <div className="modal fade " id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
   
    <form  onSubmit={AddNote}>
          <div className="modal-dialog ">
      <div className="modal-content bg ">
        <div className="modal-header bg ">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Add Note</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body bg text-white">

         <input type="text" placeholder='type title' name='title' onChange={getUserNotesInAddNote} className='form-control bg-transparent text-white' />
         <textarea onChange={getUserNotesInAddNote} className='form-control my-3 bg-transparent text-white' placeholder='Type Your Note' name="desc" id="" cols="30" rows="10"></textarea>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn bg" data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </div>
    </div>

    </form>
  </div>
</div>

    
    </>
  )
}
