import axiosClient from './axiosClient'

const boardSection = {
  create: (boardId) => axiosClient.post(`board/sections/${boardId}`),
  update: (boardId, sectionId, params)=> axiosClient.put(`board/sections/${boardId}/${sectionId}`,params),
  delete: (boardId, sectionId) => axiosClient.delete(`board/sections/${boardId}/${sectionId}`)
}

export default boardSection