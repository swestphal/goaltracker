import axiosClient from './axiosClient'

const boardTaskApi = {
  create: (boardId, params) => axiosClient.post(`board/tasks/${boardId}`, params),
  updatePosition: (boardId, params)=> axiosClient.put(`board/tasks/update-position/${boardId}`,params),
  delete: (boardId, taskId) => axiosClient.delete(`board/tasks/${boardId}/${taskId}`),
  update: (boardId, taskId, params) => axiosClient.put(`board/tasks/${boardId}/${taskId}`, params)
}

export default boardTaskApi