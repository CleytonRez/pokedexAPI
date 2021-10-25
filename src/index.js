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
    if (body.name && body.strength && body.defense && body.weaknesses && body.abilities) {
        if (body.name.length > 3 && typeof body.strength === "number" && typeof body.defense === "number" && body.weaknesses.length > 0 && body.abilities.length > 0) {
            const idCreatePokemon = await createPokemon(body);
            // retornar 201
            response.status(201).json(
                {
                    // chamar funcao de criancao
                    response: idCreatePokemon
                }
            );

        } else { response.status(422).end() };

    } else { response.status(400).end() };
    console.log(body)


});

app.put('/pokemon/:id', async (request, response) => {
    // Obter dados do body.
    const body = request.body;
    const id = request.params.id;
    body.id = Number(id)
    if (body.name || body.strength || body.defense || body.weaknesses || body.abilities) {
        if (!isNaN(body.id) && body.id.length > 0) {
            // chamar funcao de Update
            const idUpdatePokemon = await updatePokemon(body);

            response.status(201).json(
                {
                    response: idUpdatePokemon
                }
            );

        } else { response.status(422).end() };

    } else { response.status(400).end() };
    console.log(body)
});

app.delete('/pokemon/:id', async (request, response) => {
    const id = Number(request.params.id);

    if (!isNaN(id) && id.length > 0) {
        console.log(id)

        const idDeletePokemon = await deletePokemon(id);

        response.status(201).json(
            {
                response: idDeletePokemon
            }
        )

    } else { response.status(400).end() };

});

app.listen(3000);