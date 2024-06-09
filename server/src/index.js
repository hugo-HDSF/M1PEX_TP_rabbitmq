const WebSocket = require('ws')

const wss = new WebSocket.Server({
    port: parseInt(process.env.PORT),
})

const exchangeName = 'amq.fanout'

const amqplib = require('amqplib').connect(process.env.AMQP_URL)

let channel = null

console.log(`Starting websocket server at port ${process.env.PORT}`)
console.log(`Starting AMQP server at ${process.env.AMQP_URL}`)
console.log(`Waitin for connection...`)

amqplib.then(function (conn) {
    return conn.createChannel()
}).then(function (ch) {
    channel = ch
})

wss.on('connection', (ws) => {
    ws.id = Math.random() * 100000000;
    ws.on('headers', (headers) => {
        headers['Access-Control-Allow-Origin'] = '*';
    });
    ws.on('message', (message) => {
        console.log('received: %s (%i)\n', message, ws.id)
        channel.publish(exchangeName, '', message)
    })
    ws.on('close', () => {
        console.log(`Client disconnected`)
    })

    if (channel !== null) {
        const queueName = `chat-client-${ws.id}`
        channel
            .assertQueue(queueName, {
                autoDelete: true,
                durable: false,
            })
            .then((ok) => {
                channel.bindQueue(queueName, exchangeName, '')
            })
            .then((ok) => {
                channel.consume(queueName, (message) => {
                    ws.send(JSON.stringify(JSON.parse(message.content)))
                })
            })
    }
    console.log(`connection started with ID ${ws.id}`)
})
