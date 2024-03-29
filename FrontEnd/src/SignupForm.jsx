import './signupForm.css';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import { useState} from 'react';
import { OtherNav} from './OtherNav';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
import loading from './assets/Spinner-1.4s-237px.gif';

export function Signup(){

    const history = useNavigate()


    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [wrongInput, setWrongInput] = useState(''); 
    const [number, setNumber] = useState('');
    const [wrong, setWrong] = useState('');
    const [verificationCode, setVerificationCode] = useState(0);
    const [error, setError] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    
    const [verified, setVerified] = useState(false);


    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
     }

    const handleChangePassword = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
    
        if (newPassword.length < 8) {
          setError('Password must be at least 8 characters');
        } else if (!/\d/.test(newPassword)) {
          setError('Password must include at least one number');
        } else {
          setError('');
          setWrongPassword(true)
        }
      };


    const handleChange = (event) => {
        setNumber(event.target.value);
        setWrong('')
      };

    const sendVerification = async function(e){
        if(verificationCode == number){
            
                  history("/logedPage",{state: {id: email}});
                  await axios.put("https://proj-01-rep-backend1.onrender.com/verified", {
                    email 
                })
        } else {
            e.preventDefault()
            setWrong("Wrong verification code")
            setNumber('')
        }
    }

    async function submit(e){
      e.preventDefault();

        if(email === "" || password === "" || firstName === "" ){
            setWrongInput("Please fill all the fields")
        } else if(wrongPassword){

        
      try{
        setIsLoading(true);
          await axios.post("https://proj-01-rep-backend1.onrender.com/signup", {
              email,password,firstName
          })
          .then(res => {
              if(res.data !== "exist"){

                if(res.data.verified > 1){
                    setVerified(true)
                    setVerificationCode(res.data.verified)
                    const code = res.data.verified

                    axios.post("https://proj-01-rep-backend1.onrender.com/sendMail", {
                        email,code
                    
                })
                .catch(e => {
                    console.log(e);
                })
                    
                }
  



              }
              else if(res.data === "exist"){
                  setWrongInput("Email already exist")
                    setIsLoading(false);
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

  }}


    return(
        <div>
            <OtherNav/>
            <div className="signup">
                {!verified ? (
                        <div className="signForm-border">
                        <p>Create your account</p>
                            <form className="signup-form" onSubmit={submit}>
                            <input className="sign-firstName" type="text" placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}}/>
                                <input className="sign-email" type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                                <div className='password-combined'>
                <input className="login-password"
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChangePassword}
                  autoComplete="current-password"
             />
             <span className='toggle-btn'  onClick={handleToggle}>
                  <Icon icon={icon} size={25}/>
              </span>
            </div>
            {error && <p className='password-error'>{error}</p>}

                                <p className='wrong-input'>{wrongInput}</p>
                                <button className='sign-btn' type='submit'>Sign Up</button>
                                <p className='login-link'>Already have an account? <Link to="/login">Log In</Link></p>
                                {isLoading ? <img src={loading} alt="" className='loading' /> : null}
                            </form>
                        </div>
                ) : (
                    <div>
                        <form className='verification-form'  onSubmit={sendVerification}>
                            <p>Check inbox for verification code</p>
                            <input type="numbers" name="verification-code" id="verification-code" required onChange={handleChange} value={number} placeholder='Verification Code' className='verification-input'/>
                            <button  className='submit-verification'>Submit</button>
                            <p className='wrong-verification'>{wrong}</p>
                        </form>
                    </div>
                )}
             </div>
        </div>


    )
}