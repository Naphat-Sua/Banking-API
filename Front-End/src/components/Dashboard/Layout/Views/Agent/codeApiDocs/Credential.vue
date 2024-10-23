<template>
    <div class="row">
        <div class="col-6">
          <h4>Introduction</h4>
          <p class="text-indent">
            Instalment Gateway is a unified service for centralized interface
            with<br />
            merchants. So merchants integrate to this system only, then the
            system will connect<br />
            to each merchant issuer system. As a payment service provider,
            Shop2pay will<br />
            connect merchandise websites of the merchants by api<br />
            Our Api are made up of two main parts. (Deposit / Withdrawal)<br />
          </p>

          Deposit<br />
          <p class="text-indent">
            QR Code : Deposit money by QR Code system via promptpay system, this
            system<br />
            will request an api from merchant, then shop2pay will send a link
            that is QR images<br />
            back to for customers to transfer money.<br />
          </p>
          <p class="text-indent">
            Bank Transfer : The normal system deposit is Bank Transfer, this
            system Merchant<br />
            Request api comes in, the system will send the account number back
            to you. The<br />
            customer will have to use the normal money transfer to make the
            transfer himself.<br />
          </p>

          Withdrawals<br />
          <p class="text-indent">
            Shop2pay offers Merchant withdrawal requests via API and will have
            an Operation<br />
            to send a callback status back to each request.<br />
            For security system has Two of secure solution<br />
          </p>

          1. A signature requires every request transaction. (request secret
          key)<br />
          2. Normal without signature in transactions.
        </div>
        <div class="col-6">
          <h4>How to get credential key.</h4>
          All The information for new User integration. Send to client email
          when you register.
          <br /><br />
          API Doc: https://api.real-pay.co/docs/api<br />
          Key:xxxxxxxxx<br />
          SecertKey:xxxxxxxxx
        </div>
      </div>
</template>