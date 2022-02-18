const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const request = require('supertest')

const createView = require('../');
const parseRoutes = require('../src/route');

const DEFAULT_PORT = 3000;
const DEFAULT_INDEX = 'index.html';

const root = path.join(process.cwd(), process.argv[2]);
const output = path.join(process.cwd(), 'dist');

const cleanOutput = () => {
  if (fs.existsSync(output)){
    const ls = fs.readdirSync(output);
    for (let name of ls){
      fs.rmSync(path.join(output, name));
    }
  } else {
    fs.mkdirSync(output);
  }
}

if (!fs.existsSync(root)){
  console.error('Root not found');
  process.exit();
}

cleanOutput();

;(async () => {
  const app = new Koa();
  app.context.viewRoot = root;
  app.use(createView());
  const server = await app.listen(DEFAULT_PORT);

  const routes = parseRoutes(root);

  for (let route of routes){
    app.context.state = route.params ? { params: route.params } : {};
    let reqPath = path.join('/', route.path || '/');

    let res = await request(server)
      [ (route.method || 'get').toLowerCase() ](reqPath);

    if (res.status !== 200){
      console.error(`Build Error [${res.status} ${reqPath}]: ${res.text}`);
      continue;
    }

    let pathInfo = path.parse(reqPath);
    let dir = path.join(output, pathInfo.dir);
    if (!fs.existsSync(dir))
      fs.mkdirSync(dir, { recursive: true });

    let outPath = path.join(dir, `${pathInfo.base || DEFAULT_INDEX}`);
    if (fs.existsSync(outPath)){
      console.error(`Output Error [${res.status} ${reqPath}]: File existed!`)
      continue;
    }

    console.log(`Write [${res.status} ${reqPath}]`)
    fs.writeFileSync(outPath, res.text);
  }

  server.close();
})();