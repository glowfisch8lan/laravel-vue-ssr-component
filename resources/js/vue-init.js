import Vue from 'vue';
import Vuex from 'vuex'
import storeData from "./store/index"
import http from './http';

Vue.use(Vuex)
Vue.component('course-right-banner', require('./vue/courses/Banner').default);

Vue.prototype.$http = http;
Vue.prototype.$store = new Vuex.Store(
    storeData
);

export default Vue;
