import fs from "fs";
import util from "util";
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const path = "./src/models/pokemon.json"

const _getParseFile = async () => {
    // Carregar o documento pokemon.json.
    const file = await readFile(path, "utf8")

    // Fazer um parse para objeto.
    const parsedJSON = JSON.parse(file)

    return parsedJSON;
}

const _setStringilyFile = async (data) => {
    // Fazer o .Stringify do objeto.
    const stringfiedJSON = JSON.stringify(data);
    console.log(stringfiedJSON);

    // Subescrever o arquivo pokemon.json.
    await writeFile(path, stringfiedJSON)
}

export const readPokemons = async () => {
    try {
        // Carregar o documento pokemon.json.
        const data = await _getParseFile();

        // retorna Array pokemon.
        return data.data;

    } catch (e) {
        console.log(e)
    }
}

export const createPokemon = async (pokemonCreate) => {

    // Carregar o documento pokemon.json.
    try {
        // Carregar o documento pokemon.json.
        const data = await _getParseFile();

        // Adicionar pokemon na lista.
        pokemonCreate.id = Math.random()
        data.data.push(pokemonCreate)


        _setStringilyFile(data)

    } catch (e) {
        console.log(e)

    }
    return pokemonCreate.id;

}

/**
 * Recebe um OBJ com os novos dados, encontra-lo no JSON e atualizar as informacoes.
 * @param {newPokemon} pokemonUpdate 
 */
export const updatePokemon = async (pokemonUpdate) => {

    // Carregar o documento pokemon.json.
    try {
        // Carregar o documento pokemon.json.
        const data = await _getParseFile();

        // buscar o pokemon pelo ID .map quando achar, retorna aquele pokemon com os valores substituidos.
        const newPokemonList = data.data.map((pokemon) => {
            //console.log(obj)

            if (pokemon.id === pokemonUpdate.id) {

                return Object.assign({}, pokemon, pokemonUpdate)
            }
            return pokemon;
        })

        // Fazer o .Stringfy do objeto.
        _setStringilyFile({
            data: newPokemonList
        })

        return pokemonUpdate.id;
    } catch (e) {
        console.log(e)
    }

}

export const deletePokemon = async (id) => {

    // Carregar o documento pokemon.json.
    const data = await _getParseFile();

    // Cria uma newList vazia.
    const newPokemonList = []

    // buscar o pokemon pelo ID .forEach quando achar, cria um if e se for diferente ele adiciona na lista .
    data.data.forEach((pokemon) => {

        if (pokemon.id !== id) {
            newPokemonList.push(pokemon)
        }
    });

    // Fazer o .Stringfy do objeto.
    _setStringilyFile({
        data: newPokemonList
    })

    return id;

};