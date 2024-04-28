import "./nav-land.css";
import logo from './assets/tubeAI.logopsd.png';
import { Link } from 'react-router-dom';

export function Nav2() {


    const handleScrollToPricing = () => {
        const pricingSection = document.querySelector('.token');
        pricingSection.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScrollToTools = () => {
        const toolsSection = document.querySelector('.tools');
        toolsSection.scrollIntoView({ behavior: 'smooth' });

    }

    const handleScrollToQuestions = () => {
        const questionsSection = document.querySelector('.questions');
        questionsSection.scrollIntoView({ behavior: 'smooth' });

    }

    return (
<div className='nav-land'>
            <div className="nav-land-inside">
                <div className="nav-logo">
                    <img src={logo} alt="plaody logo" className="nav-logo" />
                </div>
                <div className="nav-links">
                {/* <a href="#" onClick={handleScrollToQuestions} className='demo-nav'>FAQ</a>
                    <a href="#" onClick={handleScrollToPricing}>Pricing</a> */}
                    <Link to="/Login">Login</Link>
                    <Link to="/signup" className="sign-up-btn">Signup</Link>
                </div>
            </div>
</div>
    )
}