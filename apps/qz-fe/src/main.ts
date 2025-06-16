import './assets/css/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { setupStore } from './stores';

import icons from './global/register-icons';
import { registerGlobalComponents } from '@/components';
import './permission';
const app = createApp(App);

app.use(icons);
app.use(router);
setupStore(app);
registerGlobalComponents(app);
app.mount('#app');
