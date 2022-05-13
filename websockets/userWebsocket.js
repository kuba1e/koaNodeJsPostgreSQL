const WebSocketServer = require('ws')

const wss = new WebSocketServer.Server({
  port: process.env.WEB_SOCKET_PORT
})

wss.on('connection', (ws)=>{
  console.log('Cliet has  connected successful')
  ws.on('message', (data)=>{
    console.log(data)
  })

  ws.on('close',()=>{
    console.log('client has disconnected')
  })

  ws.on('error',(error)=>{
    console.log(`Error: ${error}`)
  })

})