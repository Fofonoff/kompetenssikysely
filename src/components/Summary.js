import React from 'react'
import print from '../img/PNG/print.png';
const Summary = ({moveForward}) => {

    return (
        <div className="App">
            <img src={print} id="cursor-hover" alt="Print" onClick={() => { window.print() }} />
            <button className="buttonForward" onClick={moveForward}>Jatka</button>
        </div>
    )
}

export default Summary
