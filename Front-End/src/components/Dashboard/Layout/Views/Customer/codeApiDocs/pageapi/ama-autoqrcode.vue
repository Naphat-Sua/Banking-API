<template>
  <div>
    <h4>Create auto qrcode (AutoMap account)</h4>
    <span class="post-text">[POST]</span> /api/v1/ama/autoqrcode <br /><br />
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
          <td style="text-align: center">3</td>
          <td style="text-align: center">from_account</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Client bank account</td>
          <td style="text-align: center">0123456789</td>
        </tr>
        <tr>
          <td style="text-align: center">4</td>
          <td style="text-align: center">from_bank</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Type of Bank</td>
          <td style="text-align: center">Please follow Bank Code</td>
        </tr>
        <tr>
          <td style="text-align: center">5</td>
          <td style="text-align: center">from_name</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Y</td>
          <td style="text-align: center">Client Bank Name</td>
          <td style="text-align: center">Mr.ABC</td>
        </tr>
        <tr>
          <td style="text-align: center">6</td>
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
          <td style="text-align: center">7</td>
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
    <Deposit-code endpoint="/api/v1/ama/autoqrcode" :json="json" />
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
        ><span style="color: #ce9178">"xxxxxxxxxx"</span
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
        ><span style="color: #b5cea8">100.57</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">accountbank</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4"
          >:<span class="vscode-space"></span>{</span
        >
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">account</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"0123456789"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">name</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"xxxxxx"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">bank</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"SCB"</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span>},</span
        >
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">image</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178"
          >"https://api.real-pay.co/api/image/qrcode?token=xxxx-xxxx-xxxx-xxxx"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">timeout</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4"
          >:<span class="vscode-space"></span>{</span
        >
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">days</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"DD/MM/YYYY"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">time</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"HH:mm:ss"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">date</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"2020-10-16T09:00:24.495Z"</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span>},</span
        >
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">signatture</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"xxxxxxxxxxxxxxxx"</span>
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
          <td style="text-align: center">id</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Merchant ID Shop2pay</td>
          <td style="text-align: center">12345687</td>
        </tr>
        <tr>
          <td style="text-align: center">2</td>
          <td style="text-align: center">orderid</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Merchant Order id</td>
          <td style="text-align: center">
            c3c67490-23d<br />
            4-48a0-b877-4<br />
            963b5a1ec1c
          </td>
        </tr>
        <tr>
          <td style="text-align: center">3</td>
          <td style="text-align: center">price</td>
          <td style="text-align: center">Floating (Number)</td>
          <td style="text-align: center">Amount Number</td>
          <td style="text-align: center">1234578690</td>
        </tr>
        <tr>
          <td style="text-align: center">4</td>
          <td style="text-align: center">image</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">URL Link Images</td>
          <td style="text-align: center">
            shop2payxx.<br />
            api.xxx
          </td>
        </tr>
        <tr>
          <td style="text-align: center">5</td>
          <td style="text-align: center">timeout</td>
          <td style="text-align: center">Object</td>
          <td style="text-align: center">QR Expire Time out</td>
          <td style="text-align: center">Read Below</td>
        </tr>
        <tr>
          <td style="text-align: center">6</td>
          <td style="text-align: center">accountbank</td>
          <td style="text-align: center">Object</td>
          <td style="text-align: center">Merchant Bank Account</td>
          <td style="text-align: center">Read Below</td>
        </tr>
        <tr>
          <td style="text-align: center">7</td>
          <td style="text-align: center">signature</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Secret Key encrypt</td>
          <td style="text-align: center">Please follow Signature Guild</td>
        </tr>
      </tbody>
    </table>
    <br /><br />
    <h4>timeout Data</h4>
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
          <td style="text-align: center">days</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Date</td>
          <td style="text-align: center">2020-10-18</td>
        </tr>
        <tr>
          <td style="text-align: center">2</td>
          <td style="text-align: center">time</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Time</td>
          <td style="text-align: center">10:30:50</td>
        </tr>
        <tr>
          <td style="text-align: center">3</td>
          <td style="text-align: center">Date</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Time Expire</td>
          <td style="text-align: center">2020-10-18T10:30:50.108</td>
        </tr>
      </tbody>
    </table>
    <br /><br />
    <h4>accountbank Data</h4>
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
          <td style="text-align: center">account</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Merchant Account Number</td>
          <td style="text-align: center">01234567880</td>
        </tr>
        <tr>
          <td style="text-align: center">2</td>
          <td style="text-align: center">name</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Merchant Account Name</td>
          <td style="text-align: center">MR.FGGGM</td>
        </tr>
        <tr>
          <td style="text-align: center">3</td>
          <td style="text-align: center">bank</td>
          <td style="text-align: center">String</td>
          <td style="text-align: center">Merchant Bank Code</td>
          <td style="text-align: center">Please follow Bank Code</td>
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