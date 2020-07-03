import Enzyme, {shallow} from 'enzyme';
import React from 'react';
import {WorkedDirectory} from './index';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });


describe('Тестируем компонент WorkedDirectory ',()=>{
    
    it('Тест на текст возвращаемого значения компонента, должен совпадать ожиданиям', ()=>{
        const nextProps={
            registratedUsers:[{login:'Admin'}],
            dispatchAction:()=>{},
    }
        const WorkedDirectoryTest = shallow(<WorkedDirectory  {...nextProps}/>)
        expect(WorkedDirectoryTest.find('.wrapp-main').text())
        .toEqual("Добрый день -"+nextProps.registratedUsers[0].login+"Выйти из учетной записи "+nextProps.registratedUsers[0].login)
    })

    it('Тестирование с помощью снимков на изменения в структуре компонента', ()=>{
        const nextProps={
            registratedUsers:[{login:'Admin'}],
            dispatchAction:()=>{},
    }
        const Component = renderer.create(<WorkedDirectory {...nextProps}/>).toJSON();

        expect(Component).toMatchSnapshot();
    });
})