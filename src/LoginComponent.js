import React, { useState} from 'react';
import{Typography, TextField, Button} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LoginComponent() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:3001/register/signin",{...formData});  
        if(response.data){
            localStorage.setItem("token",response.data);
            navigate("/products");
        }
      };
        
    return(
        <>
        <div style={{margin:"10%", paddingLeft:"30%"}}>
            <Typography variant="h4"> Signin Yourself!!! </Typography><br/>
            <form onSubmit={handleSubmit}>
                <div>
                <TextField id="standard-basic" label="Email" variant="standard" type="email" name="email" value={formData.email} onChange = {(e)=> setFormData({...formData,email:e.target.value})} />
                </div><br/>
                <div>
                <TextField id="standard-basic" label="Password" variant="standard" type="password" name="password" value={formData.password} onChange = {(e)=> setFormData({...formData,password:e.target.value})}/>
                </div><br/>
                <Button variant="contained" type="submit">SignIn</Button>
            </form>
        </div>
        </>
    )
}

export default LoginComponent;