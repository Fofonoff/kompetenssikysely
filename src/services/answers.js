import axios from 'axios'
import database from '../fire'

const getAll = async () => {
    const url = 'https://'+database.options.projectId+'.firebaseio.com/answers/.json'
  const response = await axios.get(url)
  let allTopics = []
  Object.values(response.data).forEach(elem => {
    allTopics.push(elem)
  })
  return allTopics
}

const sendAnswers = async (object) => {
  const url = 'https://'+database.options.projectId+'.firebaseio.com/answers/.json'
  const response = axios.post(url, object)
  return response.data
}

export default { getAll, sendAnswers }
