const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const ejs = require('ejs');

const root = path.join(process.cwd(), process.argv[2]);
const output = path.join(process.cwd(), process.argv[3]);

const cleanOutput = () => {
  console.log('[Mintailor] Clean output');

  if (fs.existsSync(output)) {
    const ls = fs.readdirSync(output);
    for (const name of ls) {
      fs.rmSync(path.join(output, name), { recursive: true });
    }
  } else {
    fs.mkdirSync(output);
  }
};

ejs._resolveInclude = ejs.resolveInclude;

const dependencies = [];

const findNode = (p, ls = dependencies) => {
  for (const node of ls) {
    if (node.path === p) { return node; }

    const tryNode = findNode(p, node.children);
    if (tryNode) { return tryNode; }
  }

  return null;
};

const isHidden = p => {
  const ua = path.parse(p);
  if (ua.name === '') { return false; }

  if (ua.name[0] === '.') { return true; }

  return isHidden(ua.dir);
};

const doAddDirActon = p => {
  if (isHidden(p)) { return; }

  if (fs.existsSync(p)) { return; }

  fs.mkdirSync(p);
};

const showDependencies = (ls = dependencies, tab = '') => {
  if (ls === dependencies) { console.log('[Mintailor] Dependencies: \n'); }

  for (const node of ls) {
    console.log(`|${tab} ${path.parse(node.path).base}${node.output ? ' -> ' + path.parse(node.output).base : ''}`);
    showDependencies(node.children, `${tab}--`);
  }

  if (ls === dependencies) { console.log(''); }
};

const doContentAction = async (src, dst) => {
  const ua = path.parse(src);

  if (ua.ext === '.ejs') {
    let node = findNode(src);

    if (node) {
      for (const child of node.children) {
        await doContentAction(child.path, child.output);
      }
    }

    if (isHidden(src) || !dst) { return; }

    const udst = path.parse(dst);
    dst = path.join(udst.dir, `${udst.name}.html`);

    if (node) {
      node.output = dst;
    } else {
      node = { path: src, children: [], output: dst };
      dependencies.push(node);
    }

    /**
     * @todo Remove include in ejs.
     */
    ejs.resolveInclude = function (name, filename, isDir) {
      const includedPath = path.resolve(isDir ? filename : path.dirname(filename), name);
      let parentNode = findNode(includedPath);
      if (!parentNode) {
        parentNode = { path: includedPath, children: [] };
        dependencies.push(parentNode);
      }

      if (parentNode.children.indexOf(node) === -1) {
        parentNode.children.push(node);
      }

      return ejs._resolveInclude(name, filename, isDir);
    };

    /**
     * @todo Render error.
     */
    const content = await ejs.renderFile(src, {}, { async: true });

    fs.writeFileSync(dst, content);
    console.log(`[Mintailor] Rendered: ${dst}`);

    showDependencies();

    return;
  }

  if (isHidden(src)) { return; }

  fs.copyFileSync(src, dst);
};

const doUnlinkDir = p => {
  /**
   * @todo Remove directory that contain ejs.
   */

  fs.rmdirSync(p, { recursive: true });
};

const doUnlink = dst => {
  /**
   * @todo Remove ejs.
   */

  if (fs.existsSync(dst)) {
    fs.rmSync(dst);
  }
};

const onChange = (action, absolutePath) => {
  const relativePath = path.relative(root, absolutePath);
  const dst = path.join(output, relativePath);

  switch (action) {
    // dir actions
    case 'addDir':
      doAddDirActon(dst);
      break;

    case 'unlinkDir':
      doUnlinkDir(dst);
      break;

    // file actions
    case 'add':
    case 'change':
      doContentAction(absolutePath, dst);
      break;

    case 'unlink':
      doUnlink(dst);
      break;

    default:
      console.log('[Mintailor] New action: ', action, absolutePath);
  }
}

;(async () => {
  if (!fs.existsSync(root)) {
    console.error('[Mintailor] Root not found');
    return;
  }

  console.log(`[Mintailor] Your are watching: ${root}`);
  console.log(`[Mintailor] Your are output: ${output}`);

  cleanOutput();

  // watch change
  chokidar.watch(root).on('all', onChange);
})();
