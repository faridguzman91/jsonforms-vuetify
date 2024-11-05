/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faKey,
    faEllipsis,
    faEnvelope,
    faHatWizard,
    faPerson,
    faPlus,
    faTowerCell,
    faUsers,
    faUser,
    faGear,
    faGears,
    faPhone,
    faSquarePhone,
    faCircleExclamation,
    faUserCheck,
    faEthernet,
    faSquarePhoneFlip,
    faScaleBalanced,
    faPhoneFlip,
} from '@fortawesome/free-solid-svg-icons'
import i18n from './i18n'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import './input.css'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import Drawer from 'primevue/drawer'
import InputText from 'primevue/inputtext'
import SelectButton from 'primevue/selectbutton'
import MultiSelect from 'primevue/multiselect'
import Checkbox from 'primevue/checkbox'
import Tag from 'primevue/tag'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Select from 'primevue/select'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import Image from 'primevue/image'
import App from './App.vue'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Ripple from 'primevue/ripple'
import ToggleSwitch from 'primevue/toggleswitch'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'
import router from './router'
import { createVuetify } from 'vuetify'
import './jsonforms-styles.css'
import 'vuetify/dist/vuetify.min.css';
import { JsonForms } from '@jsonforms/vue';
import 'vuetify/styles'
import '@jsonforms/vue-vanilla/vanilla.css';


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

const vuetify = createVuetify()
const app = createApp(App)
app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: '.my-app-dark',
                cssLayer: false
            }
        },
        ripple: true
    })
    .use(createPinia())
    .use(router)
    .use(ToastService)
    .use(i18n)
    .use(vuetify)
    .directive('ripple', Ripple)
    .component('JsonForms', JsonForms)
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('IconField', IconField)
    .component('Divider', Divider)
    .component('DataTable', DataTable)
    .component('Tabs', Tabs)
    .component('TabList', TabList)
    .component('Tab', Tab)
    .component('TabPanel', TabPanel)
    .component('TabPanels', TabPanels)
    .component('Column', Column)
    .component('Drawer', Drawer)
    .component('Dialog', Dialog)
    .component('Image', Image)
    .component('Tag', Tag)
    .component('Toolbar', Toolbar)
    .component('Button', Button)
    .component('Select', Select)
    .component('MultiSelect', MultiSelect)
    .component('Checkbox', Checkbox)
    .component('SelectButton', SelectButton)
    .component('ToggleSwitch', ToggleSwitch)
    .component('InputText', InputText)
    .component('InputIcon', InputIcon)
    .component('Toast', Toast)
    .mount('#app')

export function registerPlugins(app) {
    app
        .use(vuetify)
        .use(router)
        .use(pinia)
}
