const ul = document.querySelector<HTMLUListElement>(".pokemon")
const queryString = new URLSearchParams(window.location.search)


function addPokemonImage(response: PokemonEntry) {
    const div = document.querySelector(".abilitiesBox")
    const pokeTitleCase = `${response.name[0].toUpperCase()}${response.name.slice(1)}`
    if (div) {
        div.innerHTML = `
        <figure>
            <img src="${response.sprites.front_shiny}" alt="${pokeTitleCase}" />
            <figcaption>${pokeTitleCase}</figcaption>
            <p>Abilities: ${response.abilities[0].ability.name}</p>
        </figure>
    `
    }
    addPokemonAbility(response),
        console.log(response.abilities[0].ability.name)
    if (ul && div) {
        ul.append(div)
    }
}


function addPokemonAbility(response: PokemonEntry) {
    const li = document.createElement("li")
    li.innerHTML = ` 
    <span class="ability-name">${response.abilities[0].ability.name} - </span>
    <span class="ability-short-description">${response.abilities[0].ability.url}</span>
`
    ul?.append(li)

}


type PokemonEntry = {
    sprites: { front_shiny: string };
    name: string;
    abilities: [{
        ability: {
            name: string;
            url: string;
        }
    }]
}

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then((response) => response.json())
    .then((response: PokemonEntry) => {
        const abilitiesRequests = response.abilities
            .map(ability => ability.ability.url)
            .map((urlInd: string) => {
                return fetch(urlInd).then(response => response.json())
            })
        addPokemonImage(response)
        return Promise.all(abilitiesRequests)
    }).then(response => {
        response.map(response => {
            const li = document.createElement("li")
            li.innerHTML = `
            <span class="ability-name">
            ${response.name[0].toUpperCase()}${response.name.slice(1)}
        </span>
        <span class="ability-short-description">
            ${response.abilities.ability}
        </span>
        `
            return li
        }).forEach(li => {
            if (ul) {
            ul.append(li)
            }
        })
    })


export default {}