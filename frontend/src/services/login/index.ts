import axios from "axios"

export const LoginUser = async (userData) => {
  const res = await axios.post("http://localhost:3002/api/auth/login",userData)
  return res.data
}
