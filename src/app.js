const express = require(`express`)
    , app = express()
    , server = require(`http`).Server(app)
    , io = require(`socket.io`)(server)
    , port = process.env.PORT || 5000

app.use(express.static(`${__dirname}/public`))

app.get(`/`, (req, res) => {
  res.sendFile(`/index.html`)
})

app.post(`/new_transaction`, (req, res) => {
  io.sockets.emit(`test`, { test: `hello world`})
  res.send(`test`)
})

server.listen(port)
