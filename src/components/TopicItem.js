import React from 'react'

const TopicItem = ({ topic, changeOption, parent, get }) => {

  // FIXME: filteröinti??
  const optionValues = Object.values(topic).map(option => option).filter(o => typeof o === 'object')
  //validointi hoidettu tuolla "required", eli nyt näyttää puutuvat punaisella ja vie käyttäjän ensimmäisen uupuvan kohdalle...
  console.log(optionValues);
  return (
    <div className="topicItemContainer">
      <p className="topicItemHeader">{topic.text}</p>
      <fieldset>
        {optionValues.map((option, i) =>
          <label className="topicItemOptions" key={i}><input type="radio" className="profOptionsRadio" name={topic.text} data-parent={parent}
            onChange={changeOption} data-aval={option.value} checked={get(topic.text, option.value)} required /><span className="checkmark"></span>{option.text}</label>)}
      </fieldset>
    </div>
  )
}

export default TopicItem
