<h1 align="center">Buession Shiro</h1>
<div align="center">
  <p align="center">Typescript 或者 JavaScript 的权限验证库</p>
  <a href="https://codecov.io/github/buession/buession-shiro?branch=master">
    <img src="https://img.shields.io/codecov/c/github/buession/buession-shiro?token=NW2XVQWGPP" alt="Coverage Status" />
  </a>
  <a href="https://www.npmjs.com/package/@buession/shiro">
    <img src="https://img.shields.io/bundlephobia/minzip/@buession/shiro/latest" alt="Size" />
  </a>
  <a href="https://www.npmjs.com/package/@buession/shiro">
    <img src="https://img.shields.io/npm/v/@buession/shiro" alt="Version" />
  </a>
  <a href="https://www.npmjs.com/package/@buession/shiro">
    <img src="https://img.shields.io/github/languages/top/buession/buession-shiro" alt="Languages" />
  </a>
  <a href="https://www.npmjs.com/package/@buession/shiro">
    <img src="https://img.shields.io/npm/l/@buession/shiro" alt="License" />
  </a>
  <a href="https://github.com/buession/buession-shiro/stargazers">
    <img src="https://img.shields.io/github/stars/buession/buession-shiro" alt="Star" />
  </a>
  <a href="https://www.npmjs.com/package/buession-shiro">
    <img src="https://img.shields.io/npm/dm/@buession/shiro" alt="Download" />
  </a>
</div>

## 为什么选择 Buession Shiro

在前后端分离项目中（如：Vue、Angular、React等），前端常常涉及到根据权限显示数据、操作等等重复的实现所困惑。每当开启一个新项目时，我们都得手动重复去编写这些代码，而且还难免代码逻辑不一致，质量参差不齐。

Buession ShiroJs 旨在提供便捷的、统一的、可靠的权限前端权限验证功能。在业务开发中省去的那些“脏活累活”，专注于业务核心的开发。

Buession ShiroJs 的核心思想参考 [Apache Shiro](http://shiro.apache.org/) 。

## 安装

您可以通过 [NPM](https://www.npmjs.com/)、[YARN](https://yarnpkg.com/) 或者通过 `<script>` 的方式引入 [unpkg.com](https://unpkg.com/) 上的包。

### NPM

```sh
npm install @buession/shiro
# or
yarn add @buession/shiro
```

### CDN

> 对于生产环境，我们推荐链接到一个明确的版本号和构建文件，以避免新版本造成的不可预期的破坏。

```html
<script src="https://unpkg.com/buession-shirojs/dist/shiro.min.js" type="text/javascript"></script>
```

## 示例

```vue
<template>
  <div>
    <div v-if="shiro.hasRole('admin')">Admin</div>
    <div v-if="shiro.hasPermission('user:edit')">Edit</div>
    <div v-if="shiro.hasPermissions(['user:add', 'user:edit'])">Action</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
  },
});
</script>
```

## License

[MIT License](https://github.com/buession/buession-shirojs/blob/master/LICENSE) © 2020-2021