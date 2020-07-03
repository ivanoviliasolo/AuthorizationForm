import Enzyme, {shallow, mount  } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { App } from './App';
import configureMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });


describe('Тестируем компонент App ',()=>{
    
    const mockStore = configureMockStore([  ]);
    const storeStateMock = {};

    const nextProps={
        defLoginsState:[],
dispatchSelectedLogin:()=>{},
registratedUsers:[ ]
}
const store = mockStore(storeStateMock);

    it('Тест компонент на наличие только 1 div ', ()=>{
        const initialProps={
            defLoginsState:[],
  dispatchSelectedLogin:()=>{},
  registratedUsers:[
            1
        ]
    }
        const AppComponent =shallow( 
                <App  {...initialProps}/>
        );
        expect(AppComponent.find('div').length).toBe(1);
    })

    it('Тестируем компонент с пустым пропсом  registratedUsers, ожидаем что выведется компонент-коснструктор регестраци\\авторизации',()=>{
       
        const AppComponent =mount ( 
                <App  {...nextProps} store={store}/>
        );
        expect(AppComponent.find('LoginOrRegistration').length).toBe(1);
    });

    it('Тестируем компонент с пустым пропсом  registratedUsers, ожидаем, что компонент'+
     'c false стороны тернарного выражения, не вызовется, соответственно мы его не найдем',()=>{

        const AppComponent =mount ( 
                <App  {...nextProps} store={store}/>
        );

        expect(AppComponent.find('WorkedDirectory').length).toBe(0);
    });

    it('Тестирование с помощью снимка, на целостность структуры компонента: ожидается совпадение снимку',()=>{
        const AppComponent =renderer.create ( 
            <App  {...nextProps} store={store}/>
    ).toJSON();

    expect(AppComponent).toMatchSnapshot();
    })

    // it('Тестируем функцию, handleGetDataFromForm, получает данные из state,( через замыкание ) '
    // +'аргумент - данные полученные через "подьем состояния" ',()=>{
    //     expect(handleGetDataFromForm('55')).toThrow('gg');
    // })
})