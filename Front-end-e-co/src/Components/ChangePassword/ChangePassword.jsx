import React from 'react'
import './ChangePassword.css'

const ChangePassword = () => {
  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'> Personal Information</h1>

      <div className='form'>
        <div className='form-group'>
          <label htmlFor='oldpass'>Old Password: </label>
          <input type='text' id='oldpass' name='oldpass'></input>
        </div>

        <div className='form-group'>
          <label htmlFor='newpass'>New Password: </label>
          <input type='text' id='newpass' name='newpass'></input>
        </div>
        
      </div>
      <button className='save-button'>Save Changes</button>
    </div>
  )
}

  export default ChangePassword