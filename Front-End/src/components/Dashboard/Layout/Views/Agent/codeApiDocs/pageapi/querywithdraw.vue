<template>
  <div>
    <h4>Query Withdraw</h4>
    How to query our withdraw by api<br />
    <span class="post-text">[POST]</span> /api/v1/query/withdraw<br /><br />
    <h4>Request data</h4>
    <table class="table-api-docs">
      <tbody>
        <tr>
          <th style="text-align: center">No</th>
          <th style="text-align: center">Name</th>
          <th style="text-align: center">Type</th>
          <th style="text-align: center"><strong>Required</strong></th>
          <th style="text-align: center">Description</th>
          <th style="text-align: center"><strong>Sample Data</strong></th>
        </tr>
        <tr>
          <td style="text-align: center">1</td>
          <td style="text-align: center">id</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">ID Provide by Sho2pay</td>
          <td style="text-align: center">123455687</td>
        </tr>
        <tr>
          <td style="text-align: center">2</td>
          <td style="text-align: center">orderid</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Merchant Order ID</td>
          <td style="text-align: center">
            c3c67490-23d4-48a0-b8 77-4963b5a1ec1c
          </td>
        </tr>
        <tr>
          <td style="text-align: center">3</td>
          <td style="text-align: center">signature</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Encrypted signature (MD5)</td>
          <td style="text-align: center">Please follow Signature Guild</td>
        </tr>
      </tbody>
    </table>
    <br /><br />
    <Deposit-code endpoint="/api/v1/query/deposit" :json="json" />
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
        ><span style="color: #9cdcfe">id</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"123455687"</span
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
        ><span style="color: #ce9178"
          >"c3c67490-23d4-48a0-b877-4963b5a1ec1c"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">price</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #b5cea8">123.33</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">from_account</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"0123456789"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">to_banking</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"KBANK"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">name</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"Mr.ABC"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">created_at</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178"
          >"YYYY-MM-DD<span class="vscode-space"></span>HH:mm:ss<span
            class="vscode-space"
          ></span
          >Z"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">updated_at</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178"
          >"YYYY-MM-DD<span class="vscode-space"></span>HH:mm:ss<span
            class="vscode-space"
          ></span
          >Z"</span
        >
      </div>
      <div><span style="color: #d4d4d4">}</span></div>
    </div>
    <br /><br />
    <h4>Response Data</h4>
    <table class="table-api-docs">
      <tbody>
        <tr>
          <th style="text-align: center"><strong>No</strong></th>
          <th style="text-align: center"><strong>Name</strong></th>
          <th style="text-align: center"><strong>Type</strong></th>
          <th style="text-align: center"><strong>Description</strong></th>
          <th style="text-align: center"><strong>Sample Data</strong></th>
        </tr>
        <tr>
          <td style="text-align: center">1</td>
          <td style="text-align: center">code</td>
          <td style="text-align: center">Init</td>
          <td style="text-align: center">Status</td>
          <td style="text-align: center">200</td>
        </tr>
        <tr>
          <td style="text-align: center">2</td>
          <td style="text-align: center">id</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">ID Provide by Sho2pay</td>
          <td style="text-align: center">123455687</td>
        </tr>
        <tr>
          <td style="text-align: center">3</td>
          <td style="text-align: center">orderid</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Merchant Order ID</td>
          <td style="text-align: center">
            c3c67490-23d4-48a0-b877-4963b5a1ec1c
          </td>
        </tr>
        <tr>
          <td style="text-align: center">4</td>
          <td style="text-align: center">price</td>
          <td style="text-align: center">Number</td>
          <td style="text-align: center">Amount Number by customer</td>
          <td style="text-align: center">10.00=1000 123.33=12333</td>
        </tr>
        <tr>
          <td style="text-align: center">5</td>
          <td style="text-align: center">to_banking</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Type of Bank</td>
          <td style="text-align: center">Please follow Bank Code</td>
        </tr>
        <tr>
          <td style="text-align: center">6</td>
          <td style="text-align: center">name</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Client Bank Name</td>
          <td style="text-align: center">Mr.ABC</td>
        </tr>
        <tr>
          <td style="text-align: center">7</td>
          <td style="text-align: center">created_at</td>
          <td style="text-align: center">DateString (YYYY-MM-DD HH:mm:ss Z)</td>
          <td style="text-align: center">Date Created</td>
          <td style="text-align: center">2020-10-30 20:36:33 07;00</td>
        </tr>
        <tr>
          <td style="text-align: center">8</td>
          <td style="text-align: center">updated_at</td>
          <td style="text-align: center">DateString (YYYY-MM-DD HH:mm:ss Z)</td>
          <td style="text-align: center">Date Update</td>
          <td style="text-align: center">2020-10-30 20:36:33 07;00</td>
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
        id: "123455687",
        orderid: "c3c67490-23d4-48a0-b8 77-4963b5a1ec1c",
        signature: "MD5",
      },
    };
  },
};
</script>