import Vue from 'vue'
import VueMeta from 'vue-meta'
import PortalVue from 'portal-vue'
import { InertiaApp } from '@inertiajs/inertia-vue'
import { InertiaProgress } from '@inertiajs/progress/src'
//import swal from 'vue-sweetalert2';
import swal from "sweetalert2/dist/sweetalert2"
window.swal = swal;
import 'sweetalert2/dist/sweetalert2.min.css'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import moment from 'moment'
import Notifications from 'vue-notification'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

import pluralize from 'pluralize'
import VueCookies from 'vue-cookies'

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { mainnet, polygon, polygonMumbai } from '@wagmi/core/chains'

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.mixin({ methods: { route: window.route } })
Vue.use(InertiaApp)
Vue.use(PortalVue)
Vue.use(VueMeta)
Vue.use(require('vue-moment'))
Vue.use(Viewer)
Vue.component('datetime', Datetime)
Vue.use(Notifications)
Vue.use(VueLodash, { lodash: lodash })
Vue.use(VueCookies)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
//import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

import {Tabs, Tab} from 'vue-tabs-component';
Vue.component('tabs', Tabs);
Vue.component('tab', Tab);

window.Common = require('./Custom/Common')

InertiaProgress.init()

let app = document.getElementById('app')

/*@ Component will be used to dynamic the colors in Layout.vue */
Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
});

Vue.filter('formatDate', function (value) {
  if (!value) return ''

  return moment(value).format('MM/DD/YYYY')
})

Vue.filter('formatDateAndTime', function (value) {
  if (!value) return ''

  return moment(value).format('MM/DD/YYYY hh:mm a')
})

Vue.filter('phone', function (value) {
  if (!value) return ''
  return value.replace(/(0)(\d{5})(\d{5}|\d{6})/, '($1)-$2-$3')
})

Vue.filter('trimString', function (value, size) {
  if (!value) return '';
  value = value.toString();

  if (value.length <= size) {
    return value;
  }
  return value.substr(0, size) + '...';
})
Vue.filter('currency', function (value) {
  if (!value) {
    value = 0
  }
  if (typeof value !== "number") {
    value = parseFloat(value)
  }
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
  });
  return formatter.format(value);
});

import axios from "axios";
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
};

import NProgress from "nprogress";

Vue.mixin({
  methods: {
    async loadWeb3Modal(id) {      
      const chains = [polygon]
      const projectId = id

      const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
      const wagmiConfig = createConfig({
        autoConnect: false,
        connectors: w3mConnectors({ projectId, chains }),
        publicClient
      })
      const ethereumClient = new EthereumClient(wagmiConfig, chains)
      const web3Modal = new Web3Modal({ projectId }, ethereumClient)

      return web3Modal
    },
    toSingle(value) {
      return pluralize.singular(value)
    },
    toPlural(value) {
      return pluralize.plural(value)
    },
    capitalizeFirstLetter (string) {
      if (!string) {
        return
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    copy(address) {
      var oInput = document.createElement("input");
      oInput.value = address.trim();
      document.body.appendChild(oInput);
      oInput.select(); // select the object
      oInput.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand("Copy"); // Execute the browser copy command

      window.Common.default.alertPopup({
        text: 'Text copied',
        type: "success",
        toast: true,
        timer: 3000,
        position: "top-end",
        timerProgressBar: true,
        showCancel: false,
        showConfirm: false,
      });
    },
  }
})

new Vue({
  metaInfo: {
    titleTemplate: (title) => title ? `${title} - VaccinationManagementDAO` : 'VaccinationManagementDAO'
  },
  render: h => h(InertiaApp, {
    props: {
      initialPage: JSON.parse(app.dataset.page),
      resolveComponent: name => import(`@/Pages/${name}`).then(module => module.default),
    },
  }),
}).$mount(app)
