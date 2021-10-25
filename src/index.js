// Importacoes das funcoes de outro arquivo.
import express from "express";
import { readPokemons } from "./services/jsonService";
import { createPokemon } from "./services/jsonService";
import { updatePokemon } from "./services/jsonService";
import { deletePokemon } from "./services/jsonService";
import { validateId } from "./validate/validateRequest";
import { validateBody } from "./validate/validateRequest";

// Inicializa express.
const app = express();
app.use(express.json());

// Funcao que le as informacoes do objeto.
app.get('/pokemon', async (request, response) => {
    const data = {

        // Resposta que inicia funcao "readPokemons".
        response: await readPokemons()
    }

    // Retorna as informacoes para o usuario.
    response.json(data)
});

// Funcao que cria novas informacoes para o Objeto.
app.post('/pokemon', async (request, response) => {

    // Obtem dados do body.
    const body = request.body;

    // Se que inicia a funcao "validadeBody" que verifica se as informacoes sao validas.
    if (validateBody(body, "AND")) {

        // Variavel que inicia funcao de criacao de Pokemons
        const idCreatePokemon = await createPokemon(body);

        // Retornar 201 como status e ...
        response.status(201).json(
            {
                // ... Seta as informacoes da funcao.
                response: idCreatePokemon
            }
        );

        // Se alguma informacao for invalida ele retorna o STATUS 400 -> indicando erro.
    } else { response.status(400).end() };
});

// Funcao que Altera/Update das informacoes no Objeto.
app.put('/pokemon/:id', async (request, response) => {

    // Obtem dados do body.
    const body = request.body;

    // Obtem id do paramentro.
    const id = request.params.id;

    // Converte a String para Number.
    body.id = Number(id)

    // Se que inicia a funcao "validadeBody" que verifica se as informacoes sao validas.
    if (validateBody(body, "OR")) {

        // Se que inicia a funcao "validadeId" que verifica se o ID é valido.
        if (validateId(body.id)) {

            // Chama funcao de Update "updatePokemon"
            const idUpdatePokemon = await updatePokemon(body);

            // Retornar 201 como status e ...
            response.status(201).json(
                {

                    // ... Seta as informacoes da funcao.
                    response: idUpdatePokemon
                }
            );

            // Se o ID for invalido ele retorna STATUS 422 -> indicando erro.
        } else { response.status(422).end() };

        // Se alguma informacao do BODY for invalida ele retorna o STATUS 400 -> indicando erro.
    } else { response.status(400).end() };
});

// Funcao que Deleta algum (Pokemon) conjunto de informacoes no Objeto.
app.delete('/pokemon/:id', async (request, response) => {

    // Variavel que pega e converte o ID do parametro para NUMBER.
    const id = Number(request.params.id);

    // Se que inicia a funcao "validadeId" que verifica se o ID é valido.
    if (validateId(id)) {

        // Variavel que inicia a funcao "deletePokemon".
        const idDeletePokemon = await deletePokemon(id);

        // Retornar 201 como status e ...
        response.status(201).json(
            {

                // ... Seta as informacoes da funcao.
                response: idDeletePokemon
            }
        )

        // Se o ID for invalido ele retorna STATUS 422 -> indicando erro.
    } else { response.status(422).end() };

});


// Adiciona a aplicacao na porta 3000 (neste caso). localhost:3000 
app.listen(3000);