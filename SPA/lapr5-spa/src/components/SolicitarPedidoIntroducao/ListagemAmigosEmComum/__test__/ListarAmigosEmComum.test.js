import React from 'react';
import ListarAmigosEmComum from '../ListarAmigosEmComum'
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
        objectiveUser: {id:'a',nome:'aa',descBreve:'aaa',paisResidencia:'aaaaa',localidade:'aaaaa'},
        bridgeUser: {id:'a',nome:'aa',descBreve:'aaa',paisResidencia:'aaaaa',localidade:'aaaaa'}}

    const mockStore = configureStore()
    let store
    store = mockStore(initialState)

    const div = document.createElement("div");
    render(<Provider store={store}> <ListarAmigosEmComum/></Provider>,div) 
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
            <Provider store={store}> <ListarAmigosEmComum /></Provider>
            ,{ attachTo: document.getElementById('container') }
            
        )
    })


    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.find(ListarAmigosEmComum)).toEqual({})
        expect(wrapper.find(ListarAmigosEmComum).length).toEqual(0)
    });

});

