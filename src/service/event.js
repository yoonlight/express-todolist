import amqplib from 'amqplib/callback_api'
import amqp from 'amqplib'
import events from 'events'
const eventEmitter = new events.EventEmitter()
const open = amqp.connect(process.env.RABBITMQ_URL)

const send = function () {
  amqplib.connect(process.env.RABBITMQ_URL, function (error0, connection) {
    if (error0) {
      console.log(error0)
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.log(error1)
      }
      let queue = 'hello'
      let msg = 'Hello world'

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
      console.log(error0)
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.log(error1)
      }
      let queue = 'mail'
      let msg = body

      channel.assertQueue(queue, {
        durable: false,
      })
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)))
      console.log(' [x] Sent %s', msg)
    })
  })
}

async function updateTodo(body) {
  const q = 'slack'
  try {
    const conn = await open
    const ch = await conn.createChannel()
    let ok = ch.assertQueue(q, {
      durable: false,
    })
    ok = ok.then(() => {
      return ch.sendToQueue(q, Buffer.from(JSON.stringify(body)))
    })
  } catch (error) {
    console.warn(error)
  }
}
eventEmitter.on('send', send)
eventEmitter.on('sendTodo', sendTodo)
eventEmitter.on('updateTodo', updateTodo)

export { eventEmitter }
