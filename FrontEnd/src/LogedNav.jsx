import './nav.css';
import logo from './assets/logo.png';
import { useState } from 'react';

export function LogedNav({navRes, onChangeNavRes}){

    const [navValue, setNavValue] = useState('Profile');

    const changeNavRes = (e) => {
        e.preventDefault();
        if(navValue === 'Profile'){
            console.log('change to main')
            onChangeNavRes('profile-page');
            setNavValue('Home');
            console.log(navRes)
        }else{
            onChangeNavRes('main-page');
            setNavValue('Profile');
        }
      };

    return (
        <div className="whole-nav">
            <a href="#" className="left-nav-part">
                <img src={logo} onClick={(e) => e.preventDefault()} alt="Logo" />
            </a>
            <div className="right-nav-part">
            <div className="dropdown" >
                <a href="#" onClick={changeNavRes}>{navValue}</a>

            </div>
                {/* <Link to="/">Logout</Link> */}

            </div>
        </div>
    )
}



