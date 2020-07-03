import unLoginUser from './unLoginUser';

test('Проверка возврааемого значения из actionCreatora unLoginUser',()=>{
    expect(unLoginUser()).toEqual({
        type:'REMOVE'
    })
})