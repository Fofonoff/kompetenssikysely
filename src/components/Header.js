import React from 'react';
import taidottyohon from '../img/PNG/taidottyohon.png'
import ProgressBar2 from './ProgressBar2'

const Header = ({ surveyState, states }) => {
    return (
        <header>
            <img  className="header-logo" src={taidottyohon} alt={taidottyohon} id="logo" /><br></br>
            <div className="barContainer">
            <div className="bar">
                <ProgressBar2 src={surveyState} states={states} />
            </div>
            </div>
        </header>
    )
}

export default Header;
