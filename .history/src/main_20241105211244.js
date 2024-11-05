/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCircleExclamation,
    faEllipsis,
    faEnvelope,
    faEthernet,
    faGear,
    faGears,
    faHatWizard,
    faKey,
    faPerson,
    faPhone,
    faPhoneFlip,
    faPlus,
    faScaleBalanced,
    faSquarePhone,
    faSquarePhoneFlip,
    faTowerCell,
    faUser,
    faUserCheck,
    faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { JsonForms } from '@jsonforms/vue'
import '@jsonforms/vue-vanilla/vanilla.css'
import Aura from '@primevue/themes/aura'
import { createPinia } from 'pinia'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import PrimeVue from 'primevue/config'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Drawer from 'primevue/drawer'
import IconField from 'primevue/iconfield'
import Image from 'primevue/image'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import MultiSelect from 'primevue/multiselect'
import Ripple from 'primevue/ripple'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'
import Tab from 'primevue/tab'
import TabList from 'primevue/tablist'
import TabPanel from 'primevue/tabpanel'
import TabPanels from 'primevue/tabpanels'
import Tabs from 'primevue/tabs'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ToggleSwitch from 'primevue/toggleswitch'
import Toolbar from 'primevue/toolbar'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/styles'
import App from './App.vue'
import i18n from './i18n'
import './input.css'
import router from './router'


//fontawesome-icons
library.add(
    faHatWizard,
    faEnvelope,
    faPerson,
    faKey,
    faUsers,
    faUserCheck,
    faTowerCell,
    faEllipsis,
    faPlus,
    faUser,
    faGear,
    faGears,
    faPhone,
    faPhoneFlip,
    faSquarePhone,
    faSquarePhoneFlip,
    faEthernet,
    faScaleBalanced,
    faCircleExclamation
)

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
