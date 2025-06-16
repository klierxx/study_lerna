import axiosRequest from '@/service';
import type { Account } from '@/types/login';

export function accountLoginRequest(account: Account) {
  return axiosRequest.post({
    url: '/login',
    data: account
  });
}
