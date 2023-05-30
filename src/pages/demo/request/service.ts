import { get, post } from '@/services/http';

const getsuccess = async (params: any) => get('/server/getsuccess', params);
const geterror = async (params: any) => get('/server/geterror', params);
const get500 = async (params: any) => get('/server/get500', params);
const get401 = async (params: any) => get('/server/get401', params);

const postsuccess = async (params: any) => post('/server/postsuccess', params);
const posterror = async (params: any) => post('/server/posterror', params);
const post500 = async (params: any) => post('/server/post500', params);
const post401 = async (params: any) => post('/server/post401', params);

export {
  getsuccess,
  geterror,
  get500,
  get401,
  postsuccess,
  posterror,
  post500,
  post401,
};
