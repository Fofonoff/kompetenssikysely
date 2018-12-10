import React from 'react'

const TopicItem = ({ topic, changeOption, parent, get }) => {

  // FIXME: filteröinti??
  const optionValues = Object.values(topic).map(option => option).filter(o => typeof o === 'object')
  const questionName = topic.text + "*" + parent
  //validointi hoidettu tuolla "required", eli nyt näyttää puutuvat punaisella ja vie käyttäjän ensimmäisen uupuvan kohdalle...
  return (
    <div className="topicItemContainer">
      <p className="topicItemHeader">{topic.text}</p>
      <fieldset>
        {optionValues.map((option, i) =>
          <label className="topicItemOptions" key={i}><input type="radio" className="profOptionsRadio" name={questionName} data-parent={parent}
            onChange={changeOption} data-aval={option.value} data-atext={option.text} data-acat={"ammatti"} checked={get(questionName, option.value, parent)} required /><span className="checkmark"></span>{option.value} {option.text}</label>)}
      </fieldset>
    </div>
  )
}

export default TopicItem
