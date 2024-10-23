import {
  Badge,
  Button,
  Card,
  Checkbox,
  Collapse,
  CollapseItem,
  Dropdown,
  FgInput,
  Modal,
  Pagination,
  Radio,
  StatsCard,
  TabPane,
  Tabs,
  Switch
} from 'src/components/UIComponents';
import {DatePicker, Image, Loading, Option, Select, Table, TableColumn, TimeSelect, Upload} from 'element-ui'
import VueNotify from 'vue-notifyjs'
import {ValidationObserver, ValidationProvider} from "vee-validate";
import {
  AccountBank,
  AddAccountBank,
  AddDeposit,
  AddWithdraw,
  Deposit,
  LogOrder,
  SearchAgent,
  SearchDeposit,
  SearchWithdraw,
  TotalAmount,
  Withdraw,
  AddOrderMastercard
} from 'src/components/CustomComponent'

/**
 * You can register global components here and use them as a plugin in your main Vue instance
 * Ideally, only small components that are re-used many times across your application should be registered here.
 * For plugins and bigger components local registration is preferable because it will allow you to do code splitting easier :)
 */
const GlobalComponents = {
  install(Vue) {
    Vue.component(Tabs.name, Tabs)
    Vue.component(TabPane.name, TabPane)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(DatePicker)
    Vue.use(TimeSelect)
    Vue.use(Image)
    Vue.use(Upload)
    Vue.use(VueNotify, {
      horizontalAlign: 'right',
      verticalAlign: 'top',
      showClose: true,
      closeOnClick: true,
      timeout: 3000
    })
    Vue.use(Loading.directive);
    Vue.prototype.$loading = Loading.service;
    Vue.component(AddAccountBank.name, AddAccountBank)
    Vue.component(AccountBank.name, AccountBank)
    Vue.component(AddDeposit.name, AddDeposit)
    Vue.component(AddWithdraw.name, AddWithdraw)
    Vue.component(Deposit.name, Deposit)
    Vue.component(Withdraw.name, Withdraw)
    Vue.component(TotalAmount.name, TotalAmount)
    Vue.component(SearchWithdraw.name, SearchWithdraw)
    Vue.component(SearchDeposit.name, SearchDeposit)
    Vue.component(AddOrderMastercard.name, AddOrderMastercard)
    Vue.component(SearchAgent.name, SearchAgent)
    Vue.component(LogOrder.name, LogOrder)
    Vue.component(Modal.name, Modal)
    Vue.component(FgInput.name, FgInput)
    Vue.component(Dropdown.name, Dropdown)
    Vue.component(Checkbox.name, Checkbox)
    Vue.component(Radio.name, Radio)
    Vue.component(Button.name, Button)
    Vue.component(Card.name, Card)
    Vue.component(StatsCard.name, StatsCard)
    Vue.component(Badge.name, Badge)
    Vue.component(Pagination.name, Pagination)
    Vue.component(Collapse.name, Collapse)
    Vue.component(CollapseItem.name, CollapseItem)
    Vue.component(Switch.name, Switch)
    Vue.component("ValidationProvider", ValidationProvider);
    Vue.component("ValidationObserver", ValidationObserver);
  }
}

export default GlobalComponents
