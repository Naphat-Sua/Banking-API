<template>
  <div>
    <h4>Create Withdraw</h4>
    Create new withdraw <br />
    <span class="post-text">[POST]</span> /api/v1/withdraw <br /><br />
    <h4>Request data</h4>
    <table class="table-api-docs">
      <tbody>
        <tr>
          <th style="text-align: center">No</th>
          <th style="text-align: center">Name</th>
          <th style="text-align: center">Type</th>
          <th style="text-align: center">Required</th>
          <th style="text-align: center">Description</th>
          <th style="text-align: center">Sample Data</th>
        </tr>
        <tr>
          <td style="text-align: center">1</td>
          <td style="text-align: center">orderid</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Merchant Order ID</td>
          <td style="text-align: center">&nbsp;</td>
        </tr>
        <tr>
          <td style="text-align: center">2</td>
          <td style="text-align: center">price</td>
          <td style="text-align: center">Int (Number)</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Withdraw Amount</td>
          <td style="text-align: center">
            10.00 = 1000<br />
            123.23 = 12323
          </td>
        </tr>
        <tr>
          <td style="text-align: center">3</td>
          <td style="text-align: center">account</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">
            Client Account<br />
            Number
          </td>
          <td style="text-align: center">01234567890</td>
        </tr>
        <tr>
          <td style="text-align: center">4</td>
          <td style="text-align: center">callback</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">N</td>
          <td style="text-align: center">
            Request by Mechant<br />
            callback (URL)
          </td>
          <td style="text-align: center">https://yourdomain.com/hookapi</td>
        </tr>
        <tr>
          <td style="text-align: center">5</td>
          <td style="text-align: center">to_banking</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Type of Bank</td>
          <td style="text-align: center">Please follow Bank Code</td>
        </tr>
        <tr>
          <td style="text-align: center">6</td>
          <td style="text-align: center">name</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Client Name</td>
          <td style="text-align: center">Mr.ABC</td>
        </tr>
        <tr>
          <td style="text-align: center">7</td>
          <td style="text-align: center">signature</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Signature (if have)</td>
          <td style="text-align: center">MD5</td>
        </tr>
      </tbody>
    </table>
    <br /><br />
    <Deposit-code endpoint="/api/v1/withdraw" :json="json" />
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
        to_banking: "BBL",
        name: "Mr.ABC",
        signature: "MD5",
        callback: "https://yourdomain.com/hookapi",
      },
    };
  },
};
</script>