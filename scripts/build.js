const path = require('path');
const fs = require('fs');
const eta = require('eta');
const chokidar = require('chokidar');

const TIMEOUT = 1000;

const root = path.join(process.cwd(), process.argv[2]);
const output = path.join(process.cwd(), process.argv[3]);

const isWatch = !!process.env['MINTAILOR_WATCH'];

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

const render = async (storage, view, state) => {
  const absolutePath = path.join(storage, view);
  if (absolutePath.indexOf(storage) !== 0)
    throw new Error('cannot include view outside storage');

  const config = {
    root: storage,
    views: storage,
    includeFile(path, data){
      return render(storage, path, data);
    }
  };

  return eta.renderFileAsync(view, state, config);
}

const buildSource = async () => {
  const ls = fs.readdirSync(root);

  for (let name of ls){
    let ua = path.parse(name);
    let src = path.join(root, name);
    let dst = path.join(output, name);

    if (ua.name[0] === '.') // skip hidden file
      continue;

    if (ua.ext === '.eta'){
      let body = await render(root, ua.name, {});
      fs.writeFileSync(path.join(output, `${ua.name}.html`), body);
      continue;
    }

    fs.copyFileSync(src, dst);
  }
}

const cleanAndBuild = async () => {
  console.log(`+ Clean`)
  cleanOutput();

  console.log(`+ Build`)
  await buildSource();
}

let loop = null;

const updateChange = async () => {
  console.log('+ Changed. Rebuild.');

  await cleanAndBuild();
}

const onChange = () => {
  if (loop)
    clearTimeout(loop);

  loop = setTimeout(updateChange, TIMEOUT);
}

;(async () => {
  if (!fs.existsSync(root)){
    console.error('Root not found');
    return;
  }

  console.log(`+ Your are watching: ${root}`);
  console.log(`+ Your are output: ${output}`);

  // not watch
  if (!isWatch){
    await cleanAndBuild();
    return;
  }

  // watch change
  chokidar.watch(root).on('all', () => { onChange() });
})();