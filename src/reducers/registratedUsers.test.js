import registratedUsers from './registratedUsers';
import { ADD, REMOVE } from '../constants/actions';

test('Тестируем редьюсер на валидное добавление обьекта в массив', () => {
  expect(registratedUsers([], {
    type: ADD,
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

test('Тестируем редьюсер на валидное очищение массива', () => {
  expect(registratedUsers([{ password: '100', login: 'ilia66' }, { password: '500', login: 'Other' }], {
    type: REMOVE,
  })).toEqual([]);
});
