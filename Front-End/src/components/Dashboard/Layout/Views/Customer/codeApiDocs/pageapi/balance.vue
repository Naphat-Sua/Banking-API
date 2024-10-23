<template>
  <div>
    <h4>Balance</h4>
    How to check your balance by API <br />
    <span class="get-text">[GET]</span> /api/v1/balance <br /><br />

    <Get-code endpoint="/api/v1/balance" />
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
        ><span style="color: #9cdcfe">code</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #b5cea8">200</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">balance</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #b5cea8">0.00</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">signature</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"xxxxxxxxxxx"</span>
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
          <td style="text-align: center">code</td>
          <td style="text-align: center">init (Number)</td>
          <td style="text-align: center">Status Code</td>
        </tr>
        <tr>
          <td style="text-align: center">2</td>
          <td style="text-align: center">balance</td>
          <td style="text-align: center">Floating (Number)</td>
          <td style="text-align: center">Amount of balance</td>
        </tr>
        <tr>
          <td style="text-align: center">3</td>
          <td style="text-align: center">signature</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Encrypted signature (MD5)</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import get_code from "../get_code";
export default {
  components: {
    "Get-code": get_code,
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