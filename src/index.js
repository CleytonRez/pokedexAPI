import express from "express";
import { readPokemons } from "./services/jsonService";
import { createPokemon } from "./services/jsonService";
import { updatePokemon } from "./services/jsonService";
import { deletePokemon } from "./services/jsonService";

// Inicializa express.
const app = express();
app.use(express.json());

app.get('/pokemon', async (request, response) => {
    const data = {
        response: await readPokemons()
    }
    response.json(data)
});

app.post('/pokemon', async (request, response) => {
    // Obter dados do body.
    const body = request.body;
    console.log(body)
    // chamar funcao de criancao
    const idCreatePokemon = await createPokemon(body);

    response.status(201).json(
        {
            response: idCreatePokemon
        }
    )

    // retornar 201
});

app.put('/pokemon/:id', async (request, response) => {
    // Obter dados do body.
    const body = request.body;
    const id = request.params.id;
    body.id = Number(id)
    console.log(body)
    // chamar funcao de Update
    const idUpdatePokemon = await updatePokemon(body);

    response.status(201).json(
        {
            response: idUpdatePokemon
        }
    )
});

app.delete('/pokemon/:id', async (request, response) => {
    const id = Number(request.params.id);
    console.log(id)

    const idDeletePokemon = await deletePokemon(id);

    response.status(201).json(
        {
            response: idDeletePokemon
        }
    )
});

app.listen(3000);