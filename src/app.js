const express = require(`express`)
    , app = express()

app.use(express.static(`${__dirname}/public`))

app.get(`/`, (req, res) => {
  res.sendFile(`/index.html`)
})

app.listen(3000)
