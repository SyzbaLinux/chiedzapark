import './bootstrap';
import '../css/app.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { createApp, h } from 'vue';
import {createInertiaApp, Head, Link} from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import vuetify from './plugins/vuetify.js'

const appName = import.meta.env.VITE_APP_NAME;

const options = {
    confirmButtonColor: '#14750c',
    cancelButtonColor: '#a8110f',
    denyButtonColor:'#a8110f',
};


import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(vuetify)
            .use(VueSweetalert2, options)
            .component('InertiaLink',Link)
            .component('Head',Head)
            .component('DatePickerEs', DatePicker)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
        showSpinner: true,
    },
});
