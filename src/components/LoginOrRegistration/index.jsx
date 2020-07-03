/**
 * Компонент авторизации или регистрации (дорабоатть) с формами и проверками
 * который возвращает результат через подьем состояния
 * изначально исключена возможность введения кириллицы,
 *  если нужно можно добавить доп режимы использования компонентов,
 *  валидации и тд.
 */
import React, { useState, useEffect } from 'react';

/**
 * Функция конструктор, которая на основании пропсов строит компонент и возвращает его
 *
 * @param {string} header - текст, который будет выводиться в header компонента
 * @param {bool} closable - отвечает за появление крестика в правом верхнем углу компонента
 * @param {function} onClose - функция, выполняющаяся при нажатии на окна закрытия компонента
 * @param {array} listOfFields - список полей, которые хотят что бы авторизирующийся ввел {title, validation}
 * список типов палидации - password, login
 * @param {function} onSave - функция которая получит результат работы компонента (массив обьектов, там поля и т.д.)
 * @param {string} error - пользовательская ошибка левая часть низа окна компонента
 * @param {bool} waitRequest - используется для оповещения пользователя о ожидании ответа сервера
 */
function LoginOrRegistration({
  header = 'Окно авторизации',
  closable = false,
  onClose = () => {},
  listOfFields = [],
  onSave = () => {},
  error = '',
  waitRequest = false,
}) {
  /**
     * Регулярное вражение, которое означает проверку валидации логина
     *
     * я предпологаю что логин от пароля отличается только тем, что в логине не может быть пробельных символов
     * а так , как это или эмаил или строка, то там может быть что то типо "слесарь(5разряд)"...
     * а в пароле они могут присутствовать, сам добавил к валидации пароля наличие
     * к обязательному 1 Заглавного или 1 числа в строке как валидацию.
     *
     */
  const regexpEn = /[а-я]/i;
  const regExpLogin = /\s/i;
  const regExpPassword = /[A-Z\d]/;
  const [listOfData, setListOfData] = useState([]);
  const [hasError, setHasError] = useState({ id: -1 });

  useEffect(() => {
    /**
       * ниже осуществляется первоначальная проверка данных на валидность общему виду компонента
       */
    if (Array.isArray(listOfFields)) {
      setListOfData(listOfFields.map((i, index) => ({
        id: index + 1, nameOfField: i.title, value: '', validation: i.validation || 'none',
      })));
    } else {
      throw new Error('Пропс listOfFields должен быть массивом!');
    }
    if (typeof (onSave) !== 'function' || typeof (onClose) !== 'function') {
      throw new Error('Пропсы  onSave и onClose должен быть функцией!');
    }
    if (typeof (header) !== 'string') {
      throw new Error('Пропс header должен быть строка');
    }

    if (typeof (closable) !== 'boolean') {
      throw new Error('Пропс closable должен быть bool ');
    }

    if (typeof (error) !== 'string') {
      throw new Error('Пропс error должнен быть строка');
    }

    if (typeof (waitRequest) !== 'boolean') {
      throw new Error('Пропс waitRequest должнен быть bool');
    }
  }, []);

  function onBlurFunction(oneField, validation) {
    if (validation === 'password') {
      if (oneField.value.match(regExpPassword) === null) {
        setHasError({ id: oneField.id, text: ' Поле пароля должно содержать как минимум 1 большую букву или цыфру ' });
        return;
      }
      setHasError({});
      return;
    }
    setHasError({});
  }

  /**
 * getDefaultFields - функция, которая отстроит все поля, на основании пришедших пропсов из вызывающего компонента
 *
 * @param {array} arroFields - массив , на основании которого произойдет построение компонента
 * @returns {JSX} jsx - разметку
 */
  function getDefaultFields(arroFields = []) {
    return (
      arroFields.map((oneField) => (
        <div
          key={oneField.id}
          className="wrapper-div-of-input"
        >
          <span className="title-of-input">
            {oneField.nameOfField}
            :
            {' '}
          </span>
          <input
            className="field-with-data-of-input"
            type={oneField.validation === 'password' ? 'password' : 'text'}
            value={oneField.value}
            onChange={(e) => {
              handleChangeValueOfTheField(oneField.id, e.target.value, oneField.validation);
              onBlurFunction(oneField, oneField.validation);
            }}
            onBlur={() => onBlurFunction(oneField, oneField.validation)}
            onMouseLeave={() => onBlurFunction(oneField, oneField.validation)}

          />
          {
                       hasError.id
                         ? hasError.id === oneField.id
                           ? (
                             <div
                               className="error-message"
                             >
                               {hasError.text}
                             </div>
                           )
                           : null
                         : null
          }
        </div>
      ))
    );
  }

  /**
     * handleUpDataToParent - функция, которая делает последнюю валидацию и
     * при успешной валидации отправляет данные через подьем состояния пользователю компонента.
     *
     * @returns подьем состояния или изменение hasError состояния.
     */
  function handleUpDataToParent() {
    let hasErrorLocal = false;
    for (const data of listOfData) {
      if (data.value.length < 1) {
        setHasError({
          id: data.id,
          text: `${data.nameOfField} пустое поле`,
        });
        hasErrorLocal = true;
      }
    }
    if (!hasErrorLocal) {
      onSave(listOfData);
    }
  }

  /**
     * validateFunction - функция, которая осществляет валидацию форм, и возвращает тру или фолс.
     * (при добавлении типа валидации, если она будет при каждом клике валидизироваться, её нужно добавить в эту функцию)
     * @param {string} value - значение поля над которым проводится валидация данных
     * @param {string} typeOfValidation - тип поля для выбора типа валидации
     * @returns {bool} - true, если прошла валидацию, false, если нет.
     */
  function validateFunction(value, typeOfValidation) {
    if (typeOfValidation === 'login') {
      return value.match(regExpLogin) === null;
    }
    return true;
  }

  /**
     * handleChangeValueOfTheField - метод, который проходится мэпом по состоянию и возвращает
     * измененные обьекты, которые потом перезаписывается  состояние,(принцип иммутабельности сохранен, исходный
     * State не изменен, второй аргумент возвращаенный из useState всегда полностью перезаписывает все состояние)
     *
     * @param {number} id - локально сгенерированный id для изменения поля в состоянии
     * @param {string} targetValue - значение, на которое мы изменим часть состояния
     * @returns {state} listOfData - новое состояние
     */
  function handleChangeValueOfTheField(id, targetValue, typeOfValidation) {
    if (
      targetValue.match(regexpEn) === null
           && validateFunction(targetValue, typeOfValidation, id)
    ) {
      setListOfData(listOfData.map((data) => (data.id === id ? { ...data, value: targetValue } : data)));
    }
  }

  return (
    <div
      className="main-dialog-background"
    >
      <div
        className="main-dialog-window"
      >
        <div className="dialog-header">
          {header}
          {closable
            ? (
              <button
                className="header-close-button"
                onClick={onClose}
              >
                X
              </button>
            )
            : null}
          {' '}

        </div>
        <div
          className="wrapper-near-the-all-fields"
        >
          {getDefaultFields(listOfData)}
        </div>
        {waitRequest ? (
          <div
            className="wait-request"
          >
            Подождите. запрос обрабатывается...
          </div>
        ) : null}
        <div
          className="main-dialog-footer"
        >
          <span
            className="users-error-footer"
          >
            {error}
          </span>

          <button
            onClick={handleUpDataToParent}
            disabled={hasError.id}
            className="main-dialog-footer-indent"
          >
            Войти
          </button>

          <button
            style={{
              display: !closable ? 'none' : null,
            }}
            onClick={onClose}
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginOrRegistration;
