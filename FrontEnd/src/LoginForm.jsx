import './loginForm.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { OtherNav} from './OtherNav';

export function Login(){

    localStorage.removeItem('id');
    localStorage.removeItem('tier');
    localStorage.removeItem('usage');

    const history = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongInput, setWrongInput] = useState('');

    async function submit(e){
        e.preventDefault();

        if(email === "" || password === ""){
            setWrongInput("Please fill all the fields")
        } else{

        
        try{

            await axios.post("http://localhost:3000/login", {
                email,password
            })
            .then(res => {
                if(res.data !== "not exist"){
 

                    

 
                    history("/logedPage",{state: {id: email}})
                }
                else if(res.data === "not exist"){
                    setWrongInput("Wrong Email or Password")
                }
            })
            .catch(e => {
                console.log(e);
                setWrongInput("Wrong Email or Password")
            })

            
        }
        catch(e){
            console.log(e)
        }
    }

    }

    return(
        <div>
            <OtherNav/>
            <div className="login">
                        <div className="form-border">
                        <p>Log in to your account</p>
                            <form className="login-form">
                                <input className="login-email" type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} required/>
                                <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} required/>
                                <p className='wrong-input'>{wrongInput}</p>
                                <a href='#' className="forgot">Forgot Password?</a>
                                <button className='sign-btn' onClick={submit}>Sign In</button>
                            </form>

                            <p className="sign-up" >Dont have an account?<Link to="/signup">Sign Up</Link></p>

                        </div>
             </div>
        </div>


    )
}