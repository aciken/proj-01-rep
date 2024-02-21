import './signupForm.css';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import { useState} from 'react';
import { OtherNav} from './OtherNav';

export function Signup(){

    const history = useNavigate()


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [wrongInput, setWrongInput] = useState(''); 
    const [number, setNumber] = useState('');
    const [wrong, setWrong] = useState('');
    const [verificationCode, setVerificationCode] = useState(0);

    
    const [verified, setVerified] = useState(false);


    const handleChange = (event) => {
        setNumber(event.target.value);
      };

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

    async function submit(e){
      e.preventDefault();

        if(email === "" || password === "" || firstName === "" || lastName === ""){
            setWrongInput("Please fill all the fields")
        } else{

        
      try{

          await axios.post("http://localhost:3000/signup", {
              email,password,firstName,lastName
          })
          .then(res => {
            console.log(res.data)
              if(res.data !== "exist"){
                if(res.data.verified > 1){
                    setVerified(true)
                    setVerificationCode(res.data.verified)
                    const code = res.data.verified
                    console.log(code)

                    axios.post("http://localhost:3000/sendMail", {
                        email,code
                    
                })
                .then(console.log('mail sent'))
                .catch(e => {
                    console.log(e);
                })
                    
                }
  



              }
              else if(res.data === "exist"){
                  setWrongInput("Email already exist")
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
                            <input className="sign-lastName" type="text" placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}}/>
                                <input className="sign-email" type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                                <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                                <p className='wrong-input'>{wrongInput}</p>
                                <button className='sign-btn' type='submit'>Sign Up</button>
                                <p className='login-link'>Already have an account? <Link to="/login">Log In</Link></p>
                            </form>
                        </div>
                ) : (
                    <div>
                        <form  onSubmit={sendVerification}>
                            <input type="numbers" name="" id="" required onChange={handleChange}/>
                            <button type='submit'>Submit</button>
                            <p>{wrong}</p>
                        </form>
                    </div>
                )}
             </div>
        </div>


    )
}