import React from 'react'
import './AccountSetting.css'

const AccountSettings = () => {
  return (
    <div className='accountsettings'>
      <h1 className='mainhead1'> Account Settings</h1>

      <div className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Your Name: </label>
          <input type='text' id='name' name='name'></input>
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Your Phone: </label>
          <input type='text' id='phone' name='phone'></input>
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Your Email: </label>
          <input type='text' id='email' name='email'></input>
        </div>

        
      </div>
      <button className='save-button'>Save Changes</button>
    </div>
  )
}

  export default AccountSettings