import checkRole from "./checkRole";

const CheckRole = checkRole()

const Admin = {
  checkauth: '/admin/checkauth',
  login: '/admin/login',
  profile: '/admin/profile',
  
  report: {
    get: '/admin/report',
    export: '/admin/report/export'
  },
  setting: {
    profile: '/admin/setting/profile',
    resetpassword: '/admin/setting/resetpassword'
  },
  mcpayment: {
    get: '/admin/mcpayment',
    total: '/admin/mcpayment/total',
    export: '/admin/mcpayment/export'
  },
  deposit: {
    add: '/admin/deposit/add',
    get: '/admin/deposit',
    log: '/admin/deposit/logs',
    update: '/admin/deposit/update',
    total: '/admin/deposit/total',
    resendcallback: '/admin/deposit/resendcallback',
    export: '/admin/deposit/export'
  },
  withdraw: {
    get: '/admin/withdraw',
    add: '/admin/withdraw/add',
    log: '/admin/withdraw/logs',
    update: '/admin/withdraw/update',
    total: '/admin/withdraw/total',
    resendcallback: '/admin/withdraw/resendcallback',
    export: '/admin/withdraw/export'
  },
  settlement: {
    get: '/admin/settlement',
    add: '/admin/settlement/add',
    log: '/admin/settlement/logs',
    update: '/admin/settlement/update',
    total: '/admin/settlement/total',
    export: '/admin/settlement/export'
  },
  select: {
    customer: '/admin/select/customer',
    account: '/admin/select/accountbank',
    bank: '/select/typebank/value',
    bank_string: '/select/typebank/string',
    agent: '/admin/select/agent',
    agent_customer: '/admin/select/agent/customer'
  },
  upload: {
    withdraw: '/upload/withdraw',
    settlement: '/upload/settlement'
  },
  customer: {
    get: '/admin/customer',
    add: '/admin/customer/add',
    deatil: '/admin/customer/detail',
    update: '/admin/customer/update',
    delete: '/admin/customer/delete',
    balance: '/admin/customer/balance',
  },
  agent: {
    get: '/admin/agent',
    add: '/admin/agent/add',
    detail: '/admin/agent/detail',
    customer: {
      add: '/admin/agent/customer/add',
      remove: '/admin/agent/customer/remove',
    },
    update: '/admin/agent/update',
    delete: '/admin/agent/delete'
  },
  accountbank: {
    get: '/admin/bank/account',
    add: '/admin/bank/account/add',
    edit: '/admin/bank/account/update',
    delete: '/admin/bank/account/delete',
    customer: {
      get: '/admin/bank/account/customer',
      add: '/admin/bank/account/customer/add',
      delete: '/admin/bank/account/customer/delete'
    }
  },
  creditcard: {
    checkout: '/creditcard/merchant/checkout',
    get: '/creditcard/merchant/getMerchants',
    getMerchantIDs: '/creditcard/merchant/getMerchantIDs',
    getOrders: '/creditcard/merchant/getOrders',
    add: '/creditcard/merchant/addMerchant',
    edit: '/creditcard/merchant/editMerchant',
    delete: '/creditcard/merchant/deleteMerchant'
  },
  pipay: {
    startTransaction: 'pipay/merchant/startTransaction',
    get: '/pipay/merchant/getMerchants',
    getMerchantIDs: '/pipay/merchant/getMerchantIDs',
    getOrders: '/pipay/merchant/getOrders',
    add: '/pipay/merchant/addMerchant',
    edit: '/pipay/merchant/editMerchant',
    delete: '/pipay/merchant/deleteMerchant'
  },
  direpay: {
    createPayment: '/direpay/merchant/createPayment',
    createPaymentApi: '/direpay/merchant/createPaymentApi',
    get: '/direpay/merchant/getMerchants',
    getMerchantIDs: '/direpay/merchant/getMerchantIDs',
    getOrders: '/direpay/merchant/getOrders',
    add: '/direpay/merchant/addMerchant',
    edit: '/direpay/merchant/editMerchant',
    delete: '/direpay/merchant/deleteMerchant'
  },
  manager: {
    get: '/admin/manager',
    add: '/admin/manager/add',
    edit: '/admin/manager/update',
    delete: '/admin/manager/delete'
  },
  operation: {
    get: '/admin/operation',
    add: '/admin/operation/add',
    edit: '/admin/operation/update',
    delete: '/admin/operation/delete'
  },
  images: {
    withdraw: '/images/withdraw',
    settlement: '/images/settlement'
  },
}

const Manager = {
  checkauth: '/manager/checkauth',
  login: '/manager/login',
  profile: '/manager/profile',
  balance: '/manager/customer/balance',
  setting: {
    profile: '/manager/setting/profile',
    resetpassword: '/manager/setting/resetpassword'
  },
  deposit: {
    get: '/manager/deposit',
    log: '/manager/deposit/logs',
    add: '/manager/deposit/add',
    update: '/manager/deposit/update',
    total: '/manager/deposit/total',
    resendcallback: '/manager/deposit/resendcallback',
    export: '/manager/deposit/export'
  },
  withdraw: {
    get: '/manager/withdraw',
    add: '/manager/withdraw/add',
    log: '/manager/withdraw/logs',
    update: '/manager/withdraw/update',
    total: '/manager/withdraw/total',
    resendcallback: '/manager/withdraw/resendcallback',
    export: '/manager/withdraw/export'
  },
  settlement: {
    get: '/manager/settlement',
    add: '/manager/settlement/add',
    log: '/manager/settlement/logs',
    update: '/manager/settlement/update',
    total: '/manager/settlement/total',
    export: '/manager/settlement/export'
  },
  select: {
    customer: '/manager/select/customer',
    account: '/manager/select/accountbank',
    bank: '/select/typebank/value',
    bank_string: '/select/typebank/string',
    agent: '/manager/select/agent'
  },
  upload: {
    withdraw: '/upload/withdraw',
    settlement: '/upload/settlement'
  },
  accountbank: {
    get: '/manager/bank/account',
    add: '/manager/bank/account/add',
    edit: '/manager/bank/account/update',
  },
  mcpayment: {
    get: '/manager/mcpayment',
    total: '/manager/mcpayment/total',
    export: '/manager/mcpayment/export'
  },
  operation: {
    get: '/manager/operation',
    add: '/manager/operation/add',
    edit: '/manager/operation/update',
    delete: '/manager/operation/delete'
  },
  images: {
    withdraw: '/images/withdraw',
    settlement: '/images/settlement'
  }
}

const Customer = {
  checkauth: '/customer/checkauth',
  login: '/customer/login',
  profile: '/customer/profile',
  accountbank: {
    get: '/customer/bank'
  },
  mcpayment: {
    get: '/customer/mcpayment',
    total: '/customer/mcpayment/total',
    export: '/customer/mcpayment/export'
  },
  select: {
    accountbank: '/customer/select/account',
    bank: '/select/typebank/value',
    bank_string: '/select/typebank/string'
  },
  setting: {
    profile: '/customer/setting/profile',
    resetpassword: '/customer/setting/resetpassword',
    webhook: '/customer/setting/webhook'
  },
  deposit: {
    add: '/customer/deposit/add',
    get: '/customer/deposit',
    total: '/customer/deposit/total',
    export: '/customer/deposit/export'
  },
  withdraw: {
    get: '/customer/withdraw',
    add: '/customer/withdraw/add',
    total: '/customer/withdraw/total',
    export: '/customer/withdraw/export'
  },
  settlement: {
    get: '/customer/settlement',
    add: '/customer/settlement/add',
    total: '/customer/settlement/total'
  },
  images: {
    withdraw: '/images/withdraw',
    settlement: '/images/settlement'
  },
  dashboard: {
    total: '/customer/dashboard/total',
    chart: '/customer/dashboard/chart',
    totalboxmonth: '/customer/dashboard/total/box/month'
  },
  mcpayment_dashboard: {
    total: '/customer/mcpayment/dashboard'
  }
}

const Operation = {
  checkauth: '/operation/checkauth',
  login: '/operation/login',
  profile: '/operation/profile',
  balance: '/operation/customer/balance',
  setting: {
    profile: '/operation/setting/profile',
    resetpassword: '/operation/setting/resetpassword'
  },
  deposit: {
    total: '/operation/deposit/total',
    get: '/operation/deposit',
    update: '/operation/deposit/update',
  },
  withdraw: {
    total: '/operation/withdraw/total',
    get: '/operation/withdraw',
    update: '/operation/withdraw/update'
  },
  settlement: {
    get: '/operation/settlement',
    update: '/operation/settlement/update',
  },
  select: {
    customer: '/operation/select/customer',
    account: '/operation/select/accountbank',
    bank: '/select/typebank/value',
    bank_string: '/select/typebank/string',
    agent: '/operation/select/agent'
  },
  images: {
    withdraw: '/images/withdraw',
    settlement: '/images/settlement'
  },
  upload: {
    withdraw: '/upload/withdraw',
    settlement: '/upload/settlement'
  }
}

const Agent = {
  checkauth: '/agent/checkauth',
  login: '/agent/login',
  profile: '/agent/profile',
  customer: {
    balance: '/agent/customer/balance'
  },
  mcpayment: {
    get: '/agent/mcpayment'
  },
  select: {
    customer: '/agent/select/customer',
    bank: '/select/typebank/value',
    bank_string: '/select/typebank/string'
  },
  setting: {
    profile: '/agent/setting/profile',
    resetpassword: '/agent/setting/resetpassword',
  },
  deposit: {
    get: '/agent/deposit',
    total: '/agent/deposit/total',
    export: '/agent/deposit/export'
  },
  withdraw: {
    get: '/agent/withdraw',
    total: '/agent/withdraw/total',
    export: '/agent/withdraw/export'
  },
  settlement: {
    get: '/agent/settlement',
    total: '/agent/settlement/total',
    export: '/agent/settlement/export'
  }
}

export default CheckRole.startsWith('admin')?Admin:
(CheckRole.toString('192')||CheckRole.startsWith('nupay')
|| CheckRole.startsWith('pliromi'))?Admin:
 CheckRole === 'admin' ? Admin : CheckRole === 'manager' ? Manager : CheckRole === 'customer' ? Customer : CheckRole === 'operation' ? Operation : CheckRole === 'agent' ? Agent : Admin
