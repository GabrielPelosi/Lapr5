import React from 'react';
import ListarPedidosPendentesAceitar from '../ListarPedidosPendentesAceitar'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react'
import { shallow, mount ,configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "core-js/stable";
import "regenerator-runtime/runtime";

configure({adapter: new Adapter()})


it("render without crashing", () => {
    const initialState = {pedidosPendentesAprovar:[
        {id:'1',objectiveUserName:'Teste',bridgeUserName:'aaa',bridgeUserText:'aaaaa',},
        {id:'2',objectiveUserName:'Teste123',bridgeUserName:'aaa543534',bridgeUserText:'aaaaa',},
        {id:'3',objectiveUserName:'Teste6665',bridgeUserName:'a54353aa',bridgeUserText:'aaaaa',},
    ]}
    const mockStore = configureStore()
    let store
    store = mockStore(initialState)

    const div = document.createElement("div");
    render(<Provider store={store}> <ListarPedidosPendentesAceitar/></Provider>,div) 
})



describe('>>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)', () => {
    const initialState = {
        pedidosPendentesAprovar: [
            { id: 'a', objectiveUserName: 'aa', bridgeUserName: 'aaa', bridgeUserText: 'aaaaa', },
            { id: 'a2', objectiveUserName: 'gdfgdfg', bridgeUserName: 'aaa543534', bridgeUserText: 'aaaaa', },
            { id: 'a3', objectiveUserName: '545gfd', bridgeUserName: 'a54353aa', bridgeUserText: 'aaaaa', },
        ]
    }
    const mockStore = configureStore()
    let store, wrapper

    beforeEach(() => {
        store = mockStore(initialState)
        const div = document.createElement('div');
        div.setAttribute('id', 'container');
        document.body.appendChild(div);
        wrapper = mount(
            <Provider store={store}> <ListarPedidosPendentesAceitar /></Provider>
            ,{ attachTo: document.getElementById('container') }
            
        )
    })


    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(ListarPedidosPendentesAceitar)).toEqual({})
        expect(wrapper.find(ListarPedidosPendentesAceitar).length).toEqual(0)
    });

});

