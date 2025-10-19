import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
 import './Main.css';


function Main() {
const [first, setfirst] = useState('')
const [first1, setfirst1] = useState('')
const [item, setitem] = useState([])
const [update, setupdate] = useState('')

const [uparray, setuparray] = useState([])
const [tosetinput, settosetinput] = useState('')
const [tosetarea, settosetarea] = useState('')


async function add(){
const res= await fetch("http://localhost:5000/add",{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify({first,first1}),
});


const data= await res.json();


if(data.success){
alert(data.text)
}else{
    alert(data.text)
}

 }

 async function api(){
let promise= await fetch("http://localhost:5000/get");
let data=await promise.json();
 setitem(data)
 }
 useEffect(() => {
  api()
 }, [])
 

async function remove(id){
const res= await fetch("http://localhost:5000/remove",{
method:"DELETE",
headers:{"content-type":"application/json"},
body:JSON.stringify({id}),
});

const data=await res.json();

if (data.success){
  alert(data.msg)
}else{
  alert("error to delete ");
}
 }


 async function find(){
  
 const res= await fetch("http://localhost:5000/getupdate",{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify({update}),
});

const data =await res.json();

 
if (data.success === false || data.data.length === 0) {
  alert("No match found");
} else {

  console.log(data.data)
    console.log(data.data[0])

   setuparray(data.data)  
  settosetinput(data.data[0].title)
  settosetarea(data.data[0].note)
}


 }



async function edit() {
   const res = await fetch("http://localhost:5000/update", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ update,tosetarea,tosetinput }),
    });

const data=await res.json();

if(data.success){
  alert("yes")
   api(); 
}else{
    alert("no")

}

}

  return (
    <>
    <div id='container'> 
      <nav id="navbar">
  <div className="nav-logo">NOTES</div>
</nav>


      <div id='main1'> 
        <h4>Add Notes</h4>
    Enter Title:<input type='text' value={first} onChange={(e)=>setfirst(e.target.value)}></input><br></br><br></br><br></br>
    <textarea rows="9" cols="50" value={first1} placeholder='enter notes'  onChange={(e)=>setfirst1(e.target.value)}></textarea><br></br>
    <button onClick={add}>add</button> 
   </div>


  <div id='update'>
    <h3>update  the database</h3> 
   Enter Title:<input type='text' value={update} onChange={(e)=>setupdate(e.target.value)}></input> <button onClick={find}>find</button>


{uparray && uparray.map((value) => (
  <div  key={value._id}>
    Enter Title:<input type='text' value={tosetinput} onChange={(e)=>settosetinput(e.target.value)}></input><br></br><br></br><br></br>
    <textarea rows="9" cols="50" value={tosetarea} placeholder='enter notes'  onChange={(e)=>settosetarea(e.target.value)}></textarea><br></br>
    <button onClick={edit}>edit</button>
   </div> 
))}
</div>
 
 
 
 
 
 
 <div id='display'> 
    <h3>display the database</h3> 
    {item && item.map((value) => (
      <div style={{display:'flex',width:'100px'}} >
  <p key={value._id}>{value.title}</p> 
  <button  onClick={()=>remove(value._id)}>remove</button>  </div>
))}

 </div>

    </div>
    </>
  )
}
 
export default Main