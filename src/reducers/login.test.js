import login from './login';
import { ADD_NEW_USER } from '../constants/actions';

test('Тестируем редьюсер в котором на данный момент 1 case, должен вернуть старое состояние+ 1 обьект', () => {
  expect(login([], {
    type: ADD_NEW_USER,
    payload: {
      login: '322',
      password: '223',
    },
  })).toEqual([
    {
      login: '322',
      password: '223',
    },
  ]);
});
