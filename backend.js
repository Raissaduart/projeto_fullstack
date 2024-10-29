// console.log('Hello, NodesJS!!!')
// Java Script Object Notation (json)
// { chave: valor}
//mongodb+srv://mongo123:mongodb@cluster0.thrdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: { type: String },
    sinopse: { type: String }
}))

const usuarioSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

async function conectarAoMongoDB() {
    await
        mongoose.connect(`mongodb+srv://mongo123:mongodb@cluster0.thrdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

// let filmes = [
//     {
//         titulo: "Forrest Gump - O Contador de Histórias",
//         sinopse: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump(Tom Hanks), um rapaz com QI abaixo da média e boas intenções."
//     },
//     {
//         titulo: "Um Sonho de Liberdade",
//         sinopse: "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela"
//     }
// ]


// get: URL(construção) -- protocolo://servidor:porta/endpoint
// http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})
// req: require
// res: response

//get: http://localhost:3000/filmes
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

//get: obter
//post: criar 
// 1. carregar lista original/ 2. temp = original + enviou/ 3. atualizar a lista

app.post('/filmes', async (req, res) => {
    //pegar os dados enviados na requisição
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //instanciar um objeto de acordo com o modelo criado
    const filme = new Filme({ titulo: titulo, sinopse: sinopse })
    await filme.save()
    //buscar lista atualizada 
    const filmes = await Filme.find()
    // //montar o json do novo filme 
    // const novo_filme = {titulo: titulo, sinopse: sinopse}
    // //adiciona o novo filme à base
    // filmes.push(novo_filme)
    // //mostrar a base atualizada ao usuário
    res.json(filmes)
})

app.post('/sigup', async (req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password
        const senhaCriptografada = await bcrypt.hash(password, 10)
        const usuario = new Usuario({ login: login, password: senhaCriptografada })
        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    }
    catch (error) {
        console.log(error)
        res.status(409).end()
    }
})

app.post('/login', async (req, res) => {
    //login/senha que o usuário enviou
    const login = req.body.login
    const password = req.body.password
    //tentamos encontrar no MongoDB
    const usuarioExiste = await Usuario.findOne({ login: login })
    if (!usuarioExiste) {
        //senão foi encontrado, encerra por aqui com código 401
        return res.status(401).json({ mensagem: "login inválido" })
    }
    //se foi encontrado, comparamos a senha, após descriptográ-la
    const senhaValida = await bcrypt.compare(password, usuarioExiste.password)
    if (!senhaValida) {
        return res.status(401).json({ mensagem: "senha inválida" })
    }
    //deixa assim por enquanto, já já arrumamos
    res.end()
})


app.listen(3000, () => {
    try {
        conectarAoMongoDB()
        console.log("server up and running and connection ok")
    }
    catch (e) {
        console.log("Erro de conexão")
    }
})
// app.listen(porta, ação)
//ação: função -- tipo nome (par) { corpo }
// forma simplificada: (par) => { corpo = ação }