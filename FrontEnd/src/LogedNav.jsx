import './nav2.css';
import logo from './assets/plaodylogowhite1.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export function LogedNav({navRes, onChangeNavRes}){


    const removeLocalStorage = () => {
        localStorage.removeItem('id');
    }

    const [navValue, setNavValue] = useState('Profile');

    const changeNavRes = (e) => {
        e.preventDefault();
        if(navValue === 'Profile'){
            onChangeNavRes('profile-page');
            setNavValue('Home');
        }else{
            onChangeNavRes('main-page');
            setNavValue('Profile');
        }
      };

    return (
        <div>
            <div className="whole-nav">
                <a href="#" className="left-nav-part">
                    <img src={logo} onClick={(e) => e.preventDefault()} alt="Logo" className="nav-logo"/>
                </a>
                <div className="right-nav-part">
                <Link onClick={removeLocalStorage} className="logOut-btn" to="/">Log Out</Link>
                {/* <div className="profile-btn" >
                    <a href="#" onClick={changeNavRes}>{navValue}</a>
                </div> */}
                    {/* <Link to="/">Logout</Link> */}
                </div>
            </div>
        </div>
    )
}



