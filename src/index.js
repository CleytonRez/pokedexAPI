import { readPokemons } from "./services/jsonService";
import { createPokemon } from "./services/jsonService";

const execute = async () => {
    const pokemon = await readPokemons();
    //console.log(pokemon)

}
execute();
createPokemon({});