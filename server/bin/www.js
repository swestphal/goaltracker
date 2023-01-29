// https://expressjs.com/en/guide/migrating-4.html#app-gen

/**
 * Module dependencies.
 */

const app = require('../app')
const debug = require('debug')('server:server')
const http = require('http')
const config = require('config')
const mongoose = require('mongoose')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.get('PORT') || '3000')
app.set('port', port)
console.log('running on ', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
mongoose.set('strictQuery', false)
mongoose.connect(config.get('MONGODB_URL')).then(() => {
    server.listen(port)
    server.on('error', onError)
    server.on('listening', onListening)
    console.log(`mongodb connected ${config.get('MONGODB_URL')}`)
}).catch(err => {
    console.log(err)
    process.exit(1)
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
    // named pipe
        return val
    }

    if (port >= 0) {
    // port number
        return port
    }

    return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
    case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
    default:
        throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
    const addr = server.address()
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    debug('Listening on ' + bind)
}
