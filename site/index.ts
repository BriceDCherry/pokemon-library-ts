const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=91"
const main = document.querySelector<HTMLBodyElement>("main")
const pokeBox = document.querySelector<HTMLDivElement>(".pokeBox")
const ul = document.querySelector<HTMLUListElement>("ul")



type PokemonData = {
    name: string;
    imageUrl: string;
}

type PokemonResponse = {

    data?: {
        pokemon: PokemonData
    }
    results: [{
        name: string
        url: string
    }]
    errors?: { message: string }[]
}

fetch(url)
    .then((response) => response.json())
    .then((response: PokemonResponse) => {
        const pokeBall = response.results
        const httpReq = pokeBall
            .map(pokemon => pokemon.url)
            .map(url => {
                return fetch(url).then(response => response.json())
            })
        return Promise.all(httpReq)
        console.log(response)
        // Safe
    }).then(responses => {
        responses.map(
            response => {
                const pokemonList = document.createElement("div")
                const name = `${response.species.name[0].toUpperCase()}${response.species.name.slice(1)}`;
                pokemonList.innerHTML = `
                 <figure>
                    <img src ="${response.sprites.front_shiny}" alt="${name}" />
                    <figcaption>
                        <a href="pokemon.html?pokemon=${response.name}">
                        ${name}
                        </a>
                    </figcaption
                 </figure>
                `
                return pokemonList
            }
        ).forEach(pokemonList => {
            console.log("run Forest")
            ul.append(pokemonList)
        })
    })
    .catch((error) => {
        const message = (error instanceof Error)
            ? error.message
            : "Unknown error"
        console.error(message)
    })





export default {}