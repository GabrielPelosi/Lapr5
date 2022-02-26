import React from 'react'
import PublicarPostagemView from './PublicarPostagemView'

class PublicarPostagemController extends React.Component {
    state = {
        pokemonImage: '1.gif',
        pokemonName: ''
    }

    setRandomPokemonImage = () => {
        const rand = Math.ceil(Math.random() * 10)
        this.setState({ pokemonImage: `${rand}.gif` })
    }

    setPokemonName = (e) => {
        this.setState({ pokemonName: e.target.value })
    }

    clearPokemonName() {
        this.setState({ pokemonName: '' })
    }

    savePokemon = () => {
        this.props.viewModel.addPokemon({
            image: this.state.pokemonImage,
            name: this.state.pokemonName
        })
    }

    addPokemon = () => {
        this.savePokemon()
        this.clearPokemonName()
    }

    removePokemon = (pokemon) => {
        this.props.viewModel.removePokemon(pokemon)
    }

    render() {
        const { viewModel } = this.props

        return (
            <PublicarPostagemView
            />
        )
    }
}

export default PokemonController