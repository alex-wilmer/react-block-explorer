const express = require(`express`)
const app = express()
const server = require(`http`).Server(app)
const io = require(`socket.io`)(server)
const bodyParser = require(`body-parser`)
const Chain = require(`chain-node`)
const config = require(`../config`)
const chain = new Chain(config)
const port = process.env.PORT || 5000

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get(`/`, (req, res) => {
  res.sendFile(`/index.html`)
})

app.post(`/new_transaction`, (req, res) => {
  io.sockets.emit(`new_transaction`, req.body)
  res.end()
})

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
