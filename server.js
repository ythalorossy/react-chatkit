const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Chatkit = require('@pusher/chatkit-server');

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:2a88138b-e693-4b2c-8c47-a5a0d37a7f49',
  key: '6227fdee-2a93-4d55-933f-d3e968afbe64:1nRdcfDy+QlYf5sJlSQ7oR/rGf/dftcuexdMwd7I7Q0=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  
  const { username } = req.body

  chatkit
    .createUser({
      name: username,
      id: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if(error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200)
      } else {
        res.status(error.status).json(error)
      }
    })
})

app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });

  res.status(authData.status)
     .send(authData.body);
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
     console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
