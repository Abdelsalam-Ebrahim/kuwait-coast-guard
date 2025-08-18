import axios from "axios";
import { baseUrl } from "./constants";

const api = `${baseUrl}/Category`;


// get all category
export async function getAllCategory(signal, token) {
  const url = `${api}/get-all-categories`;

  try {
    const response = await axios.get(url, { signal, headers: { Authorization: `Bearer ${token}` } });

    return response.data;
  } catch (error) {
    if(error.status === 401) {
      throw new Error({ message: 'غير مصرح, برجاء تسجيل الدخول', status: 401 });
    }
    throw new Error( 'فشل في جلب الفئات, برجاء المحاولة مرة أخرى او لاحقا');
  }
}