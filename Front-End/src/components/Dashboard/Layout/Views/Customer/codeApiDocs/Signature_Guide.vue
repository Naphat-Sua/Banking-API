<template>
  <div>
    <h4>Signature Guide</h4>
    Signature use Secret key to encrypted the solution.
    <strong>MD5</strong> is key to encrypted. this is the example<br />
    <div class="vscode" style="white-space: pre">
      <div><span style="color: #d4d4d4">{</span></div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">orderid</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"string"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">account</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"string"</span
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
        ><span style="color: #b5cea8">2000</span>
      </div>
      <div><span style="color: #d4d4d4">}</span></div>
    </div>
    <br /><br />

    1.
    <strong style="color: red"
      >Sort the key parameters alphabetically in ascending order (a-z)</strong
    >
    and <strong>write them in the format URL Params</strong> Then continue with
    variable name <strong>key=secertkey</strong><br />
    The example result is<br />
    <strong
      >“account=xxxxxxxx&orderid=xxxxxxxx&price=2000<span style="color: red"
        >&key=secertkey</span
      >“</strong
    ><br /><br />
    2 Use URL Params from step 1 be encrypted to MD5 and you get signature This
    example is<br />
    <strong
      >“signature =
      <span style="color: red">MD5</span
      >(account=xxxxxxxx&orderid=xxxxxxxx&price=2000<span style="color: red"
        >&key=secertkey</span
      >)”</strong
    ><br /><br />
    3. When you get signature bring it to make Playload Data like this
    <br /><br />
    <div class="vscode" style="white-space: pre">
      <div><span style="color: #d4d4d4">{</span></div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">orderid</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"string"</span
        ><span style="color: #d4d4d4">,</span>
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">account</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"string"</span
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
        ><span style="color: #b5cea8">2000</span
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
        ><span style="color: #ce9178"
          >"signature<span class="vscode-space"></span>from<span
            class="vscode-space"
          ></span
          >step<span class="vscode-space"></span>2"</span
        >
      </div>
      <div><span style="color: #d4d4d4">}</span></div>
    </div>
    <br /><br />
    How our system validate the signature?<br />
    We use the same format. if the format you encoded matches ours.<br />
    We will respond to the information.<br />
    <br /><br />
    <Sample-Code/>
  </div>
</template>

<script>
import samplecode from './sample-code'
export default {
  components:{
    "Sample-Code":samplecode
  }
}
</script>