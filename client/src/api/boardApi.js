import axiosClient from './axiosClient'

const boardApi = {
  getAll: () => axiosClient.get('boards'),
  create: () => axiosClient.post('boards'),
  updatePosition: (params)=> axiosClient.put('boards',params),
  getOne: (id) => axiosClient.get(`boards/${id}`),
  update: (id, params)=> axiosClient.put(`boards/${id}`,params)
}

export default boardApi