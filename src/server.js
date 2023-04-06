import http from 'node:http'
import { json } from './middlewares/json.js'
import { events } from './events.js'
import { Database } from './database.js';
import { randomUUID } from 'node:crypto'

const database = new Database();

const server = http.createServer(async (req,res) => {

  const { method, url } = req
  
  await json(req, res)

  if (method === 'GET' && url === '/events') {
    return res.end(JSON.stringify(events))
  }

  if (method === 'GET' && url === '/users') {

    const users = database.select('users')

    console.log('users xxx', users)

    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {

    const { name, email } = req.body;
    console.log('name', name);
    console.log('email', email);

    const user = {
      id: randomUUID(),
      name,
      email
    }

    database.insert('users', user)

    return res.writeHead(201).end('criação de usuários')
  }

  return res.writeHead(404).end()

}) 

server.listen(3333);