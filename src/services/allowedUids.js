import axios from 'axios'
import database from '../fire'

const getAll = async () => {
    const url = 'https://'+database.options.projectId+'.firebaseio.com/allowedUids/.json'
  const response = await axios.get(url)
  let allTopics = response.data;
  return allTopics
}

export default { getAll }
