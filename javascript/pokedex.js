const maxPokemons = 150 // Número de pokemons a ser exibido

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(maxPokemons).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const pokemonTypes = types.map(({ /*slot,*/ type: { name, /*url*/ }, /*weight*/ }) => name)

    accumulator += `
        <div class="pokemon ${pokemonTypes[0]}">
            <a href="pokemon.html?pokemon=${id}" class="pokemon-link">
                <div class="pokemon-image">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png" alt="${name}"/>
                </div>
                <div class="pokemon-info">
                    <span class="title">${id}. ${name}</span>
                    <span class="types">${pokemonTypes.join(' | ')}</span>
                </div>
            </a>
        </div>
        `
    return accumulator
}, '')

const insertPokemonsIntoPage = pokemons => {
    const div = document.querySelector('[data-js="pokemon-cards"]')
    div.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)