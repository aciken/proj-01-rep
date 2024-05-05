import './newHero.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const showCaseIMG = '/showcase5.PNG';


export function NewHero() {



    


    return (
        <div className="hero">
            <div className="hero-inside">
                <div className="hero-text">
                    <h1>Increse the quality of your youtube video <span>in minutes</span></h1>
                    <p>An AI tool that will create everything you need as a YouTuber: AI-generated thumbnails, titles and descriptions.</p>
                    <div className="get-started-part">
                        <Link to="/signup"><button className="try-for-free">Get Started</button></Link>
                        <p className='free-cred'>and get free credits</p>
                    </div>
                </div>


                <img className='showcase-img' src={showCaseIMG} alt="" />
            </div>
        </div>
    )
}