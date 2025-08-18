import axios from "axios";
import { baseUrl } from "./constants";

const api = `${baseUrl}/Auth`;


// login
export async function login(userData, signal) {
  const url = `${api}/login`;

  try {
    const response = await axios.post(url, userData, { signal });

    localStorage.setItem('authToken', 'dummy-token');
    localStorage.setItem('adminToken', 'dummy-token');

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      const err = new Error("غير مصرح, برجاء تسجيل الدخول");
      err.status = 401;
      throw err;
    }
    throw new Error('فشل في تسجيل الدخول, برجاء المحاولة مرة أخرى لاحقا');
  }
}

// create account
export async function register(userData, signal, token) {
  const url = `${api}/register`;

  try {
    const response = await axios.post(url, userData, { signal, headers: { Authorization: `Bearer ${token}` } });

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      const err = new Error("غير مصرح, برجاء تسجيل الدخول");
      err.status = 401;
      throw err;
    }
    throw new Error('فشل في إنشاء الحساب, برجاء المحاولة مرة أخرى او لاحقا');
  }
}