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
    const [number, setNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState(0);
    const [notverified, setnotVerified] = useState(false);
    const [wrong, setWrong] = useState('');


    const handleChange = (event) => {
        setNumber(event.target.value);
      };

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
                    console.log(res.data)

                    if(res.data.verified !== 1 ){
                        setnotVerified(true)
                        setVerificationCode(res.data.verified)
                    } else {
                        history("/logedPage",{state: {id: email}})
                    }

 

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


    const sendVerification = async function(e){
        if(verificationCode == number){
                  history("/logedPage",{state: {id: email}});
                  await axios.put("http://localhost:3000/verified", {
                    email 
                })
                .then(console.log('verified user'))
        } else {
            e.preventDefault()
            setWrong("Wrong verification code")
        }
    }

    return(
        <div>
            <OtherNav/>
            <div className="login">
                {!notverified ? (
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
                ) : (
                    <div>
                        <form  onSubmit={sendVerification}>
                            <input type="numbers" name="" id="" required onChange={handleChange}/>
                            <button type='submit'>Submit</button>
                            <p>{wrong}</p>
                        </form>
                    </div>
                )
}
             </div>
        </div>


    )
}