import { ADD, REMOVE } from '../constants/actions';

/**
 * Редьюсер для обработки actions (второй аргумент данной функции)
 *
 * @param {array} initialState
 * @param {object} обьект с полями type, payload, type обязательно
 * @returns {state} новое значение состояния
 */
export default function authorizedUsers(initialState = [], { type, payload }) {
  switch (type) {
    case ADD: {
      return [...initialState, {
        login: payload.login,
        password: payload.password,
      }];
    }
    case REMOVE: {
      return [];
    }
    default:
      return initialState;
  }
}
