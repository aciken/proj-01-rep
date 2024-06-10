import './newPassword.css';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import logologin from './assets/tubeAI.logopsd.png';


export function NewPassword(){

    const { changablePart } = useParams();
    console.log(changablePart)

    const [exist, setExist] = useState(false);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        
                axios.post('proj-01-rep-backend1.onrender.com/linkExist', { changablePart })
                .then((response) => {
                    console.log(response.data)
                setExist(response.data);
                })
                .catch((error) => {
                    console.log(error)
                })

    }, []);
    

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [error, setError] = useState('');

    const restartPassword = async (e) => {
        e.preventDefault();
if(password.length < 8){
    setError('Password must be at least 8 characters long')
} else if(!/\d/.test(password)){
    setError('Password must contain at least one number')
} else if(password !== repeatPassword){
    setError('Passwords do not match')
} else {



        await axios.put('proj-01-rep-backend1.onrender.com/restartPassword', {
            changablePart, password
        })
        .then((res) => {
            if(res.data.message === 'Password changed'){
                setLogin(true)
            } else {
                setError(res.data.message)
            }
        }
        )

    }

    }
    return(
        <div className="newPassword">
            <Link to='/'><img className='newPassword-logo' src={logologin} alt="" /></Link>
            {!exist && !login ? (
            <div className="newPassword-container">
            <h1 className='newPassword-headline'>New Password</h1>
                <form onSubmit={(e) => restartPassword(e)}>
                    <div className='password-part'>
                        <label htmlFor="">Enter New Password</label>
                        <input type="password" onChange={(e) =>{ setPassword(e.target.value); setError("")}} required />
                    </div>
                    <div className='password-part'>
                        <label htmlFor="">Confirm New Password</label>
                        <input type="password" onChange={(e) => {setRepeatPassword(e.target.value); setError("")}} required/>
                    </div>

                    <p className='error-place'>{error}</p>
                    <button type='submit' className='send-mail'>Send Email</button>
                </form>
            </div>

            ) : login ? (
                <div className="newPassword-container backLog">
                    <h2>Password has been changed</h2>
                    <Link className='goToLog' to='/login'>Login</Link>
                </div>
            ) : (
 
                    <h1 className='link-expired'>Link Expired or Doesn't Exist</h1>
) 
}
        </div>
        

    )
}