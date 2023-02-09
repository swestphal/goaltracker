import axiosClient from './axiosClient'

const boardApi = {
  getAll: () => axiosClient.get('boards'),
  create: () => axiosClient.post('boards'),
  updatePosition: (params)=> axiosClient.put('boards',params)
}

export default boardApi