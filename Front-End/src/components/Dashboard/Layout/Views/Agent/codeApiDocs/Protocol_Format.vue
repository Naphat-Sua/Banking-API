<template>
  <div>
    <h4>Protocol Format</h4>
    <strong>MediaType:</strong> JSON format<br />
    <strong>Protocol:</strong> HTTPS<br />
    <strong>Method:</strong> Form POST<br />
    <strong>Server URL:</strong><br />
    ● https://api.real-pay.co<br />
    ● https://api.shop2pay.biz<br /><br />
    <strong>HTTP Headers:</strong><br />
    <strong>Content-Type:</strong>application/json<br />
    <strong>authorization:</strong>keyclient (Send to client email when you
    register.) <br />
    <hr />
    <br />
    <h4>Error request</h4>
    <br />
    There are 2 types<br />
    <hr />
    1. There is a problem with the program system.<br />
    For example: QRcode timeout, You can not use order id<br />
    HTTP protocol status code: 400 or 500<br /><br />
    Response<br />
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
        ><span style="color: #b5cea8">400/500</span
        ><span style="color: #d4d4d4">,<span class="vscode-space"></span></span
        ><span style="color: #6a9955"
          >//Error<span class="vscode-space"></span>status<span
            class="vscode-space"
          ></span
          >code</span
        >
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">message</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"String"</span
        ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
        ><span style="color: #6a9955"
          >//Error<span class="vscode-space"></span>message</span
        >
      </div>
      <div><span style="color: #d4d4d4">}</span></div>
    </div>
    <hr />
    2. Data can’t validation or validation not correct<br />
    HTTP protocol status code: 400<br /><br />
    Response<br />
    <div class="vscode" style="white-space: pre">
      <div><span style="color: #d4d4d4">{</span></div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">target</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span>{</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">Object</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">},<span class="vscode-space"></span></span
        ><span style="color: #6a9955"
          >//Object<span class="vscode-space"></span>that<span
            class="vscode-space"
          ></span
          >was<span class="vscode-space"></span>validated.</span
        >
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">property</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"String"</span
        ><span style="color: #d4d4d4">,<span class="vscode-space"></span></span
        ><span style="color: #6a9955"
          >//Object’s<span class="vscode-space"></span>property<span
            class="vscode-space"
          ></span
          >that<span class="vscode-space"></span>haven’t<span
            class="vscode-space"
          ></span
          >pass<span class="vscode-space"></span>validation</span
        >
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">value</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span></span
        ><span style="color: #ce9178">"Any"</span
        ><span style="color: #d4d4d4">,<span class="vscode-space"></span></span
        ><span style="color: #6a9955"
          >//Value<span class="vscode-space"></span>that<span
            class="vscode-space"
          ></span
          >haven’t<span class="vscode-space"></span>pass<span
            class="vscode-space"
          ></span
          >a<span class="vscode-space"></span>validation</span
        >
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">constraints?</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span>{</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">Object</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">},<span class="vscode-space"></span></span
        ><span style="color: #6a9955"
          >//Constraints<span class="vscode-space"></span>that<span
            class="vscode-space"
          ></span
          >failed<span class="vscode-space"></span>validation<span
            class="vscode-space"
          ></span
          >with<span class="vscode-space"></span>error<span
            class="vscode-space"
          ></span
          >message</span
        >
      </div>
      <div>
        <span style="color: #d4d4d4"
          ><span class="vscode-space"></span><span class="vscode-space"></span
          ><span class="vscode-space"></span
          ><span class="vscode-space"></span></span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #9cdcfe">children?</span
        ><span style="color: #d4d4d4">"</span
        ><span style="color: #d4d4d4">:<span class="vscode-space"></span>[</span
        ><span style="color: #ce9178">"Array"</span
        ><span style="color: #d4d4d4">]<span class="vscode-space"></span></span
        ><span style="color: #6a9955"
          >//Contains<span class="vscode-space"></span>all<span
            class="vscode-space"
          ></span
          >nested<span class="vscode-space"></span>validation<span
            class="vscode-space"
          ></span
          >errors<span class="vscode-space"></span>of<span
            class="vscode-space"
          ></span
          >the<span class="vscode-space"></span>property</span
        >
      </div>
      <div><span style="color: #d4d4d4">}</span></div>
    </div>
  </div>
</template>