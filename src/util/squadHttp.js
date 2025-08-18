import axios from "axios";
import { baseUrl } from "./constants";

const api = `${baseUrl}/Squad`;


export async function getAllSquads(signal) {
  const url = `${api}/get-all-squads`;

  try {
    const response = await axios.get(url, { signal });

    return response.data;
  } catch(error) {
    throw new Error('فشل في جلب السرايا, برجاء المحاولة مرة أخرى او لاحقا');
  }
}