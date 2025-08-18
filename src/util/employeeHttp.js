import axios from "axios";
import { baseUrl } from "./constants";

const api = `${baseUrl}/Employee`;


// get all employees
export async function getAllEmployees(signal) {
  const url = `${api}/get-all-employees`;

  try {
    const response = await axios.get(url, { signal });

    return response.data;
  } catch (error) {
    throw new Error('فشل في جلب الموظفين, برجاء المحاولة مرة أخرى او لاحقا');
  }
}

// get all employees by squad
export async function getAllEmployeesBySquad(signal, squadId) {
  const url = `${api}/get-all-employees-by-squad/${squadId}`;

  try {
    const response = await axios.get(url, { signal });

    return response.data;
  } catch (error) {
    throw new Error('فشل في جلب الموظفين, برجاء المحاولة مرة أخرى او لاحقا');
  }
}

// add employee
export async function addEmployee(employeeData) {
  const url = `${api}/add-employee`;

  try {
    const response = await axios.post(url, employeeData);

    return response.data;
  } catch (error) {
    throw new Error('فشل في إضافة الموظف, برجاء المحاولة مرة أخرى او لاحقا');
  }
}

// edit employee
export async function editEmployee(employeeData) {
  const url = `${api}/update-employee`;

  try {
    const response = await axios.put(url, employeeData);

    return response.data;
  } catch (error) {
    throw new Error('فشل في تحديث بيانات الموظف, برجاء المحاولة مرة أخرى او لاحقا');
  }
}

// delete employee
export async function deleteEmployee(employeeId) {
  const url = `${api}/delete-employee/${employeeId}`;

  try {
    const response = await axios.delete(url);

    return response.data;
  } catch (error) {
    throw new Error('فشل في حذف الموظف, برجاء المحاولة مرة أخرى او لاحقا');
  }
}