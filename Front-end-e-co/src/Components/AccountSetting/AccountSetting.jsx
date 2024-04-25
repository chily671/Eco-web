import React from 'react'
import './AccountSetting.css'
import { useState } from 'react'

const AccountSettings = () => {
  const [formData,setFormData] = useState({
    username:"",
    phone:"",
    email:""
  })

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  
const SetChange = async () =>{
    console.log("signup Function Excuted",formData);
    let responseData;
    await fetch('/changeinfo',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)
  
    if(responseData.success) {
      window.location.replace("/profile/overview");
    }
    else {
      alert(responseData.errors)
    }
  
  }


  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'> Account Settings</h1>

      <div className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Your Name: </label>
          <input name='username' value={formData.username} onChange={changeHandler}  type='text' id='name' ></input>
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Your Phone: </label>
          <input name="phone" value={formData.phone} onChange={changeHandler}  type='text' id="phone"></input>
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Your Email: </label>
          <input name='email' value={formData.email} onChange={changeHandler} type="email" id='email'></input>
        </div>

        
      </div>
      <button className='save-button' onClick={()=>{SetChange()}}>Save Changes</button>
    </div>
  )
}

  export default AccountSettings