import "core-js/stable";

import Vue from 'vue'
import App from './App'
import router from './router'
import VueAnalytics from 'vue-analytics'

import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'
import VueClipboard from 'vue-clipboard2'
import vSelect from 'vue-select'

// SW
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

// Vue
Vue.config.productionTip = false;

Vue.use(VueAnalytics, {id: 'UA-63186771-9', router});
Vue.use(VModal, {dynamic: true, dialog: true});
Vue.use(Notifications);
Vue.use(VueClipboard);

Vue.component('v-select', vSelect);

new Vue({
    router,
    el: '#app',
    components: {App},
    template: '<App/>'
});