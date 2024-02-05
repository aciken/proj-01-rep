import './nav2.css';
import logo from './assets/plaodylogowhite1.png';
import { Link } from 'react-router-dom';


export function OtherNav() {
return (
<div className='whole-nav'>

                <Link to="/" className="nav-logo">
                <img src={logo} alt="plaody logo" className="nav-logo" />
                </Link>

            {/* <div className="nav-links">
            <a href="#" onClick={handleScrollToQuestions} className='demo-nav'>FAQ</a>
                <a href="#" onClick={handleScrollToPricing}>Pricing</a>
                <Link to="/Login">Login</Link>
                <Link to="/signup" className="sign-up-btn">Signup</Link>
            </div> */}
</div>
)

}