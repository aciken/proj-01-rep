import './restartPassword.css';
import axios from 'axios';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import logologin from './assets/tubeAI.logopsd.png';

export function RestartPassword(){

    const [state, setState] = useState(true);

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    

    const sendMail = async (e) => {
        e.preventDefault();
        await axios.put('proj-01-rep-backend1.onrender.com/restartPasswordMail', {
            email
        })
        .then((res) => {
            if(res.data.message === 'Email sent'){
                setState(false)
            } else {
                setError(res.data.message)
            }
        }
        )

    }


    return(
        <div className="restartPassword">
            <Link to='/'><img className='restartPassword-logo' src={logologin} alt="" /></Link>
            {state ? (
            <div className="restartPassword-container">

                <h1 className='restart-headline'>Restart Password</h1>
                <form onSubmit={(e) => sendMail(e)}>
                    <div className='email-part'>
                        <label htmlFor="">Enter Email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <button type='submit' className='send-mail'>Send Email</button>
                    <p>{error}</p>
                </form>
                </div>
                ) : 
                (
                    <div className="restartPassword-container sent">
                        <h2>Email has been sent</h2>
                    </div>


                )
}


        </div>
    )
}