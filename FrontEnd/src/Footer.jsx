import './footer.css'

export function Footer(props) {
 return(
        <div className="footer">

            <div className='footer-line links'>
                <h1>LINKS</h1>
                <p><a href="#">Pricing</a></p>
                <p><a href="#">Licenses</a></p>
                <p><a href="#">Documentation</a></p>
                <p><a href="#">Support</a></p>
                <p><a href="#">Affiliates-Earn up to $99 per sale</a></p>
            </div>
            <div className='footer-line legal'>
                <h1>LEGAL</h1>
                <p><a href="#">Terms of service</a></p>
                <p><a href="#">Privacy policy</a></p>
            </div>
            <div className="footer-line more">
                <h1>MORE</h1>
                <p><a href="#">Blog</a></p>
                <p><a href="#">Forum</a></p>
                <p><a href="#">Press</a></p>
                <p><a href="#">Jobs</a></p>
            </div>

            <div className='rights'>
            <p onClick={props.loginClick} className='sign-up'>Sign Up</p>
            <p>
                Ship your startup in days, not week <br/>
                Copyright © 2024 - All rights reserved
            </p>

            </div>
        </div>
 )
}