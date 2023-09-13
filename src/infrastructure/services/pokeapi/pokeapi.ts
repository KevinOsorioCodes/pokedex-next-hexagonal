import axios from 'axios'

export const validateStatus = (status: number) => {
  return status < 400
}
export default axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: { 'Content-Type': 'application/json' },
  validateStatus,
})
