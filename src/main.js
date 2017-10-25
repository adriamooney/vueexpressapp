// main.js

import Vue from 'vue';
import App from './App.vue';
import CreateItem from './components/CreateItem.vue';
import DisplayItem from './components/DisplayItem.vue';
import EditItem from './components/EditItem.vue';
import Test from './components/views/Test.vue';
import VueAlert from '@vuejs-pt/vue-alert';
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.use(VueAlert);
Vue.use(VueLodash, lodash);

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
    },
    {
            name: 'Test',
            path: '/test',
            component: Test
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