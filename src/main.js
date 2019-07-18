import Vue from 'vue'

import router from './router'
import store from './store'
import axios from 'axios'
import interceptors from './api/util/AxiosInterceptors';

import VueNotification from 'vue-notification'

//Custom Elements
import Loading from './elements/Loading.vue'
import LoadingButton from './elements/LoadingButton'
import Modal from './elements/Modal'
import ConfirmModal from './elements/ConfirmModal'
import Timestamp from './elements/Timestamp'
import Number from './elements/Number'
import Money from './elements/Money'
import DropdownButton from './elements/DropdownButton'
import DropdownSelection from './elements/DropdownSelection'
import PluralWord from './elements/PluralWord';
import OxfordCommaList from './elements/OxfordCommaList';
import DocumentTitle from './components/DocumentTitle';

// Register Custom Elements
Vue.component('loading', Loading);
Vue.component('loading-button', LoadingButton);
Vue.component('modal', Modal);
Vue.component('confirm-modal', ConfirmModal);
Vue.component('timestamp', Timestamp);
Vue.component('number', Number);
Vue.component('money', Money);
Vue.component('dropdown-button', DropdownButton);
Vue.component('dropdown-selection', DropdownSelection);
Vue.component('plural-word', PluralWord);
Vue.component('oxford-comma-list', OxfordCommaList);
Vue.component('DocumentTitle', DocumentTitle);

//Custom Layouts
import AppLayout from './layouts/AppLayout'
import NoLayout from './layouts/NoLayout'

// Register Custom Layouts
Vue.component('AppLayout', AppLayout);
Vue.component('NoLayout', NoLayout);

import App from './App.vue'

Vue.config.productionTip = false;

Vue.use(VueNotification);

axios.interceptors.response.use(interceptors.success, interceptors.error);

new Vue({
  router,
  store,
  render : h => h(App)
}).$mount('#app')
