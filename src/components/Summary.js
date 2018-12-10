import React from 'react'
import print from '../img/PNG/print.png';
const Summary = ({ moveForward }) => {

    return (
        <div className="">
            <div className="summaryPrint">
                <img src={print} id="cursor-hover" alt="Print" onClick={() => { window.print() }} />
                <button className="buttonForward" onClick={moveForward}>Jatka</button>
            </div>
        </div>
    )
}

export default Summary
