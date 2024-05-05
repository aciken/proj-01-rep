import './loginForm.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { OtherNav} from './OtherNav';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';
import loading from './assets/Spinner@1x-1.5s-200px-200px.gif';
import logologin from './assets/tubeAI.logopsd.png'

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
    const [isLoading, setIsLoading] = useState(false);


    const [type, setType] = useState('password');
const [icon, setIcon] = useState(eyeOff);

const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }

    const handleChange = (event) => {
        setNumber(event.target.value);
      };

    async function submit(e){
        e.preventDefault();

        if(email === "" || password === ""){
            setWrongInput("Please fill all the fields")
        } else{
            setIsLoading(true); 


        try{

            await axios.post("https://proj-01-rep-backend1.onrender.com/login", {
                email,password
            })
            .then(res => {
                if(res.data !== "not exist"){


                    if(res.data.verified !== 1 ){
                        setnotVerified(true)
                        setVerificationCode(res.data.verified)
                    } else {
                        history("/logedPage",{state: {id: email}})
                    }

 

                }
                else if(res.data === "not exist"){
                    setWrongInput("Wrong Email or Password")
                    setIsLoading(false);
                }
            })
            .catch(e => {
                setWrongInput("Wrong Email or Password")
                setIsLoading(false);
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
                  await axios.put("https://proj-01-rep-backend1.onrender.com/verified", {
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
            <div className="login">
                <Link to='/'><img className='login-logo' src={logologin} alt="" /></Link>
                {!notverified ? (
                        <div className="form-border" >
                        <h1 className='welcome'>Welcome Back!</h1>
                            <form className="login-form">
                                
                                <div className="email-comb">
                                    <label htmlFor="email">Email</label>
                                    <input className="login-email"  name="email" type="email"  onChange={(e) => {setEmail(e.target.value)}} required/>
                                </div>
                                <div className='password-combined'>
                <label htmlFor="password">Password</label>
                <input className="login-password"
                  type={type}
                  name="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
             />
             {/* <span className='toggle-btn'  onClick={handleToggle}>
                  <Icon class="absolute mr-10" icon={icon} size={25}/>
              </span> */}

            </div>
                                <p className='wrong-input'>{wrongInput}</p>
                                {/* <a href='#' className="forgot">Forgot Password?</a> */}
                                <button className='sign-btn' onClick={submit}>Login</button>

                                <p className="go-to-signup" >Don't have an account?<Link to="/signup">Sign Up</Link></p>
                            </form>

                            

                            {isLoading ? <img src={loading} alt="" className='loading' /> : null}

                        </div> 
                ) : (
                    <div>
                        <form className='verification-form'  onSubmit={sendVerification}>
                            <h2>Verify your email</h2>
                            <div className="change-ver-pos">
                                <div className="verification-comb">
                                    <label htmlFor="verication-code">Veriification code</label>
                                    <input type="numbers" name="verification-code" id="verification-code" required onChange={handleChange} value={number}  className='verification-input'/>
                                </div>
                            </div>
                            <button  className='submit-verification'>Submit</button>
                            <p className='wrong-verification'>{wrong}</p>
                        </form>
                    </div>
                )
}
             </div>
        </div>


    )
}