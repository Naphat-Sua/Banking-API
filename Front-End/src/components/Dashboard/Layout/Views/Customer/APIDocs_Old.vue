<template>
  <div>
    <h4>Api Document Version 1.1.1 (Update 26/10/2020)</h4>
    <tabs class="api-tabs" type="success">
      <tab-pane title="Get Credential Key">
        <Credential />
      </tab-pane>
      <tab-pane title="Protocol Format">
        <Protocol-Format />
      </tab-pane>
      <tab-pane title="Signature Guide">
        <Signature-Guide />
      </tab-pane>

      <tab-pane title="Api Endpoint">
        <div class="api-url-docs">
          <div>
            Development API: https://api.banktransfer.shop2pay.dev<br />
            Production API: https://api.real-pay.co <br />
            Header authorization:keyclient
          </div>
        </div>
        <tabs
          type="success"
          vertical
          verticalNavClasses="col-lg-3 col-md-5 col-sm-4 col-6"
          verticalTabContentClasses="col-lg-9 col-md-7 col-sm-8 col-6"
          class="row api-endpoint"
        >
          <tab-pane title="[POST] /api/v1/autoqrcode">
            <AutoQRCode />
          </tab-pane>

          <tab-pane title="[POST] /api/v1/deposit">
            <DepositPage />
          </tab-pane>

          <tab-pane title="[POST] /api/v1/withdraw">
            <WithdrawPage />
          </tab-pane>

          <tab-pane title="[POST] /api/v1/ama/autoqrcode">
            <AMA-AutoQRCode />
          </tab-pane>

          <tab-pane title="[GET] /api/v1/balance">
            <BalancePage />
          </tab-pane>

          <tab-pane title="[POST] /api/v1/query/deposit">
            <Query-Deposit />
          </tab-pane>

          <tab-pane title="[POST] /api/v1/query/withdraw">
            <Query-Withdraw />
          </tab-pane>
        </tabs>
      </tab-pane>

      <tab-pane title="Bank Code">
        <Bank-Code />
      </tab-pane>
      <tab-pane title="Hook Callback">
        <Hook-Callback />
      </tab-pane>
    </tabs>
  </div>
</template>

<script>
import {
  Credential,
  Protocol_Format,
  Signature_Guide,
  bank_code,
  AutoQRCode,
  DepositPage,
  WithdrawPage,
  AMAAutoQRCode,
  BalancePage,
  querydeposit,
  querywithdraw,
  HookCallback,
} from "./codeApiDocs";
export default {
  name: "APIDocs",
  components: {
    Credential,
    "Protocol-Format": Protocol_Format,
    "Signature-Guide": Signature_Guide,
    "Bank-Code": bank_code,
    AutoQRCode,
    DepositPage,
    WithdrawPage,
    "AMA-AutoQRCode": AMAAutoQRCode,
    BalancePage,
    "Query-Deposit": querydeposit,
    "Query-Withdraw": querywithdraw,
    "Hook-Callback": HookCallback,
  },
};
</script>

<style lang="scss">
.api-url-docs {
  position: absolute;
  right: 60px;
  z-index: 1;
  div {
    color: #d4d4d4;
    background-color: #1e1e1e;
    font-family: "Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
      monospace;
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5em;
    padding: 1em;
    border-radius: 0.5em;
    overflow: auto;
    display: inline-block;
    text-align: end;
  }
}
.vscode {
  color: #d4d4d4;
  background-color: #1e1e1e;
  font-family: "Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
    monospace;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5em;
  white-space: pre;
  padding: 1em;
  margin: 1em 0 0.2em;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px;
  border-radius: 0.5em;
  overflow: auto;
  text-indent: 20px;
  .vscode-space {
    width: 4px;
    display: inline-block;
  }
}
.api-tabs {
  .text-indent {
    text-indent: 20px;
  }
  .tab-content {
    color: black;
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5em;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px;
  }
  .nav-tabs-wrapper {
    margin-bottom: 0px !important;
  }
  .nav-item {
    a {
      padding-bottom: 1rem !important;
      &::before {
        border: 0px !important;
      }
      &::after {
        border: 0px !important;
      }
    }
    .nav-link.active {
      color: white !important;
    }
    .nav-link {
      color: black;
    }
    div {
      font-weight: bold;
    }
  }
  .api-endpoint {
    .tab-content {
      color: black;
      padding: 0;
      border-radius: 0.5em;
      box-shadow: none;
    }
    .nav-item {
      .nav-link.active {
        color: white !important;
      }
      .nav-link {
        color: black;
      }
      div {
        text-align: start;
        font-weight: bold;
      }
    }
  }
}
.table-api-docs {
  font-family: "Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono",
    monospace;
  border-radius: 0.5em;
  border-collapse: collapse;
  width: 100%;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 20px;
  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #6bd098 !important;
    color: white;
  }
}
.post-text {
  color: #ff9900;
  font-weight: bold;
}
.get-text {
  color: #67c23a;
  font-weight: bold;
}
</style>
