import checkRole from "./util/checkRole";

const CheckRole = checkRole()

const Admin = [
  {
    name: 'Dashboard',
    icon: 'fi flaticon-area-graph',
    path: '/dashboard'
  },
  {
    name: 'Banktransfer',
    icon: 'fi flaticon-withdrawal',
    children: [
      {
        name: 'Deposit',
        path: '/deposit',
        icon: 'fi flaticon-deposit-2',
      },
      {
        name: 'Withdraw',
        path: '/withdraw',
        icon: 'fi flaticon-withdrawal'
      },
      {
        name: 'Settlement',
        path: '/settlement',
        icon: 'fi flaticon-salary'
      }
    ]
  },
  {
    name: 'Credit Card',
    icon: 'flaticon-credit-card-payment',
    children: [
      {
         name: 'Merchant',
         path: '/payment/creditcard/merchant',
         icon: 'fi flaticon-play' 
       },
       {
         name: 'Test Order',
         path: '/payment/creditcard/merchant/test/order',
         icon: 'fi flaticon-play' 
       },
       {
         name: 'Transaction',
         path: '/payment/creditcard/merchant/order/report',
         icon: 'fi flaticon-play' 
       },
      ]
  },
  {
    name: 'PiPay Wallet',
    icon: 'fi flaticon-payment-method-3',
    children: [
      {
         name: 'Merchant',
         path: '/payment/pipay/merchant',
         icon: 'fi flaticon-play' 
       },
       {
         name: 'Test PiPay Order',
         path: '/payment/pipay/merchant/test/order',
         icon: 'fi flaticon-play' 
       },
       {
         name: 'Transaction',
         path: '/payment/pipay/merchant/order/report',
         icon: 'fi flaticon-play' 
       },
      ]
  },
  {
    name: 'DirePay Pament',
    icon: 'fi flaticon-payment-method-3',
    children: [
      // {
      //    name: 'Merchant',
      //    path: '/payment/direpay/merchant',
      //    icon: 'fi flaticon-play' 
      //  },
       {
         name: 'Test Direpay',
         path: '/payment/direpay/merchant/test',
         icon: 'fi flaticon-play' 
       },
      //  {
      //    name: 'Transaction',
      //    path: '/payment/pipay/merchant/order/report',
      //    icon: 'fi flaticon-play' 
      //  },
      ]
  },
  {
    name: 'Mcpayment',
    path: '/payment/mcpayment',
    icon: 'fi flaticon-payment-method-4'
  },
  {
    name: 'Customer',
    icon: 'fi flaticon-user',
    children: [
      {
        name: 'Customer',
        path: '/customer/list',
        icon: 'fi flaticon-user'
      },
      {
        name: 'Balance',
        path: '/customer/balance',
        icon: 'fi flaticon-user'
      }
    ]
  },
  {
    name: 'Agent',
    path: '/agent',
    icon: 'fi flaticon-user'
  },
  {
    name: 'AccountBank',
    path: '/accountbank',
    icon: 'fi flaticon-wallet-1'
  },
  {
    name: 'TypeBank',
    path: '/typebank',
    icon: 'fi flaticon-bank'
  },
  {
    name: 'Manager',
    path: '/manager',
    icon: 'fi flaticon-admin'
  },
  {
    name: 'Operation',
    path: '/operation',
    icon: 'fi flaticon-customer-support'
  },
  {
    name: 'Report',
    path: '/report',
    icon: 'nc-icon nc-paper'
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: 'nc-icon nc-settings'
  },
  
  // {
  //   name: 'Test',
  //   icon: 'flaticon-credit-card-payment', 
  //   children: [
  //    {
  //       name: 'Pipay Payment',
  //       path: '/test/pipay/startTransaction',
  //       icon: 'fi flaticon-play' 
  //     },
  //     {
  //       name: 'Mastercard',
  //       path: '/test/mastercard',
  //       icon: 'fi flaticon-credit-card' 
  //     },
  //     {
  //       name: 'Report',
  //       path: '/pipay/order',
  //       icon: 'fi flaticon-play' 
  //     },
  //    ]
  // },  
  {
    name: 'Logout',
    path: '/logout',
    icon: 'nc-icon nc-user-run'
  }
]

const Manager = [
  {
    name: 'Dashboard',
    icon: 'fi flaticon-area-graph',
    path: '/dashboard'
  },
  {
    name: 'Deposit',
    path: '/deposit',
    icon: 'fi flaticon-deposit-2',
  },
  {
    name: 'Withdraw',
    path: '/withdraw',
    icon: 'fi flaticon-withdrawal'
  },
  {
    name: 'Settlement',
    path: '/settlement',
    icon: 'fi flaticon-salary'
  },
  {
    name: 'Balance',
    path: '/customer/balance',
    icon: 'fi flaticon-user'
  },
  {
    name: 'AccountBank',
    path: '/accountbank',
    icon: 'fi flaticon-wallet-1'
  },
  {
    name: 'TypeBank',
    path: '/typebank',
    icon: 'fi flaticon-bank'
  },
  {
    name: 'Operation',
    path: '/operation',
    icon: 'fi flaticon-customer-support'
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: 'nc-icon nc-settings'
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: 'nc-icon nc-user-run'
  }
]

const Customer = [
  {
    name: 'Dashboard',
    icon: 'fi flaticon-area-graph',
    path: '/dashboard'
  },
  {
    name: 'Banktransfer',
    icon: 'fi flaticon-withdrawal',
    children: [
      {
        name: 'Deposit',
        path: '/deposit',
        icon: 'fi flaticon-deposit-2',
      },
      {
        name: 'Withdraw',
        path: '/withdraw',
        icon: 'fi flaticon-withdrawal'
      },
      {
        name: 'Settlement',
        path: '/settlement',
        icon: 'fi flaticon-salary'
      },
    ]
  },
  {
    name: 'Payment-MC',
    path: '/payment/mc',
    icon: 'fi flaticon-payment-method-4'
  },
  {
    name: 'TypeBank',
    path: '/typebank',
    icon: 'fi flaticon-bank'
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: 'nc-icon nc-settings'
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: 'nc-icon nc-user-run'
  }
]

const Operation = [
  {
    name: 'Deposit',
    path: '/deposit',
    icon: 'fi flaticon-deposit-2',
  },
  {
    name: 'Withdraw',
    path: '/withdraw',
    icon: 'fi flaticon-withdrawal'
  },
  {
    name: 'Balance',
    path: '/balance',
    icon: 'fi flaticon-user'
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: 'nc-icon nc-settings'
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: 'nc-icon nc-user-run'
  }
]

const Agent = [
  {
    name: 'Dashboard',
    icon: 'fi flaticon-area-graph',
    path: '/dashboard'
  },
  {
    name: 'Banktransfer',
    icon: 'fi flaticon-withdrawal',
    children: [
      {
        name: 'Deposit',
        path: '/deposit',
        icon: 'fi flaticon-deposit-2',
      },
      {
        name: 'Withdraw',
        path: '/withdraw',
        icon: 'fi flaticon-withdrawal'
      },
      {
        name: 'Settlement',
        path: '/settlement',
        icon: 'fi flaticon-salary'
      },
    ]
  },
  {
    name: 'Payment-MC',
    path: '/payment/mc',
    icon: 'fi flaticon-payment-method-4'
  },
  // {
  //   name: 'Crypto',
  //   icon: 'fi flaticon-withdrawal',
  //   children: [
  //     {
  //       name: 'Deposit',
  //       path: '/crypto/deposit',
  //       icon: 'fi flaticon-deposit-2',
  //     },
  //     {
  //       name: 'Withdraw',
  //       path: '/crypto/withdraw',
  //       icon: 'fi flaticon-withdrawal'
  //     },
  //     {
  //       name: 'Settlement',
  //       path: '/crypto/settlement',
  //       icon: 'fi flaticon-salary'
  //     }
  //   ]
  // },
  {
    name: 'Settings',
    path: '/settings',
    icon: 'nc-icon nc-settings'
  },
  {
    name: 'Logout',
    path: '/logout',
    icon: 'nc-icon nc-user-run'
  }
]

export default CheckRole.startsWith('admin')?Admin:
(CheckRole.startsWith('192') || CheckRole.startsWith('nupay')
|| CheckRole.startsWith('pliromi'))?Admin: 
CheckRole === 'admin' ? Admin : CheckRole === 'manager' ? Manager : CheckRole === 'customer' ? Customer : CheckRole === 'operation' ? Operation : CheckRole === 'agent' ? Agent : ''
