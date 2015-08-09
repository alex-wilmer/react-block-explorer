const express = require(`express`)
    , app = express()
    , server = require(`http`).Server(app)
    , io = require(`socket.io`)(server)
    , bodyParser = require(`body-parser`)
    , Chain = require(`chain-node`)
    , config = require(`../config`)
    , chain = new Chain(config)
    , port = process.env.PORT || 5000

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get(`/`, (req, res) => {
  res.sendFile(`/index.html`)
})

// app.post(`/new_transaction`, (req, res) => {
//   io.sockets.emit(`new_transaction`, req.body)
//   res.end()
// })

app.post(`/query`, (req, res) => {
  const query = req.body.query

  if (+query) {
    chain.getBlock(+query, (err, resp) => {
      res.json(resp)
    })
  }

  else {
    chain.getAddress(query, (err, resp) => {
      res.json(resp)
    })
  }
})

server.listen(port)
