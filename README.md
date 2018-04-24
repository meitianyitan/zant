# zant

A Vue.js 2.0 UI Toolkit for Web.

[中文 README](./README-zh_CN.md)

## Install

```bash
npm install zant --save
```

## Import zant 

You can import zant entirely, or just import what you need. Let's start with fully import.

### Fully import
import zant in the entry file (main.js as usual) of webpack:

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'components/app.vue';
import Routers from './router.js';
import Zant from 'zant'; // imports zant entirely
import 'zant/dist/zant.css'; // imports zant entirely. Note that CSS file needs to be imported separately.

Vue.use(VueRouter);
Vue.use(Zant);

// The routing configuration
const RouterConfig = {
  routes: Routers
};

const router = new VueRouter(RouterConfig);

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
```

The above imports zant entirely. Note that CSS file needs to be imported separately.

## Import on demand(Recommended)

With the help of [babel-plugin-import](https://github.com/ant-design/babel-plugin-import), we can import components we actually need, making the project smaller than otherwise.

First, install babel-plugin-component:

```bash
npm install babel-plugin-import --save-dev
```

Edit .babelrc to integrate babel-plugin-import.

```bash
{
  "plugins": [
    ["import", { "libraryName": "zant", "libraryDirectory": "src/components", "style": true }]
  ]
}
```

Since component styles are written in less, you need to install less and less-loader, which helps to customize the theme.

```bash
npm install less less-loader --save-dev
```

Finally, you only need to import modules from zant, so you don't need to introduce styles separately.

```js
// babel-plugin-import will help you to load JS and CSS
import { Affix } from 'zant';
```

The above way is equivalent to the manual way introduced below.

```js
import Affix from 'zant/src/components/affix';  // load JS
import 'zant/src/components/affix/style';        // load LESS
```
