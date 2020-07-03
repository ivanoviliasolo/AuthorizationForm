import { ADD_NEW_USER } from '../constants/actions';
import { DEFAULT_LOGINS } from '../constants/listOfDefaultLogins';

/**
 * Начальное состояние нашего редьюсера в котором отображена структура данных уже имеющихся пользователей
 *
 * @param {string} логин пользователя
 * @param {string} пароль пользователя
 */
const defLoginsState = DEFAULT_LOGINS;

/**
   * Редьюсер для обработки actions (второй аргумент данной функции)
   *
   * @param {array} initialState
   * @param {object} обьект с полями type, payload, type обязательное
   * @returns {state} новое значение состояния.
   */
export default function login(initialState = defLoginsState, { type, payload }) {
  switch (type) {
    case ADD_NEW_USER: {
      return [...initialState, { login: payload.login, password: payload.password }];
    }

    default:
      return initialState;
  }
}
