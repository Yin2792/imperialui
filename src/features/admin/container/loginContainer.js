import React, { useState } from 'react'
import AdminLogin from '../components/login'
import Logo from "../../../assets/icons/logo/logo.png"
import { withCookies } from 'react-cookie';
import { fsc } from "../../../assets/fontControlHelper"
import { FetchAdminControllerLogin } from '../../../network/api.Fetched'
import { AdminDashboard } from '../../../config/routeConfig'
import { writeCookie } from '../../../helper/cookieUser'
import { withMedia } from "react-media-query-hoc";
import { DashboardNavbar } from '../components/dashboardnavbar'
import {MDBBtn} from 'mdbreact'

const LoginContainer = props => {
    const { media } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isMsg, setMeg] = useState(false)
    const HandleEmail = (e) => {
        setEmail(e.target.value)
    }
    const HandlePassword = (e) => {
        setPassword(e.target.value)
    }
    
    const moveToRegister = ()=>{
        props.history.replace('/register')
    }
    const ContainerStyle = {
        height: 'auto!important', width: '100%', position: 'absolute', minHeight: '100%',
        backgroundImage: 'linear-gradient(to right top, #40539d, #0083cf, #00aec6, #00d182, #a1e606)',
        backgroundRepeat:'no-repeat',backgroundPosition: 'center', backgroundSize: 'cover'
    }
    const mobileStyle = {
        height: 'auto!important', width: '100%', position: 'absolute', minHeight: '100%',backgroundColor:"#eee"
    }
    const CenterDiv = { width: '200px', position: 'abosolute', backgroundColor: '#6B7FD0' }
    const OuterDivStyle = {
        backgroundColor: 'white',
        padding: '40px',
    }
    const DivStyle = { backgroundColor: "white", padding: '40px', marginTop: '-15px' }
    const HandleLogin = e => {
        e.preventDefault()
        FetchAdminControllerLogin({ email, password }, (networkErr, userErr, data) => {
            if (networkErr != null) { console.log(networkErr) }
            else if (userErr != null) { setMeg(true); console.log(JSON.stringify(userErr.message)) }
            else {
                writeCookie(props.cookies, data.payload)
                props.history.push(AdminDashboard)


            }
        })
    }

    // const OuterDivStyle = {
    //     backgroundColor: 'white',
    //     padding: '40px',
    //     borderRadius: '15px',
    //     top: '120px'
    // }


    return (

        <div>
        {media.mobile ?
         <div className="container-fluid" style={mobileStyle}>
            <div className="d-flex flex-column justify-content-center my-5">

                <div style={{backgroundColor: '#6B7FD0',position:'relative'}}>
                    <div className="d-flex flex-row mb-3 justify-content-center" >
                        <div className="p-2"><img src={Logo} alt="Logo" className="w-100" /></div>
                        

                    </div>

                    <div className="d-flex p-0 m-0 justify-content-center align-items-center" >
                        <div style={DivStyle} className="col-lg-6">
                            <AdminLogin changeEmail={(e) => HandleEmail(e)}
                                changePassword={(e) => HandlePassword(e)}
                                otherprops={[email, password]}
                                onSubmit={(e) => HandleLogin(e)}
                                isMsg={isMsg} />
                        </div>
                    </div>

                </div>
            </div>
         </div>
            :
            <div className="container-fluid" style={ContainerStyle}>
            <div className="d-flex  flex-sm-row justify-content-center">
                <div className="d-flex justify-content-center" style={{ marginTop: "70px" }}>
                    <div style={CenterDiv}>

                        <div className="d-flex flex-column mb-3" style={{ marginTop: '100px' }}>
                            <div className="p-2"><img src={Logo} alt="Logo" className="w-100" /></div>
                            {/* <div className="p-2"><h5 style={{ fontSize: fsc(15), color: '#D6DAE9' }}>No Account Yet?</h5></div>
                            <div className="p-2"><MDBBtn outline color="white" onClick={()=>moveToRegister()}>Sign UP</MDBBtn></div> */}
                        </div>

                    </div>

                    <div className="d-flex p-0 m-0  justify-content-center align-items-center" >
                        <div style={OuterDivStyle}>
                            <AdminLogin changeEmail={(e) => HandleEmail(e)}
                                changePassword={(e) => HandlePassword(e)}
                                otherprops={[email, password]}
                                onSubmit={(e) => HandleLogin(e)}
                                isMsg={isMsg} />
                        </div>
                    </div>

                </div>

            </div>

         </div>

        }
    </div>


    )
}
export default withCookies(withMedia(LoginContainer))