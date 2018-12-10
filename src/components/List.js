import React from 'react';
import Topic from './Topic';

const List = ({ topics, changeOption, sendAnswers, move, getChecked }) => {

  return (
    <div>
      <div className="surveyContainer">
        <div className="instructionHeader">	<h5>Valitse seuraavissa YKSI PARHAITEN osaamistasi kuvaava taso: 1 = perustaso, 3 = hyvä taso tai 5 = erinomainen taso.</h5></div>
        <form onSubmit={sendAnswers}>
          {topics.map((topic, i) =>
            <Topic key={i} topic={topic} changeOption={changeOption} get={getChecked}></Topic>)}
          <button className="buttonBackward" onClick={(e) => move(e, -1)}>Takaisin</button>
          <button className="buttonForward" type="submit">Lähetä vastaukset</button>
          {/* <button className="buttonstyleBackward" onClick={moveBackward}>Takaisin</button> */}
        </form>

      </div>
    </div>
  )
}

export default List
