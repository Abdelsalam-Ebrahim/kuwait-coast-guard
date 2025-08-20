import axios from "axios";
import { baseUrl } from "./constants";

const api = `${baseUrl}/ReceivingPlace`;


// get all receiving places
export async function getAllReceivingPlaces(signal, token) {
  const url = `${api}/get-all-receiving-places`;

  try {
    const response = await axios.get(url, { signal, headers: { Authorization: `Bearer ${token}` } });

    return response.data;
  } catch (error) {
    if(error.status === 401) {
      throw new Error({ message: 'غير مصرح, برجاء تسجيل الدخول', status: 401 });
    }
    throw new Error( 'فشل في جلب الموظفين, برجاء المحاولة مرة أخرى او لاحقا');
  }
}