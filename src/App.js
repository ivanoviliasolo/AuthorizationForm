/**
 * Является ветвителем в данном модуле, отображает 1 из 2х компонентов по условию,
 * а так же делает запрос в localStorage
 * что бы зайти->
 * файл listOfDefaultLogins.js, там можно добавить или удалить что надо.
 */

import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './style/App.css';
import { connect } from 'react-redux';
import LoginOrRegistration from './components/LoginOrRegistration';
import WorkedDirectory from './components/workedDirectory';

export function App({
  defLoginsState,
  dispatchSelectedLogin,
  registratedUsers,
}) {
  const [error, setError] = useState();
  const [waitRequest, setWaitRequest] = useState(false);

  /**
 * Функция, вызывающаяся только при первоначальном рендере,
 * Проверяет, имеется ли в localStorage поля с нужными ключами,
 * если имеются, то отправляет диспатч, с целью добавить эту запись(из localStorage)
 * в массив авторизированных пользователей
 *
 * @returns {dispatch || void} отправка диспатча или ничего.
 */
  useEffect(() => {
    if (localStorage.getItem('lastUserLog') !== null) {
      dispatchSelectedLogin(
        {
          type: 'ADD',
          payload: {
            login: localStorage.getItem('lastUserLog'),
            password: localStorage.getItem('lastUserPass'),
          },
        },
      );
    }
  }, []);

  /**
   * Функция которая убирает сообщение об ошибке(если таковое имеется)
   * при разлогировании пользователя
   *
   * @returns {state} - изменяет состояние error
   */
  useEffect(() => {
    setError();
  }, [registratedUsers]);

  /**
 * функция обрабатывает данные пришедшие из reduser(defLoginsState)
 * и из компонента констрактора (data) для выяснения, есть ли такой логин и пароль
 *
 * @param {array} data - данный из компонента-конструктора
 * @returns {dispatch || error(state)} возвращает диспатч если такой пароли и логин имеется
 * или выводит ошибку путем изменения состояния(фэйк задержка 1 сек).
 */
  function handleGetDataFromForm(data) {
    for (const state of defLoginsState) {
      let logginLegal = false;
      for (const one of data) {
        if (one.value === state.login) {
          logginLegal = true;
          continue;
        }
        if (one.value === state.password && logginLegal) {
          setWaitRequest(true);
          setTimeout(() => {
            localStorage.clear();
            localStorage.setItem('lastUserLog', state.login);
            localStorage.setItem('lastUserPass', state.password);
            dispatchSelectedLogin(
              {
                type: 'ADD',
                payload: {
                  login: state.login,
                  password: state.password,
                },
              },
            );
            setWaitRequest(false);
          }, 1000);

          return;
        }
      }
    }
    setWaitRequest(true);
    setTimeout(() => {
      setWaitRequest(false);
      setError('Имя пользователя или пароль, не правильный...');
    }, 1000);
  }

  return (
    <div>
      {registratedUsers.length > 0
        ? <WorkedDirectory />
        : (
          <LoginOrRegistration
            header="Окно авторизации"
            closable={false}
            listOfFields={
          [
            { title: 'login', validation: 'login' },
            { title: 'password', validation: 'password' },
          ]
        }
            onSave={(e) => handleGetDataFromForm(e)}
            error={error}
            waitRequest={waitRequest}
          />
        )}

    </div>
  );
}

/**
 * connect - функция обертка которая возвращает компонент переданный в возвращенную функцию
 * с пропсами, технология "react-redux"
 * @returns func
 */
export default connect(
  (state) => ({
    defLoginsState: state.login,
    registratedUsers: state.registratedUsers,

  }),
  (dispatch) => ({
    dispatchSelectedLogin: (arg) => {
      dispatch(arg);
    },
  }),
)(

  /**
   * hot -функция обертка для пересборки проекта webpuck при сохранении файла
   * который передан в возвращаемое значение - функцию (вторые скобки)
   * @returns func
   */
  hot(module)(App),
);
