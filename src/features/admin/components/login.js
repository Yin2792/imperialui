import React, { useState } from "react"
import { MDBInput, MDBBtn } from "mdbreact"
import { Link } from 'react-router-dom'
import "../../../../node_modules/mdbreact/dist/css/mdb.css"


const AdminLogin = (props) => {
  const { changeEmail, changePassword, otherprops, onSubmit, isMsg } = props


  return <form onSubmit={onSubmit}>
    <h2 className="text-center">Account Login</h2>
    <div className="py-2">
      <MDBInput label="email" outline style={isMsg ?
        { outline: '0!important', borderColor: 'red', boxShadow: 'none' } : null} size="lg" onChange={changeEmail} type="email" value={otherprops[0]} validate required />
      <MDBInput outline size="lg" label="password" style={isMsg ?
        { outline: '0!important', borderColor: 'red', boxShadow: 'none' } : null} onChange={changePassword} type="password" value={otherprops[1]} validate required />
      <p className="d-flex justify-content-start">{isMsg && <span style={{ color: isMsg ?'red' :null}}><i className="fa fa-warning">Email and password didn't match</i></span>}</p>
      <div className="d-flex justify-content-between">
        {/* <p ><Link to="/signup" style={{ textDecoration: 'none', fontSize: '14pt' }} >
          Forgot Password?
         </Link></p> */}
        {/* <div className="form-check" >
          <input type="checkbox" className="form-check-input"
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
          <label className="form-check-label px-1" style={{ fontSize: '14pt' }}>Remember Me</label>
        </div> */}
      </div>
      <MDBBtn rounded gradient="purple" type="submit"> Login</MDBBtn>
    </div>
  </form>
};

export default AdminLogin;
