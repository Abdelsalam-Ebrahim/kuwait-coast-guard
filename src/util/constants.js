import { QueryClient } from "@tanstack/react-query";

export const baseUrl = 'http://khafrelswahel.runasp.net/api';
export const queryClient = new QueryClient();

// throw new Error(error.response?.data?.message || 'فشل في تسجيل الدخول, برجاء المحاولة مرة أخرى لاحقا');