import React from 'react'
import GeneralTopicItem from './GeneralTopicItem'

const GeneralTopic = ({ generalSubTopics, changeOption, answers, get }) => {

        return (
            <div className="topicContainer">
                <h2>{generalSubTopics.text}</h2>
                {Object.values(generalSubTopics).filter(a => typeof a === 'object').map((option, i) =>
                    <GeneralTopicItem key={i} option={option} parent={generalSubTopics.text} changeOption={changeOption} answers={answers} get={get}></GeneralTopicItem>)}
            </div>
        )
}

export default GeneralTopic
