import fs from "fs";
import util from "util";
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
export const readPokemons = async () => {
    try {
        // Carregar o documento pokemon.json.
        const file = await readFile("./src/models/pokemon.json", "utf8")

        // Fazer um parse para objeto.
        const pokemons = JSON.parse(file)
        //console.log(pokemons)

        // retorna Array pokemon.
        return pokemons.data;

    } catch (e) {
        console.log(e.message)
    }
}

export const createPokemon = async (pokemon) => {
    console.log("createPokemon teste")
    // Carregar o documento pokemon.json.
    try {
        const file = await readFile("./src/models/pokemon.json", "utf8")

        // Fazer um parse para objeto.
        const pokemons = JSON.parse(file)

        // Adicionar pokemon na lista.
        pokemon.id = Math.random()
        console.log(pokemon)
        pokemons.data.push(pokemon)
        console.log(pokemons)

        // Fazer o .Stringify do objeto.
        const pokemonList = JSON.stringify(pokemons);
        console.log(pokemonList);

        // Subescrever o arquivo pokemon.json.
        await writeFile("./src/models/pokemon.json", pokemonList)
    } catch (e) {
        console.log(e)

    }


}

const updatePokemon = (pokemon) => {
    // Carregar o documento pokemon.json.
    // Fazer um parse para objeto.
    // buscar o pokemon pelo ID .map quando achar, retorna aquele pokemon com os valores substituidos.
    // Fazer o .Stringfy do objeto.
    // Subescrever o arquivo pokemon.json.

}

const deletePokemon = (id) => {
    // Carregar o documento pokemon.json.
    // Fazer um parse para objeto.
    // Cria uma newList vazia.
    // buscar o pokemon pelo ID .forEach quando achar, cria um if e se for diferente ele adiciona na lista .
    // Fazer o .Stringfy do objeto.
    // Subescrever o arquivo pokemon.json.
}