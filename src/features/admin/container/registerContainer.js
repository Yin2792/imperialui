import React, { useState } from 'react'
import { Login } from '../../../config/routeConfig'
import { MDBBtn, MDBInput } from 'mdbreact'
import { FetchAuthControllerRegister } from '../../../network/api.Fetched'
export const RegisterContainer = props => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [isMsg, setMeg] = useState(false)

    const HandleRegister = e => {
        e.preventDefault()
        FetchAuthControllerRegister({ name, email, password, phone }, (networkErr, userErr, data) => {
            if (networkErr != null) { console.log(networkErr) }
            else if (userErr != null) { setMeg(true); console.log(JSON.stringify(userErr.message)) }
            else {
               
                props.history.replace('/login')
            }
        })
    }

    const OuterDivStyle = {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        
    }


    return (
        <div className="container-fluid m-0 p-0" style={{
            backgroundImage: `url("https://imperialcafemyanmar.com/assets/img/Restaurant.jpg")`,
            height: 'auto!important', height: '100%', position: 'fixed', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'
        }}>

            <div style={{
                height: 'auto!important', width: '100%', position: 'absolute', minHeight: '100%', backgroundColor: 'rgba(0,0,0,0.5)'

            }}>
            </div>

            <div className="row p-0 m-0  justify-content-center align-items-center">
                <div style={OuterDivStyle} className="col-lg-4 col-md-6 col-10 col-xl-4" >
                    <form onSubmit={(e) => HandleRegister(e)}>
                        <h2 className="text-center">Regiter Form</h2>
                        <div className="py-1">
                            <MDBInput label="name" outline  size="lg" onChange={(e) => setName(e.target.value)} type="text" value={name} validate required />
                            <MDBInput label="email" size="lg" outline onChange={(e) => setEmail(e.target.value)} type="email" value={email} validate required />
                            <MDBInput label="password" outline size="lg" onChange={(e) => setPassword(e.target.value)} type="password" value={password} validate required />
                            <MDBInput label="phone" outline size="lg" onChange={(e) => setPhone(e.target.value)} type="phone" value={phone} validate required />
                            <MDBBtn rounded gradient="purple" type="submit" style={{marginTop:'-10px'}}>Register</MDBBtn>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}