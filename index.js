// console.log('Hello, NodesJS!!!')
// Java Script Object Notation (json)
// { chave: valor}
const express = require('express')
const app = express()
app.use(express.json())

let filmes = [
    {
        titulo: "Forrest Gump - O Contador de Histórias",
        sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump(Tom Hanks), um rapaz com QI abaixo da média e boas intenções."
    },
    {
        titulo: "Um Sonho de Liberdade",
        sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
    }
]


// get: URL(construção) -- protocolo://servidor:porta/endpoint
// http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})
// req: require
// res: response

//get: http://localhost:3000/filmes
app.get('/filmes', (req, res) => {
    res.json(filmes)
})

//get: obter
//post: criar 
// 1. carregar lista original/ 2. temp = original + enviou/ 3. atualizar a lista

app.post('/filmes', (req, res) => {
    //pegar os dados enviados na requisição
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar o json do novo filme 
    const novo_filme = {titulo: titulo, sinopse: sinopse}
    //adiciona o novo filme à base
    filmes.push(novo_filme)
    //mostrar a base atualizada ao usuário
    res.json(filmes)
}
)

app.listen(3000, () => console.log("server up and running"))
// app.listen(porta, ação)
//ação: função -- tipo nome (par) { corpo }
// forma simplificada: (par) => { corpo = ação }