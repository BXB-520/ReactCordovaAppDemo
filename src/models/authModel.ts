import { login, loginOut, refreshToken } from '@/pages/login/service';
import { delLocalStorage, setLocalStorage } from '@/utils/common';
import { Reducer, Effect, history } from 'umi';

export interface LoginStateType {
  userDetail: any;
}

export interface LoginModelType {
  namespace: string;
  state: LoginStateType;
  effects: {
    login: Effect;
    refresh: Effect;
    logout: Effect;
  };
  reducers: {
    save: Reducer<LoginStateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',
  state: {
    userDetail: {},
  },

  effects: {
    *login({ payload }, { call, put }): any {
      const response = yield call(login, payload);
      const { success, data } = response;
      if (success) {
        yield put({ type: 'save', payload: { userDetail: data } });
        delLocalStorage('APP_TICKET');
        setLocalStorage('APP_TICKET', data?.token);
        return response;
      }
      return response;
    },
    *refresh(_, { call, put }): any {
      const response = yield call(refreshToken);
      const { success, data } = response;
      if (success) {
        yield put({ type: 'save', payload: { userDetail: data } });
        delLocalStorage('APP_TICKET');
        setLocalStorage('APP_TICKET', data?.token);
        return response;
      }
      return response;
    },
    *logout(_, { call, put }): any {
      const response = yield call(loginOut);
      const { success } = response;
      if (success) {
        yield put({ type: 'save', payload: { userDetail: null } });
        delLocalStorage('APP_TICKET');
        history.replace('/login');
        return response;
      }
      return response;
    },
  },

  reducers: {
    save(state, { payload: { userDetail } }) {
      return {
        ...state,
        userDetail,
      };
    },
  },
};

export default Model;
