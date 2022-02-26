import React from 'react';
import SolicitarPedidoIntroducao from '../SolicitarPedidoIntroducao'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount ,configure } from 'enzyme';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "core-js/stable";
import "regenerator-runtime/runtime";

configure({adapter: new Adapter()})


it("render without crashing", () => {
    const initialState = {
        objectiveUser: {id:'a',nome:'aa',descBreve:'aaa',paisResidencia:'aaaaa',localidade:'aaaaa'},
        bridgeUser: {id:'a',nome:'aa',descBreve:'aaa',paisResidencia:'aaaaa',localidade:'aaaaa'}}

    const mockStore = configureStore()
    let store
    store = mockStore(initialState)

    const div = document.createElement("div");
    render(<Provider store={store}><Router> <SolicitarPedidoIntroducao/></Router></Provider>,div) 
})



describe('>>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)', () => {
    const initialState = {
        objectiveUser: {id:'a',nome:'aa',descBreve:'aaa',paisResidencia:'aaaaa',localidade:'aaaaa'},
        bridgeUser: {id:'a',nome:'aa',descBreve:'aaa',paisResidencia:'aaaaa',localidade:'aaaaa'}}
    const mockStore = configureStore()
    let store, wrapper

    beforeEach(() => {
        store = mockStore(initialState)
        const div = document.createElement('div');
        div.setAttribute('id', 'container');
        document.body.appendChild(div);
        wrapper = mount(
            <Provider store={store}> <Router><SolicitarPedidoIntroducao /></Router></Provider>
            ,{ attachTo: document.getElementById('container') }
            
        )
    })


    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(SolicitarPedidoIntroducao)).toEqual({})
        expect(wrapper.find(SolicitarPedidoIntroducao).length).toEqual(0)
    });

});

