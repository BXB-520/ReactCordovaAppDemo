import { get, post } from '@/services/http';

const login = async (params: any) => get('/server/login', params);

const refreshToken = async (params: any) => get('/server/refreshToken', params);

const loginOut = async (params: any) => get('/server/loginout', params);

export { login, refreshToken, loginOut };
