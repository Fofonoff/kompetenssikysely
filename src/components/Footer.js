import React from 'react';
import TT_facebook from '../img/PNG/facebook-24.png'
import TT_youtube from '../img/PNG/youtube-24.png'
import TT_insta from '../img/PNG/instagram-24.png'
import TT_twitter from '../img/PNG/twitter-24.png'
import TT_linkedin from '../img/PNG/linkedin-24.png'
import hh_logo from '../img/PNG/hh_tunnus.png'
import stn_logo from '../img/PNG/STNlogo.png'

const Footer = () => {

    return (
        <footer>
            <div className="phantom"></div>
            <div className="footer">
                <div className="footerImgDiv">
                    <div className="stnlogo">
                        <a href="http://www.aka.fi/stn" target="_blank" rel="noopener noreferrer">
                            <img src={stn_logo} className="footer-img-stn" alt="STN-Logo" /></a>
                    </div>
                    <div className="social-links">
                        <a href="https://www.facebook.com/HaagaHeliaAMK/?userLang=en" target="_blank" rel="noopener noreferrer">
                            <img src={TT_facebook} alt="Facebook" /> </a>

                        <a href="https://www.youtube.com/user/HAAGAHELIAviestinta?userLang=en" target="_blank" rel="noopener noreferrer">
                            <img src={TT_youtube} alt="Youtube" /></a>

                        <a href="https://twitter.com/haagaheliaamk?userLang=en" target="_blank" rel="noopener noreferrer">
                            <img src={TT_twitter} alt="Twitter" /></a>

                        <a href="https://www.linkedin.com/school/haaga-helia-university-of-applied-sciences/" target="_blank" rel="noopener noreferrer">
                            <img src={TT_linkedin} alt="Linkedin" /></a>

                        <a href="https://www.instagram.com/haagahelia/?userLang=en" target="_blank" rel="noopener noreferrer">
                            <img src={TT_insta} alt="Instagram" /></a>
                    </div>
                    <div className="hhlogo">
                        <a href="http://www.haaga-helia.fi/en/frontpage" target="_blank" rel="noopener noreferrer">
                            <img src={hh_logo} className="footer-img-hh" alt="HH-Logo" /></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
