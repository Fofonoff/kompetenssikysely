import React from 'react'

const AdminTopicItem = ({ topic, iteration,changeValue, deleteQuestion, saveChanges, editQuestions }) => {

 const optionValues = Object.values(topic).map(option => option).filter(o => typeof o === 'object')
 //data-bame splitillä saada topic-text ja i
//onClick={(e)=> click(e)} poistettu inputista
 return (
   <tr >
     <td>{topic.text}</td>

     {optionValues.map((option, i) => <td key={i}><div className="adminTable" name={'edit'+i} data-iteration={iteration} data-bame={topic.text+ ":" + i} data-options={option.text + ":" + i} defaultValue={option.text}
     onClick={(e) => changeValue(e)}>{option.text}</div></td>)}
    <td><button data-topic={topic.text} data-iteration={iteration} data-options={optionValues.map((option, i) => option.text + ":" + i + ":")} onClick={(e) => editQuestions(e)}>Edit</button></td>
    <td><button id={iteration} data-iteration={topic.text + ":" + iteration} onClick={(e) =>
    window.confirm('Are you sure you want to delete this item?') &&
    deleteQuestion(e)}>Delete</button></td>
   </tr>
 )
}
// onClick={(e) => deleteQuestion(e)}

export default AdminTopicItem;
