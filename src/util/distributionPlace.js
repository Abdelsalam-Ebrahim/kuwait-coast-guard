import axios from "axios";
import { baseUrl } from "./constants";

const api = `${baseUrl}/DistributionPlace`;


// get all distributed places
export async function getAllDistributedPlaces(signal, token) {
  const url = `${api}/get-all-distributed-place`;

  try {
    const response = await axios.get(url, { signal, headers: { Authorization: `Bearer ${token}` } });

    return response.data;
  } catch (error) {
    if(error.status === 401) {
      throw new Error({ message: 'غير مصرح, برجاء تسجيل الدخول', status: 401 });
    }
    console.log("error", error.response?.data?.message);
    throw new Error( 'فشل في جلب المناطق الموزعة, برجاء المحاولة مرة أخرى او لاحقا');
  }
}