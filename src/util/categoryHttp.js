import axios from "axios";
import { baseUrl } from "./constants";

const api = `${baseUrl}/Category`;


// get all category
export async function getAllCategory(signal) {
  const url = `${api}/get-all-categories`;

  try {
    const response = await axios.get(url, { signal });

    return response.data;
  } catch (error) {
    throw new Error('فشل في جلب الفئات, برجاء المحاولة مرة أخرى او لاحقا');
  }
}