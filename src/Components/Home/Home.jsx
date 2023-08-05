import React, { useContext, useState } from 'react'
import { MediaContext } from '../../Context/StoreContext'
import {MdDelete} from 'react-icons/md'
import {RiEdit2Fill} from 'react-icons/ri'
import axios from 'axios';
import AddNotes from '../AddNotes/AddNotes';
import Swal from 'sweetalert2'

export default function Home() {
    let{notes,token,getUserNotes,NoteID}= useContext(MediaContext);
    const [errorDeleted, seterrorDeleted] = useState('')
    console.log(notes)
 
    function updateNote(index ,e)
    {//async
      e.preventDefault();
    //  let {data}=await axios.put(``,{data:{title:UserUpdate.title,desc:UserUpdate.desc,NoteID,token}})
      console.log(index) 
  } 



    //-----------------------------------------------delete---------------------------------------
   async function DeleteNote(NoteID)
    {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        ( async()=>{

          let {data}= await axios.delete(`https://sticky-note-fe.vercel.app/deleteNote`,{data:{ NoteID, token }});
          console.log(data);
          if(data.message==='deleted')
          {
           getUserNotes()
           swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          }
          else
          {
           seterrorDeleted(data.message);
          }

        })()
        


       
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })



      
      
    }
    
    
  return (
    <>
    <div className="container">
        <div className="row">
            {errorDeleted?<div className='alert alert-danger my-2'>{errorDeleted}</div>:""}
            <AddNotes/>
         {notes?.map((ele,index)=><div key={index}  className='col-md-4 my-4 '>          
            <div className='notedetails bg-info py-5'>
                <h3 className='float-start h6'>{ele.title}</h3>
                <a className='float-end text-danger px-3'  onClick={()=>DeleteNote(ele._id) }> <MdDelete/></a>
                {/* update */}
                <a href='' className='float-end' onClick={()=>updateNote(index) } ><RiEdit2Fill/></a>
                <span className='clearfix'></span>
                <p>{ele.desc}</p>


            </div>


        </div>) }

        </div>
    </div>
  
    
    </>
  )
}
