// Importacoes das funcoes de outro arquivo.
import express from "express";
import { readPokemons, createPokemon, updatePokemon, deletePokemon } from "./services/jsonService";
import pokemonController from "./controllers/pokemonController";




// Inicializa express.
const app = express();
app.use(express.json());

pokemonController(app);


// Adiciona a aplicacao na porta 3000 (neste caso). localhost:3000 
app.listen(3000);