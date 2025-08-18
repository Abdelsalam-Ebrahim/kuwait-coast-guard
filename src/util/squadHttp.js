import axios from "axios";
import { baseUrl } from "./constants";

const api = `${baseUrl}/Squad`;

export async function getAllSquads(signal, token) {
  const url = `${api}/get-all-squads`;

  try {
    const response = await axios.get(url, {
      signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      const err = new Error("غير مصرح, برجاء تسجيل الدخول");
      err.status = 401;
      throw err;
    }
    throw new Error("فشل في جلب السرايا, برجاء المحاولة مرة أخرى او لاحقا");
  }
}
