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

// edit employees
export async function editEmployees(employeesData, token) {
  const url = `${api}/bulk-update`;

  try {
    const response = await axios.put(url, employeesData, { headers: { Authorization: `Bearer ${token}` } });

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

// get all present employees by squad
export async function getAllPresentEmployeesBySquad(signal, squadId, token) {
  const url = `${api}/get-all-present-employees-by-squad/${squadId}`;

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

// get all absent employees by squad
export async function getAllAbsentEmployeesBySquad(signal, squadId, token) {
  const url = `${api}/get-all-absent-employees-by-squad/${squadId}`;

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

// get distribution employees by squad
export async function getDistributionEmployeesBySquad(signal, squadId, token) {
  const url = `${api}/distributed-by-squad/${squadId}`;

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