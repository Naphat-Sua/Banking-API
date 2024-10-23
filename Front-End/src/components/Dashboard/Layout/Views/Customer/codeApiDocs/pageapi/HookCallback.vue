<template>
  <tabs
    type="success"
    vertical
    verticalNavClasses="col-lg-3 col-md-5 col-sm-4 col-6"
    verticalTabContentClasses="col-lg-9 col-md-7 col-sm-8 col-6"
    class="row api-endpoint"
  >
    <tab-pane title="Webhook Callback Docs">
      <h4>Webhook Callback</h4>
      Our system send callback immediately when we got event <br />
      <strong>MediaType:</strong> JSON format<br />
      <strong>Protocal:</strong> HTTPS,HTTP<br />
      <strong>Method:</strong> <span class="post-text">[POST]</span><br />
      <strong>URL:</strong>
      <strong style="color: red">Provide by merchant</strong><br />
      <strong>Ex URL:</strong> https://yourdomain.com/shop2pay/callback<br />
      <h4>System Send Header</h4>
      <table class="table-api-docs">
        <tbody>
          <tr>
            <th style="text-align: center"><strong>No</strong></th>
            <th style="text-align: center"><strong>Key</strong></th>
            <th style="text-align: center"><strong>Value</strong></th>
          </tr>
          <tr>
            <td style="text-align: center">1</td>
            <td style="text-align: center">Content-Type</td>
            <td style="text-align: center">application/json</td>
          </tr>
        </tbody>
      </table>
      <h4>Data Send Body</h4>
      <table class="table-api-docs">
        <tbody>
          <tr>
            <th style="text-align: center"><strong>No</strong></th>
            <th style="text-align: center"><strong>Name</strong></th>
            <th style="text-align: center"><strong>Type</strong></th>
            <th style="text-align: center"><strong>Description</strong></th>
          </tr>
          <tr>
            <td style="text-align: center">1</td>
            <td style="text-align: center">type</td>
            <td style="text-align: center">String</td>
            <td style="text-align: center">
              Type of system update (deposit,withdrawal)
            </td>
          </tr>
          <tr>
            <td style="text-align: center">2</td>
            <td style="text-align: center">orderid</td>
            <td style="text-align: center">String</td>
            <td style="text-align: center">Order id from merchant</td>
          </tr>
          <tr>
            <td style="text-align: center">3</td>
            <td style="text-align: center">id</td>
            <td style="text-align: center">String</td>
            <td style="text-align: center">id provide from our system</td>
          </tr>
          <tr>
            <td style="text-align: center">4</td>
            <td style="text-align: center">status</td>
            <td style="text-align: center">String</td>
            <td style="text-align: center">wait, success, cancel</td>
          </tr>
          <tr>
            <td style="text-align: center">5</td>
            <td style="text-align: center">signature</td>
            <td style="text-align: center">String</td>
            <td style="text-align: center">Encrypt by system</td>
          </tr>
        </tbody>
      </table>
      <h4>Example Data</h4>
      <div class="vscode" style="white-space: pre">
        <div><span style="color: #d4d4d4">{</span></div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #d4d4d4">"</span
          ><span style="color: #9cdcfe">type</span
          ><span style="color: #d4d4d4">"</span
          ><span style="color: #d4d4d4"
            >:<span class="vscode-space"></span></span
          ><span style="color: #ce9178">"deposit"</span
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
          ><span style="color: #d4d4d4"
            >:<span class="vscode-space"></span></span
          ><span style="color: #ce9178">"xxxxxxxx"</span
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
          ><span style="color: #d4d4d4"
            >:<span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"ca3c3757-ffa8-49db-89df-e314cc5ecf60"</span
          ><span style="color: #d4d4d4">,</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #d4d4d4">"</span
          ><span style="color: #9cdcfe">status</span
          ><span style="color: #d4d4d4">"</span
          ><span style="color: #d4d4d4"
            >:<span class="vscode-space"></span></span
          ><span style="color: #ce9178">"success"</span
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
          ><span style="color: #d4d4d4"
            >:<span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"865ff0ec8f9784976a42c03a76db7bec"</span
          >
        </div>
        <div><span style="color: #d4d4d4">}</span></div>
      </div>
    </tab-pane>
    <tab-pane title="Sample Receive Code">
        <ReceiveCode/>
    </tab-pane>
  </tabs>
</template>

<script>
import ReceiveCode from "./ReceiveCode"
export default {
    components:{
        ReceiveCode
    }
}
</script>