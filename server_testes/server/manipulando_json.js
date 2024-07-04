const fs = require('fs')
//carrego .json
const dados = fs.readFileSync('dados.json','utf8')


//console.log(dados)
// converto object em object json
const jsonDados = JSON.parse(dados)
console.log(jsonDados)
// incluio valor desejado no boject json
Object.assign(jsonDados,{
    "2024-06-20T16:00:00.005Z":{
        "firstName":"Leticia",
        "lastName": "Silva de Paula",
        "procedure" : "Exossomas"
    }
   }
)
//console.log(newOb)

//gravo object json no arquifo como string
fs.writeFileSync('dados.json', JSON.stringify(jsonDados))
dados = fs.readFileSync('dados.json','utf8')
