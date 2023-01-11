import axios from "axios";

const postService = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '31801380-6d92922f2c4e09c36cd0b60c6',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page:12, 
  }   
})

export const getPost = async (page, searchName) => {
  const { data } = await postService.get('', { params: { page: `${page}`, q: `${searchName}` } })
  return data
}
