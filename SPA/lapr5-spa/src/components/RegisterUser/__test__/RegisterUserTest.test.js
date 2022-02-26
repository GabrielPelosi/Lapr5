import React from 'react';
import RegisterUser from '../RegisterUser'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';

it("Render without crashing", () => {
    const initialState = {
        user: [
            { name: 'player1', password: 'P@ssword2021', dateOfBirth: '24/04/1999', numTel: '+351987654321', email: 'player1@gmail.com', bio: 'Sou o player1', tagsInterest: "Music,Games", country: 'Portugal', city: 'Porto' }

        ]
    }

    const mockStore = configureStore()
    let store = mockStore(initialState)

    const div = document.createElement("div");
    render(<Provider store={store}><Router> <RegisterUser /></Router></Provider>, div)
})

