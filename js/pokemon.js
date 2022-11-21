const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('pokemon')
const h1 = document.getElementById('pokemon-name')

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generateHTML = ({ id, name, types, stats}) => {
    const pokemonTypes = types.map(({ /*slot,*/ type: { name, /*url*/ }, /*weight*/ }) => name)
    const pokemonStats = stats.map(stat => `
    <div class="stat ${stat.stat.name}">
        <span class="name">${stat.stat.name}</span>
        <span class="value">${stat.base_stat}</span>
    </div>`)
    
    const newHtml = `
    <div class="card ${pokemonTypes[0]}">
        <div class="detail">
            <div class="pokemon-image">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png" alt="${name}"/>
            </div>
            <div class="pokemon-info">
                <span class="title">${id}. ${name}</span>
                <span class="types">${pokemonTypes.join(' | ')}</span>
            </div>
            <span class="title stat-title">Base Stats</span>
            <div class="pokemon-stats">
                ${pokemonStats.join('\n')}
            </div>
        </div>
    </div>
    `
    return newHtml
}

const insertPokemonsIntoPage = pokemon => {
    const div = document.querySelector('[data-js="pokemon"]')
    div.innerHTML = pokemon
}

fetch(getPokemonUrl(id)).then(response => response.json())
    .then(generateHTML)
    .then(insertPokemonsIntoPage)