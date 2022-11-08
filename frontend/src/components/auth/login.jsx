import React from 'react';
import {Card, TextField, Button, Typography, InputAdornment, IconButton} from '@mui/material'
import { Snackbar, Alert } from '@mui/material';
// import Logo from '../../assests/ChilipiliLogo.png'
import './login.css'
import axios from 'axios';
import { url } from '../../globalurl';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// get width of view port
const sw = window.innerWidth

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username : "",
            password : "",
            visibility : false,
            alertMsg : null,
            alert : false,
            severity : null
        }
    }

    // handle login form validation
    // @param from state

    handleValidate = () => {
        if (this.state.username === "" && this.state.password === "") {
            this.setState({alert : true, alertMsg : "User Name and Password cannot be empty!!", severity: 'error'})
        } else if (this.state.username === "") {
            this.setState({alert : true, alertMsg : "User Name is required!!", severity: 'error'})
        } else if (this.state.password === "") {
            this.setState({alert : true, alertMsg : "Password is required!!", severity: 'error'})
        } else {
            return true
        }
    }

    // handle login function
    // @param none

    handleLogin = async () => {
        let formData = {
            username : this.state.username,
            password : this.state.password
        }
        if (this.handleValidate()) {
            await axios({
                method : "POST",
                data : formData,
                headers : {
                    "Content-Type" : "application/json"
                },
                url : `${url}dj-rest-auth/login/`
            }).then((res) => {
                if (res.status === 200) {
                    return res.data
                } 
            }).then((result) => {
                if (result.access_token) {
                    localStorage.setItem('access-token', result.access_token)           // store access token in local for auth check
                    localStorage.setItem('refresh-token', result.refresh_token)         // store refresh token in local for auth check
                    localStorage.setItem('uName', result.user.username)                 // store username
                    localStorage.setItem('uId', result.user.id)                         // store user Id
                    localStorage.setItem('type', result.user.type)                   // store user type
                    if (result.user.isStaff) {
                        this.props.setRole("Staff")
                    } else if (result.user?.isAdmin) {
                        this.props.setRole("Admin")
                    }
                    // Later store user types too
                    this.props.setIsLogged(true)
                }
            })
            .catch((err) => {
                if (err.response.status === 401 || err.response.status === 400) {
                    this.setState({alert : true, alertMsg : err.response.data.non_field_errors[0], severity: 'error'})
                    this.props.setIsLogged(false)
                }
            })
        }
        
    }
    
    

    render() {
        return (
            <div className="loginContainer">
                <Card sx={{
                    minWidth : sw/4,
                    minHeight : 400,
                    borderRadius : 15/4,
                    padding : 10/4,
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                }}>
                    <div style={{padding:20}}>
                        <div style={{display:'flex', gap:18, flexDirection:"column", alignItems : 'center'}}>
                            {/* <img alt="logo" src={Logo} width={140} /> */}
                            <Typography fontSize={20} fontFamily={"Raleway"} fontWeight={500} color="secondary">Login to your account</Typography>
                            <TextField 
                                value={this.state.username} 
                                style={{width:"85%"}}
                                color="secondary"
                                variant="outlined" 
                                label="Username" 
                                onChange={(e) => this.setState({username : e.target.value})} />
                            <TextField 
                                value={this.state.password} 
                                type={this.state.visibility ? "text" : "password"}
                                style={{width:"85%"}}
                                color="secondary"
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => this.setState({visibility: !this.state.visibility})}
                                        >
                                        {!this.state.visibility && <VisibilityIcon />}
                                        {this.state.visibility && <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}
                                variant="outlined" 
                                label="Password" 
                                onChange={(e) => this.setState({password : e.target.value})}/>
                        </div>
                        <Button 
                            fullWidth 
                            variant="outlined"
                            color="secondary"
                            sx={{
                                marginTop : 15/4,
                                height : 48
                            }}  
                            focusRipple 
                            onClick={this.handleLogin}
                            >Sign In</Button>
                    </div>
                </Card>
                <Snackbar 
                    anchorOrigin={{ vertical : "top", horizontal : "right" }} 
                    open={this.state.alert} autoHideDuration={5000}
                    onClose={() => this.setState({alert : false})}>
                    <Alert variant="filled" elevation={6} onClose={() => this.setState({alert : false})} severity={this.state.severity}>
                        {this.state.alertMsg}
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

export default Login