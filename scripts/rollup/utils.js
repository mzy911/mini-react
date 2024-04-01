import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

// 获取源文件、打包后的文件
export function resolvePkgPath(pkgName, isDist) {
  if (isDist) {
    return `${distPath}/${pkgName}`;
  }
  return `${pkgPath}/${pkgName}`;
}

// 获取包的配置文件
export function getPackageJSON(pkgName) {
  // ...包路径
  const path = `${resolvePkgPath(pkgName)}/package.json`;
  const str = fs.readFileSync(path, { encoding: 'utf-8' });
  return JSON.parse(str);
}

// 获取公共的plugin：
export function getBaseRollupPlugins({
  alias = {
    __DEV__: true,
    preventAssignment: true
  },
  typescript = {}
} = {}) {
  // replace：
  // cjs：解析 commonJs 的 plugin
  // ts：将源码中的 ts 转为 js 的 plugin
  return [replace(alias), cjs(), ts(typescript)];
}
