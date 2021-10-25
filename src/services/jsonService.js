// Importa os pacotes usados.
import fs from "fs";
import util from "util";
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const path = "./src/models/pokemon.json"

// Funcao que Carrega e faz o Parse (Transforma o OBJ - JSON em JS)
const _getParseFile = async () => {
    // Carregar o documento pokemon.json.
    const file = await readFile(path, "utf8")

    // Fazer um Parse (Transforma o OBJ - JSON em JS) para objeto.
    const parsedJSON = JSON.parse(file)

    // Retorna o ParsedJON
    return parsedJSON;
}

// Funcao que converte o OBJ em STRING e subscreve o arquivo.
const _setStringilyFile = async (data) => {

    // Fazer o .Stringify do objeto.
    const stringfiedJSON = JSON.stringify(data);
    console.log(stringfiedJSON);

    // Subescrever o arquivo pokemon.json.
    await writeFile(path, stringfiedJSON)
}

// Funcao que Le a lista de Pokemons.
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

// Funcao que Cria Pokemons - Passa novas informacoes para serem salvas. 
export const createPokemon = async (pokemonCreate) => {

    // Carregar o documento pokemon.json.
    try {
        // Carregar o documento pokemon.json.
        const dataJSON = await _getParseFile();

        // Converte a STRING no formato de data para tipo Date.
        const newDate = new Date(pokemonCreate.birthDate);

        // Adicionar pokemon na lista.
        pokemonCreate.id = Math.random()

        // Adiciona o newDate no pokemonCreate.birthDate.
        pokemonCreate.birthDate = newDate

        // Adicionou as informaçoes no JSON
        dataJSON.data.push(pokemonCreate)

        _setStringilyFile(dataJSON)

    } catch (e) {
        console.log(e)

    }

    // Retorna o ID do pokemon.
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

// Funcao que Deleta um Pokemon e suas INF pelo ID.
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

    // Retorna o ID.
    return id;

};