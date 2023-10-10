import axios from "axios"

export const RegisterNewUser = async (userData) => {
  const res = await axios.post("http://localhost:3002/api/auth/register",userData)
  return res.data
}
