import './signupForm.css';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';
import { useState} from 'react';

export function Signup(){

    const history = useNavigate()


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');


    async function submit(e){
      e.preventDefault();

      try{

          await axios.post("http://localhost:3000/signup", {
              email,password,firstName,lastName
          })
          .then(res => {
            console.log(res.data)
              if(res.data !== "exist"){
                  const tier =  res.data.tier
                  const usage = res.data.usage
                  


                  history("/logedPage",{state: {id: email, tier, usage}})
              }
              else if(res.data === "exist"){
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
        <div className="signup">
                    <div className="signForm-border">
                    <p>Create your account</p>
                        <form className="signup-form">
                        <input className="sign-firstName" type="text" placeholder="First Name" onChange={(e) => {setFirstName(e.target.value)}}/>
                        <input className="sign-lastName" type="text" placeholder="Last Name" onChange={(e) => {setLastName(e.target.value)}}/>
                            <input className="sign-email" type="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                            <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                            <label className='checkBox-agg'>
                        <input type="checkbox"  />
                        I agree to the terms and conditions
                    </label>
                            <button className='sign-btn' onClick={submit}>Sign Up</button>
                            <p className='login-link'>Already have an account? <Link to="/login">Log In</Link></p>
                        </form>
                    </div>
         </div>


    )
}