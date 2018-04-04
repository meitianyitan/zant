// using with vue-i18n in CDN
/*eslint-disable */
import Vue from 'vue';
const isServer = Vue.prototype.$isServer;

export default function (lang) {
  if (!isServer) {
    if (typeof window['zant'] !== 'undefined') {
      if (!('langs' in window['zant'])) {
        window['zant'].langs = {};
      }
      window['zant'].langs[lang.i.locale] = lang;
    }
  }
};
/*eslint-enable */