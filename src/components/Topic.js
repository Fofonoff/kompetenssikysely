import React from 'react'
import TopicItem from './TopicItem'

const Topic = ({ topic, changeOption, get }) => {

  return (
    <div className="topicContainer">
      <h2>{topic.topic}</h2>
      {Object.values(topic.subs).map((subtopic, i) =>
        <TopicItem key={i} changeOption={changeOption} get={get} topic={subtopic} parent={topic.topic}></TopicItem>)}
    </div>
  )
}

export default Topic
