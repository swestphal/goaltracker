import axiosClient from './axiosClient'

const boardApi = {
  getAll: () => axiosClient.get('boards'),
  create: () => axiosClient.post('boards'),
 
}

export default boardApi