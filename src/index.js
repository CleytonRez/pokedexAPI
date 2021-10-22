import { readPokemons } from "./services/jsonService";
import { createPokemon } from "./services/jsonService";
import { updatePokemon } from "./services/jsonService";
import { deletePokemon } from "./services/jsonService";

const execute = async () => {
    const pokemonList = await readPokemons();
    console.log(pokemonList)

    const returnCreate = await createPokemon({
        "name": "Evee",
        "strength": 15,
        "defense": 10,
        "weaknesses": [
            "earth"
        ],
        "abilities": [
            {
                "name": "Attack",
                "element": "earth",
                "power": 18
            }
        ],
        "img": null
    })
    console.log(returnCreate);

    const returnUpdate = await updatePokemon({
        id: 1,
        "strength": 21,
    });
    console.log(returnUpdate);

    const returnDelete = await deletePokemon(1);
    console.log(returnDelete);

}

execute();