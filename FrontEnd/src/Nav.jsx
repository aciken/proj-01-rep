import "./Nav.css";
import logo from './assets/plaodylogowhite1.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Nav() {






    return (
        <div className="whole-nav">
            <a href="#" className="left-nav-part">
                <img src={logo} alt="Logo" />
            </a>
            <div className="right-nav-part">
                {/* <a href="#" onClick={handleScrollToTools}>Tools</a> */}
                <a href="#" onClick={handleScrollToQuestions} className='demo-nav'>FAQ</a>
                <a href="#" onClick={handleScrollToPricing} >Pricing</a>
                <Link to="/Login">Login</Link>
                <Link to="/signup" className="sign-up">Signup</Link>
            </div>
        </div>
    )
}