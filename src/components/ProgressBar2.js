import React from 'react';
import prog1 from '../img/prog1.svg'
import prog2 from '../img/prog2.svg'
import prog3 from '../img/prog3.svg'
import prog4 from '../img/prog4.svg'
import prog5 from '../img/prog5.svg'
import prog6 from '../img/prog6.svg'
import prog7 from '../img/prog7.svg'
import prog8 from '../img/prog8.svg'
//vaiha img/bar --> img/prog

const ProgressBar2 = ({src}) => {
let src2 = src + 1;
let imglist = [prog1, prog2, prog3, prog4, prog5, prog6, prog7, prog8];
let progress;
imglist.forEach(element => {
  if ("prog" + src2 === element){
    progress = element
    return progress;
  }
});

          return (
            <div className="bar">
            { src === 0
              ?<img src={prog1} alt=""></img>
              :null
            }
            { src === 1
              ? <img src={prog2} alt=""></img>
              :null
            }
            { src ===2
              ? <img src={prog3} alt=""></img>
              :null
            }
            { src === 3
              ? <img src={prog4} alt=""></img>
              :null
            }
            { src === 4
              ? <img src={prog5} alt=""></img>
              :null
            }
            { src === 5
              ? <img src={prog6} alt=""></img>
              :null
            }
            { src === 6
              ? <img src={prog7} alt=""></img>
              :null
            }
            { src === 7
              ? <img src={prog7} alt=""></img>
              :null
            }
            { src === 8
              ? <img src={prog8} alt=""></img>
              :null
            }
            </div>
          );
        }
export default ProgressBar2;
