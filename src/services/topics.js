import axios from 'axios'
import database from '../fire'

const getAll = async () => {
    const url = 'https://'+database.options.projectId+'.firebaseio.com/topics/.json'
  const response = await axios.get(url)
  let allTopics = []
  Object.values(response.data).forEach(elem => {
    allTopics.push(elem)
  })
  return allTopics
}

const newTopic = async (object, id) => {
  const url = 'https://'+database.options.projectId+'.firebaseio.com/topics/'+id+'.json'
  const response = await axios.put(url, object) //ei POST missään nimessä!!
  return response.data
}

const removeTopic = async (object) => {
  const url = 'https://'+database.options.projectId+'.firebaseio.com/topics/.json'
  const response = await axios.put(url, object)
  return response.data
}

export default { getAll, newTopic, removeTopic }
