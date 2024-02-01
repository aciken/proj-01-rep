import './Hero.css'
import statsImg from './assets/3163925[1].png'
import { Link } from 'react-router-dom'

export function Hero() {



    return(
        <div className="hero">
            <div className="hero-text">
                <h1>Let the AI do the <span className='boring-part'>boring part</span></h1>
                <p>Leverage our AI based tools so you can delever best possible videos, get more views and subscribers and understand your viewers</p>
                <button  className='get-started-btn'><Link to="/signup">Get Started</Link></button>
            </div>   

            <div className='hero-img'>
                <img src={statsImg} alt="" />
            </div>
        </div>
    )
}   