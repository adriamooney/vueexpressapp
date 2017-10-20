// main.js

import Vue from 'vue';
import App from './App.vue';
import CreateItem from './components/CreateItem.vue';
import DisplayItem from './components/DisplayItem.vue';
import EditItem from './components/EditItem.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

const routes = [
  {
        name: 'CreateItem',
        path: '/create/item',
        component: CreateItem
    },
    {
          name: 'DisplayItem',
          path: '/',
          component: DisplayItem
    },
    {
            name: 'EditItem',
            path: '/edit/:id',
            component: EditItem
    }
];

const router = new VueRouter({ mode: 'history', routes});

//this doesn't work.  not sure what this is
// new Vue(Vue.util.extend({ router })).$mount('#app');

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})