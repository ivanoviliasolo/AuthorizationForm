import renderer from 'react-test-renderer';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginOrRegistration from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Блок тестов компонента LoginOrRegistration', () => {
  it('Тестирование по снимку', () => {
    const Snapshot = renderer.create(<LoginOrRegistration />).toJSON();
    expect(Snapshot).toMatchSnapshot();
  });

  it('Teстирование с не валижным пропсом onClose, ожидается характерная ошибка ', () => {
    let error;
    try {
      mount(<LoginOrRegistration onClose="str" />);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('Пропсы  onSave и onClose должен быть функцией!'));
  });

  it('Teстирование с не валижным пропсом onSave, ожидается характерная ошибка ', () => {
    let error;
    try {
      mount(<LoginOrRegistration onSave="str" />);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('Пропсы  onSave и onClose должен быть функцией!'));
  });

  it('Teстирование с не валижным пропсом listOfFields, ожидается характерная ошибка ', () => {
    let error;
    try {
      mount(<LoginOrRegistration listOfFields="str" />);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('Пропс listOfFields должен быть массивом!'));
  });

  it('Teстирование с не валижным пропсом header, ожидается характерная ошибка ', () => {
    let error;
    try {
      mount(<LoginOrRegistration header={()=>{}} />);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('Пропс header должен быть строка'));
  });

  it('Teстирование с не валижным пропсом closable, ожидается характерная ошибка ', () => {
    let error;
    try {
      mount(<LoginOrRegistration closable={()=>{}} />);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('Пропс closable должен быть bool '));
  });

  it('Teстирование с не валижным пропсом error, ожидается характерная ошибка ', () => {
    let error;
    try {
      mount(<LoginOrRegistration error={()=>{}} />);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('Пропс error должнен быть строка'));
  });

  it('Teстирование с не валижным пропсом waitRequest, ожидается характерная ошибка ', () => {
    let error;
    try {
      mount(<LoginOrRegistration waitRequest={()=>{}} />);
    } catch (e) {
      error = e;
    }
    expect(error).toEqual(new Error('Пропс waitRequest должнен быть bool'));
  });
  
});
