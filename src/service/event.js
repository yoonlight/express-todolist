import amqplib from 'amqplib/callback_api'
import events from 'events'
const eventEmitter = new events.EventEmitter()

const send = function () {
  amqplib.connect(process.env.RABBITMQ_URL, function (error0, connection) {
    if (error0) {
      throw error0
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1
      }
      var queue = 'hello'
      var msg = 'Hello world'

      channel.assertQueue(queue, {
        durable: false,
      })

      channel.sendToQueue(queue, Buffer.from(msg))
      console.log(' [x] Sent %s', msg)
    })
  })
}

const sendTodo = function (body) {
  amqplib.connect(process.env.RABBITMQ_URL, function (error0, connection) {
    if (error0) {
      throw error0
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1
      }
      var queue = 'todo'
      var msg = body

      channel.assertQueue(queue, {
        durable: false,
      })
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)))
      console.log(' [x] Sent %s', msg)
    })
  })
}

eventEmitter.on('send', send)
eventEmitter.on('sendTodo', sendTodo)

export { eventEmitter }
