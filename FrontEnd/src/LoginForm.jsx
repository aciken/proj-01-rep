import './loginForm.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


export function Login(){

    const history = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:3000/login", {
                email,password
            })
            .then(res => {
                if(res.data !== "not exist"){
                    const tier =  res.data.tier
                    const usage = res.data.usage
                    

 
                    history("/logedPage",{state: {id: email, tier, usage}})
                }
                else if(res.data === "not exist"){
                    alert("user does not exist")
                }
            })
            .catch(e => {
                alert("wrong details")
                console.log(e);
            })

            
        }
        catch(e){
            console.log(e)
        }

    }

    return(
        <div className="login">
                    <div className="form-border">
                    <p>Log in to your account</p>
                        <form className="login-form">
                            <input className="login-email" type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                            <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                            <a href='#' className="forgot">Forgot Password?</a>
                            <button className='sign-btn' onClick={submit}>Sign In</button>
                        </form>

                        <p className="sign-up" >Dont have an account?<Link to="/signup">Sign Up</Link></p>
                    </div>
         </div>


    )
}