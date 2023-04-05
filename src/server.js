import http from 'node:http'

const users = []

const server = http.createServer(async (req,res) => {

  const { method, url } = req
  
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
    console.log('req.body', req.body);
  } catch(e) {
    req.body = null
  }

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type','application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {

    const { name, email } = req.body;
    console.log('name', name);
    console.log('email', email);

    users.push({
      id: 1,
      name,
      email
    })

    return res.writeHead(201).end('criação de usuários')
  }

  return res.writeHead(404).end()

}) 

server.listen(3333);