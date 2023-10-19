import axios, {AxiosInstance, AxiosRequestConfig, AxiosError} from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { ERROR_MESSAGES } from '../const';

const CustomErrorMessages: Record<number, string> = {
  [StatusCodes.BAD_REQUEST]: ERROR_MESSAGES.BAD_REQUEST,
  [StatusCodes.UNAUTHORIZED]: ERROR_MESSAGES.UNAUTHORIZED,
  [StatusCodes.NOT_FOUND]: ERROR_MESSAGES.NOT_FOUND
};

const shouldDisplayError = (status: number): boolean => !!CustomErrorMessages[status];

const BACKEND_URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers = { ...config.headers, 'x-token': token };
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response.status)) {
        const customMessage = CustomErrorMessages[error.response.status];
        toast.warn(customMessage);
      }

      throw error;
    }
  );

  return api;
};

