import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import authMixin from './store/index';
import store from './store/store';
import axios from 'axios';

createApp(App)
    .use(store)
    .use(authMixin)
    .use(router)
    .mount('#app');


const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}