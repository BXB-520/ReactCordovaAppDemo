import { get, post } from '@/services/http';

export const client_search_cp = (param: any) =>
  get('/soso/fcgi-bin/client_search_cp', null, param);
