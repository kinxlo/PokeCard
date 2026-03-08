import type { AxiosRequestConfig } from "axios";

import http from "@/lib/http/httpConfig";

export async function get<T>(
  url: string,
  requestConfig?: AxiosRequestConfig,
): Promise<T> {
  const response = await http.get<T>( url, requestConfig );
  return response.data;
}

export async function post<T>(
  url: string,
  data?: unknown,
  requestConfig?: AxiosRequestConfig,
): Promise<T> {
  const response = await http.post<T>( url, data, requestConfig );
  return response.data;
}
