/**
 * Компонент является точкой входа в приложение
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import App from './App.js';
import login from './reducers/login';
import authorizedUsers from './reducers/authorizedUsers';

/**
 * combineReducers- функция которая обьеденяет в себе множество редьюсеров
 *
 * @param {object}  обьект у которого lvalue - функция-редьюсер
 * (ес6 возможность обьявить key и value  с одним именем не обьявляя key )
 * @returns {function} для передачи в createStore
 */
export const combinedReducer = combineReducers({
  login,
  authorizedUsers,
});

/**
 * createStore - Функция создающая хранилище state (технология "redux")
 *
 * @param {function} - функция возвращенная из  combineReducers метода (технология "redux")
 * @param {string} - расширения для работы с расширением 'REDUX_DEVTOOLS" (технология "redux")
 * @returns {store} - обьект, который помещается в Provider компонент как props с именем store (технология "react-redux")
 */
const store = createStore(combinedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/**
 * место, где происходит "рендер" компонента app обернутого в компонент Provider
 *  (предоставляет доступ к state) (технология react-redux)
 *
 * @param {React-component}
 * @param {node} - узел дом элемента, используется метод стандартной библиотеки js (java-script)
 * @returns {node} - второй аргумент функции заменяется на результат выполнения первого, возвращается разметка
 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
