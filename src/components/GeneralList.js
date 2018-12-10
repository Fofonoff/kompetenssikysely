import React from 'react'
import GeneralTopic from './GeneralTopic'

const GeneralList = ({ topics, move, changeOption, answers, getChecked, bgInf }) => {

	return (bgInf === 'Vastaajan taustatiedot' ?
		<div className="App">
			<div className="surveyContainer">
				<form onSubmit={(e) => move(e, 1)}>
					{topics.map((t, i) =>
						<GeneralTopic key={i} generalSubTopics={t} changeOption={changeOption} answers={answers} get={getChecked}></GeneralTopic>)}
					<button className="buttonBackward" onClick={(e) => move(e, -1)}> Takaisin </button>
					<button className="buttonForward" type="submit">Jatka</button>
				</form>

			</div></div> :
		<div className="App">
			<div className="surveyContainer">
				<div className="instructionHeader">	<h5>Valitse seuraavissa YKSI PARHAITEN osaamistasi kuvaava taso: 1 = perustaso, 3 = hyvä taso tai 5 = erinomainen taso.</h5></div>
				<form onSubmit={(e) => move(e, 1)}>
					{topics.map((t, i) =>
						<GeneralTopic key={i} generalSubTopics={t} changeOption={changeOption} answers={answers} get={getChecked}></GeneralTopic>)}
					<button className="buttonBackward" onClick={(e) => move(e, -1)}> Takaisin </button>
					<button className="buttonForward" type="submit">Jatka</button>
				</form>

			</div></div>
	)
}

export default GeneralList
