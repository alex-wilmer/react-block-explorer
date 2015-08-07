const express = require(`express`)
    , app = express()
    , server = require(`http`).Server(app)
    , io = require(`socket.io`)(server)
    , bodyParser = require(`body-parser`)
    , port = process.env.PORT || 5000

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json())

app.get(`/`, (req, res) => {
  res.sendFile(`/index.html`)
})

app.post(`/new_transaction`, (req, res) => {
  io.sockets.emit(`new_transaction`, req.body)
  res.end()
})

server.listen(port)
