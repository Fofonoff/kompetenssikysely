import axios from 'axios'
import database from '../fire'

const getAll = async () => {
    const url = 'https://'+database.options.projectId+'.firebaseio.com/feedback/.json'
  const response = await axios.get(url)
  let allFeedback = []
  Object.values(response.data).forEach(elem => {
    allFeedback.push(elem)
  })
  return allFeedback
}

export default { getAll }
