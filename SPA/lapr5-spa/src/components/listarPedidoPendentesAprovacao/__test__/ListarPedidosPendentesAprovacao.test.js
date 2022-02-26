import React from 'react';
import ListarPedidosPendentesAprovacao from '../ListarPedidosPendentesAprovacao'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react'
import { shallow, mount ,configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "core-js/stable";
import "regenerator-runtime/runtime";

configure({adapter: new Adapter()})


it("render without crashing", () => {
    const initialState = {
        pedidosPendentesAprovar: [
            { id: 'a', objectiveUserName: 'aa', bridgeUserName: 'aaa', bridgeUserText: 'aaaaa', },
            { id: 'a2', objectiveUserName: 'gdfgdfg', bridgeUserName: 'aaa543534', bridgeUserText: 'aaaaa', },
            { id: 'a3', objectiveUserName: '545gfd', bridgeUserName: 'a54353aa', bridgeUserText: 'aaaaa', },
        ]
    }
    const mockStore = configureStore()
    let store
    store = mockStore(initialState)

    const div = document.createElement("div");
    render(<Provider store={store}> <ListarPedidosPendentesAprovacao /></Provider>, div)
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
            <Provider store={store}> <ListarPedidosPendentesAprovacao /></Provider>
            ,{ attachTo: document.getElementById('container') }
            
        )
    })


    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(ListarPedidosPendentesAprovacao)).toEqual({})
        expect(wrapper.find(ListarPedidosPendentesAprovacao).length).toEqual(0)
    });

});

