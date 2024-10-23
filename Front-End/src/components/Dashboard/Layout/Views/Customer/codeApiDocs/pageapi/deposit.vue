<template>
  <div>
    <h4>Deposit by Bank Transfer</h4>
    Create new deposit type bank transfer <br />
    <span class="post-text">[POST]</span> /api/v1/deposit <br /><br />
    <h4>Request data</h4>
    <table class="table-api-docs">
      <tbody>
        <tr>
          <th style="text-align: center"><strong>No</strong></th>
          <th style="text-align: center"><strong>Name</strong></th>
          <th style="text-align: center"><strong>Type</strong></th>
          <th style="text-align: center"><strong>Required</strong></th>
          <th style="text-align: center"><strong>Description</strong></th>
          <th style="text-align: center"><strong>Sample Data</strong></th>
        </tr>
        <tr>
          <td style="text-align: center">1</td>
          <td style="text-align: center">orderid</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Merchant Order Id</td>
          <td style="text-align: center">
            c3c67490-23d4-48a0-b877-4963b5a1ec1c
          </td>
        </tr>
        <tr>
          <td style="text-align: center">2</td>
          <td style="text-align: center">account</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Merchant Bank account</td>
          <td style="text-align: center">1234578690</td>
        </tr>
        <tr>
          <td style="text-align: center">3</td>
          <td style="text-align: center">price</td>
          <td style="text-align: center">Int (Number)</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Amount Number</td>
          <td style="text-align: center">
            10.00 = 1000<br />
            123.23 = 12323
          </td>
        </tr>
        <tr>
          <td style="text-align: center">4</td>
          <td style="text-align: center">from_account</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">N</td>
          <td style="text-align: center">Client bank account</td>
          <td style="text-align: center">0123456789</td>
        </tr>
        <tr>
          <td style="text-align: center">5</td>
          <td style="text-align: center">from_bank</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">N</td>
          <td style="text-align: center">Type of Bank</td>
          <td style="text-align: center">Please follow Bank Code</td>
        </tr>
        <tr>
          <td style="text-align: center">6</td>
          <td style="text-align: center">from_name</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">N</td>
          <td style="text-align: center">Client Bank Name</td>
          <td style="text-align: center">Mr.ABC</td>
        </tr>
        <tr>
          <td style="text-align: center">7</td>
          <td style="text-align: center">signature</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Secret Key encrypt</td>
          <td style="text-align: center">
            Please follow<br />
            Signature Guild
          </td>
        </tr>
        <tr>
          <td style="text-align: center">8</td>
          <td style="text-align: center">callback</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">N</td>
          <td style="text-align: center">
            Request by Mechant callback (URL)<br />
            See Docs Hook Callback
          </td>
          <td style="text-align: center">https://yourdomain.com/hookapi</td>
        </tr>
      </tbody>
    </table>
    <br /><br />
    <Deposit-code endpoint="/api/v1/deposit" :json="json" />
    <br /><br />
    <h4>Response JSON</h4>
    <div class="vscode" style="white-space: pre">
      <div><span style="color: #d4d4d4">{</span></div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">id</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"xxxx-xxxx-xxxx-xxxx"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">orderid</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"xxxxxxxxxx"</span>
      </div>
      <div><span style="color: #d4d4d4">}</span></div>
    </div>
    <br /><br />
     <h4>Response Data</h4>
    <table class="table-api-docs">
      <tbody>
        <tr>
          <th style="text-align: center">No</th>
          <th style="text-align: center">Name</th>
          <th style="text-align: center">Type</th>
          <th style="text-align: center">Description</th>
        </tr>
        <tr>
          <td style="text-align: center">1</td>
          <td style="text-align: center">id</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Merchant ID provide by Shop2pay</td>
        </tr>
        <tr>
          <td style="text-align: center">2</td>
          <td style="text-align: center">orderid</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Merchant&rsquo;s Order ID</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import DepositCode from "../deposit_code";
export default {
  components: {
    "Deposit-code": DepositCode,
  },
  data() {
    return {
      json: {
        orderid: "c3c67490-23d4-48a0-b877-4963b5a1ec1c",
        account: "1234578690",
        price: 1000,
        from_account: "0123456789",
        from_bank: "BBL",
        from_name: "Mr.ABC",
        signature: "MD5",
        callback: "https://yourdomain.com/hookapi",
      },
    };
  },
};
</script>