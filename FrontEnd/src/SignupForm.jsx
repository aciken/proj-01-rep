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

                  


                  history("/logedPage",{state: {id: email}})
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
             </div>
        </div>


    )
}