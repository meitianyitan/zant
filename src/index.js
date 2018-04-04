import Affix from './components/affix';
import Button from './components/button';
import Icon from './components/icon';
import locale from './locale/index';

const components = {
  Affix,
  Button,
  Icon
};

const zant = {
  ...components
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  Object.keys(zant).forEach(key => {
    Vue.component(key, zant[key]);
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const API = {
  version: process.env.VERSION, // eslint-disable-line no-undef
  locale: locale.use,
  install,
  ...components
};

API.lang = (code) => {
  const langObject = window['zant/locale'].default;
  if (code === langObject.i.locale) locale.use(langObject);
  else console.log(`The ${code} language pack is not loaded.`);
}

module.exports.default = module.exports = API;