import axios from "axios";
import { baseUrl } from "./constants";

const api = `${baseUrl}/Employee`;


// get all employees
export async function getAllEmployees(signal, token) {
  const url = `${api}/get-all-employees`;

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

// get all employees by squad
export async function getAllEmployeesBySquad(signal, squadId, token) {
  const url = `${api}/get-all-employees-by-squad/${squadId}`;

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

// add employee
export async function addEmployee(employeeData, token) {
  const url = `${api}/add-employee`;

  try {
    const response = await axios.post(url, employeeData, { headers: { Authorization: `Bearer ${token}` } });

    return response.data;
  } catch (error) {
    if(error.status === 401) {
      throw new Error({ message: 'غير مصرح, برجاء تسجيل الدخول', status: 401 });
    }
    throw new Error( 'فشل في إضافة الموظف, برجاء المحاولة مرة أخرى او لاحقا');
  }
}

// edit employee
export async function editEmployee(employeeData, token) {
  const url = `${api}/update-employee`;

  try {
    const response = await axios.put(url, employeeData, { headers: { Authorization: `Bearer ${token}` } });

    return response.data;
  } catch (error) {
    if(error.status === 401) {
      throw new Error({ message: 'غير مصرح, برجاء تسجيل الدخول', status: 401 });
    }
    throw new Error( 'فشل في تحديث بيانات الموظف, برجاء المحاولة مرة أخرى او لاحقا');
  }
}

// delete employee
export async function deleteEmployee(employeeId, token) {
  const url = `${api}/delete-employee/${employeeId}`;

  try {
    const response = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });

    return response.data;
  } catch (error) {
    if(error.status === 401) {
      throw new Error({ message: 'غير مصرح, برجاء تسجيل الدخول', status: 401 });
    }
    throw new Error( 'فشل في حذف الموظف, برجاء المحاولة مرة أخرى او لاحقا');
  }
}