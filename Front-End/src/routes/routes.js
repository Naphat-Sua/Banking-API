import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

import checkRole from "../util/checkRole";

const CheckRole = checkRole()

const Admin = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard/Views/Admin/Dashboard')
  },
  {
    path: 'manager',
    name: 'Manager',
    component: () => import('../components/Dashboard/Views/Admin/Manager')
  },
  {
    path: 'operation',
    name: 'Operation',
    component: () => import('../components/Dashboard/Views/Admin/Operation')
  },
  {
    path: 'customer',
    name: 'Customer',
    redirect: '/customer/list'
  },
  {
    path: 'customer/list',
    name: 'ListCustomer',
    component: () => import('../components/Dashboard/Views/Admin/Customer')
  },
  {
    path: 'customer/balance',
    name: 'CustomerBalance',
    component: () => import('../components/Dashboard/Views/Admin/CustomerBalance')
  },
  {
    path: 'deposit',
    name: 'Deposit',
    component: () => import('../components/Dashboard/Views/Admin/Deposit')
  },
  {
    path: 'withdraw',
    name: 'Withdraw',
    component: () => import('../components/Dashboard/Views/Admin/Withdraw')
  },
  {
    path: 'settlement',
    name: 'Settlement',
    component: () => import('../components/Dashboard/Views/Admin/Settlement')
  },
  {
    path: 'agent',
    name: 'Agent',
    component: () => import('../components/Dashboard/Views/Admin/Agent')
  },
  {
    path: 'accountbank',
    name: 'AccountBank',
    component: () => import('../components/Dashboard/Views/Admin/AccountBank')
  },
  {
    path: 'typebank',
    name: 'TypeBank',
    component: () => import('../components/CustomComponent/TypeBank')
  },
  {
    path: 'settings',
    name: 'Settings',
    component: () => import('../components/CustomComponent/Settings')
  },
  {
    path: 'report',
    name: 'Report',
    component: () => import('../components/Dashboard/Views/Admin/Report')
  },
  {
    path: 'payment/mcpayment',
    name: 'Payment_Mcpayment',
    component: () => import('../components/Dashboard/Views/Admin/Mcpayment')
  },
  {
    path: 'payment/creditcard/merchant',
    name: 'PaymentCreditcard',
    component: () => import('../components/Dashboard/Views/Admin/CreditCard')
  },
  {
    path: 'payment/creditcard/merchant/test/order',
    name: 'TestOrder',
    component: () => import('../components/Dashboard/Views/Admin/Test/TestCredit')
  },
  {
    path: 'payment/creditcard/merchant/order/report',
    name: 'Transaction_CreditCard',
    component: () => import('../components/Dashboard/Views/Admin/ReportOrder')
  },
  {
    path: 'payment/pipay/merchant',
    name: 'PaymentPiPay',
    component: () => import('../components/Dashboard/Views/Admin/PiPayWallet')
  },
  {
    path: 'payment/pipay/merchant/test/order',
    name: 'TestOrder',
    component: () => import('../components/Dashboard/Views/Admin/Test/TestPiPay')
  },
  {
    path: 'payment/pipay/merchant/order/report',
    name: 'Transaction_PiPay',
    component: () => import('../components/Dashboard/Views/Admin/ReportOrderPiPay')
  },
  {
    path: 'payment/direpay/merchant',
    name: 'PaymentDirePay',
    component: () => import('../components/Dashboard/Views/Admin/DirePay')
  },
  {
    path: 'payment/direpay/merchant/test',
    name: 'TestPaymentDirePay',
    component: () => import('../components/Dashboard/Views/Admin/Test/TestDirePay')
  },
  // {
  //   path: 'payment/direpay/merchant/report',
  //   name: 'Transaction_DirePay',
  //   component: () => import('../components/Dashboard/Views/Admin/DirePayTransaction')
  // },
  // {
  //   path: 'test/mastercard',
  //   name: 'TestMastercard',
  //   component: () => import('../components/Dashboard/Views/Test/Testmastercard')
  // },
  // {
  //   path: 'test/pipay/startTransaction',
  //   name: 'PipayStartTransaction',
  //   component: () => import('../components/Dashboard/Views/Test/TestPiPay')
  // },
  // {
  //   path: 'pipay/order',
  //   name: 'PipayOrder',
  //   component: () => import('../components/Dashboard/Views/Test/ReportOrder')
  // },
  // {
  //   path: 'pipay/cancelPaymentPipay',
  //   name: 'PipayStartTransaction',
  //   component: () => import('../components/Dashboard/Views/Test/TestPiPay')
  // },
  // {
  //   path: 'pipay/confirmPaymentPipay',
  //   name: 'PipayStartTransaction',
  //   component: () => import('../components/Dashboard/Views/Test/TestPiPay')
  // },
  // {
  //   path: 'test/pipay/checkout',
  //   name: 'PiPay Payment',
  //   component: () => import('../components/Dashboard/Views/Test/TestPiPayCMS')
  // },
]


const Manager = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard/Views/Manager/Dashboard')
  },
  {
    path: 'operation',
    name: 'Operation',
    component: () => import('../components/Dashboard/Views/Manager/Operation')
  },
  {
    path: 'deposit',
    name: 'Deposit',
    component: () => import('../components/Dashboard/Views/Manager/Deposit')
  },
  {
    path: 'withdraw',
    name: 'Withdraw',
    component: () => import('../components/Dashboard/Views/Manager/Withdraw')
  },
  {
    path: 'settlement',
    name: 'Settlement',
    component: () => import('../components/Dashboard/Views/Manager/Settlement')
  },
  {
    path: 'customer/balance',
    name: 'CustomerBalance',
    component: () => import('../components/Dashboard/Views/Manager/CustomerBalance')
  },
  {
    path: 'accountbank',
    name: 'AccountBank',
    component: () => import('../components/Dashboard/Views/Manager/AccountBank')
  },
  {
    path: 'typebank',
    name: 'TypeBank',
    component: () => import('../components/CustomComponent/TypeBank')
  },
  {
    path: 'settings',
    name: 'Settings',
    component: () => import('../components/CustomComponent/Settings')
  }
]

const Customer = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard/Views/Customer/Dashboard')
  },
  {
    path: 'deposit',
    name: 'Deposit',
    component: () => import('../components/Dashboard/Views/Customer/Deposit')
  },
  {
    path: 'withdraw',
    name: 'Withdraw',
    component: () => import('../components/Dashboard/Views/Customer/Withdraw')
  },
  {
    path: 'settlement',
    name: 'Settlement',
    component: () => import('../components/Dashboard/Views/Customer/Settlement')
  },
  {
    path: 'typebank',
    name: 'TypeBank',
    component: () => import('../components/CustomComponent/TypeBank')
  },
  {
    path: 'settings',
    name: 'Settings',
    component: () => import('../components/CustomComponent/Settings')
  },
  {
    path: 'payment/mc',
    name: 'Payment_Mcpayment',
    component: () => import('../components/Dashboard/Views/Customer/Mcpayment')
  },
  // {
  //   path: 'apidocs/old',
  //   name: 'ApiDocs',
  //   component: () => import('../components/Dashboard/Views/Customer/APIDocs_Old')
  // },
  // {
  //   path: 'apidocs',
  //   name: 'APIDocs',
  //   component: () => import('../components/Dashboard/Views/Customer/APIDocs')
  // }
]

const Operation = [
  {
    path: 'deposit',
    name: 'Deposit',
    component: () => import('../components/Dashboard/Views/Opertaion/Deposit')
  },
  {
    path: 'withdraw',
    name: 'Withdraw',
    component: () => import('../components/Dashboard/Views/Opertaion/Withdraw')
  },
  {
    path: 'balance',
    namee: 'CustomerBalance',
    component: () => import('../components/Dashboard/Views/Opertaion/Balance')
  },
  {
    path: 'settlement',
    name: 'Settlement',
    component: () => import('../components/Dashboard/Views/Opertaion/Settlement')
  },
  {
    path: 'settings',
    name: 'Settings',
    component: () => import('../components/CustomComponent/Settings')
  }
]

const Agent = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard/Views/Agent/Dashboard')
  },
  {
    path: 'deposit',
    name: 'Deposit',
    component: () => import('../components/Dashboard/Views/Agent/Deposit')
  },
  {
    path: 'withdraw',
    name: 'Withdraw',
    component: () => import('../components/Dashboard/Views/Agent/Withdraw')
  },
  {
    path: 'settlement',
    name: 'Settlement',
    component: () => import('../components/Dashboard/Views/Agent/Settlement')
  },
  {
    path: 'settings',
    name: 'Settings',
    component: () => import('../components/CustomComponent/Settings')
  },
  {
    path: 'payment/mc',
    name: 'Payment_Mcpayment',
    component: () => import('../components/Dashboard/Views/Agent/Mcpayment')
  }
]

const ComponenetByRole = CheckRole.startsWith('admin')?Admin:
(CheckRole.startsWith('192')||CheckRole.startsWith('nupay')
|| CheckRole.startsWith('pliromi'))?Admin: 
CheckRole === 'admin' ? Admin : CheckRole === 'manager' ? Manager : CheckRole === 'customer' ? Customer : CheckRole === 'operation' ? Operation : CheckRole === 'agent' ? Agent : ''

const Views = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: CheckRole !== 'operation' ? '/dashboard' : '/deposit',
    children: ComponenetByRole
  },
  {path: '/login', component: () => import('../components/Dashboard/Views/Pages/Login')},
  {path: '/logout', component: () => import('../components/Dashboard/Views/Pages/Logout')},
  {path: '*', component: NotFound}
]

export default Views
