/**
 * Компонент эмулирукт "рабочую зону человека авторизированного в системе"
 */
import React from 'react';
import { connect } from 'react-redux';
import unLoginUser from '../../actionCreaters/unLoginUser';

export function WorkedDirectory({
  registratedUsers,
  dispatchAction,
}) {
  return (
    <div
      className="wrapp-main"
    >
      Добрый день -
      {registratedUsers[0] ? registratedUsers[0].login : null}
      <button
        className="unlogin-button"
        onClick={() => {
          localStorage.clear();
          dispatchAction(
            unLoginUser(),
          );
        }}
      >
        Выйти из учетной записи
        {' '}
        {registratedUsers[0] ? registratedUsers[0].login : null}
      </button>
    </div>
  );
}

export default connect(
  (state) => ({
    registratedUsers: state.authorizedUsers,
  }),
  (dispatch) => ({
    dispatchAction: (arg) => dispatch(arg),
  }),
)(WorkedDirectory);
