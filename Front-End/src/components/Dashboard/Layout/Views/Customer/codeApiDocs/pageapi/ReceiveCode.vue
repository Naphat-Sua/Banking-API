<template>
  <tabs class="api-tabs" type="info">
    <tab-pane title="ExpressJs">
      <a href="https://bit.ly/3eRhIll" target="_blank" rel="noopener noreferrer"
      ><p-button type="info">GitLab Node JS Code</p-button></a
    >
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #569cd6">var</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">express</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcaa">require</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178">'express'</span
          ><span style="color: #d4d4d4">)</span>
        </div>
        <div>
          <span style="color: #569cd6">var</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">bodyParser</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcaa">require</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178">'body-parser'</span
          ><span style="color: #d4d4d4">)</span>
        </div>
        <div>
          <span style="color: #569cd6">var</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">app</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcaa">express</span
          ><span style="color: #d4d4d4">()</span>
        </div>
        <br />
        <div>
          <span style="color: #6a9955"
            >//<span class="vscode-space"></span>parse<span
              class="vscode-space"
            ></span
            >application/json</span
          >
        </div>
        <div>
          <span style="color: #9cdcfe">app</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">use</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #9cdcfe">bodyParser</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">json</span
          ><span style="color: #d4d4d4">())</span>
        </div>
        <br />
        <div>
          <span style="color: #9cdcfe">app</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">post</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178">'/callback'</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span></span
          ><span style="color: #569cd6">function</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>(</span
          ><span style="color: #9cdcfe">req</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">res</span
          ><span style="color: #d4d4d4"
            >)<span class="vscode-space"></span>{</span
          >
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #6a9955"
            >//<span class="vscode-space"></span>Do<span
              class="vscode-space"
            ></span
            >Someting<span class="vscode-space"></span>Or<span
              class="vscode-space"
            ></span
            >Save<span class="vscode-space"></span>Into<span
              class="vscode-space"
            ></span
            >DB</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">res</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">end</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178">`</span>
        </div>
        <div>
          <span style="color: #ce9178"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>type<span
              class="vscode-space"
            ></span
            >=<span class="vscode-space"></span></span
          ><span style="color: #569cd6">${</span
          ><span style="color: #9cdcfe">req</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4">body</span
          ><span style="color: #d4d4d4">.type</span
          ><span style="color: #569cd6">}</span>
        </div>
        <div>
          <span style="color: #ce9178"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>orderid<span
              class="vscode-space"
            ></span
            >=<span class="vscode-space"></span></span
          ><span style="color: #569cd6">${</span
          ><span style="color: #9cdcfe">req</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4">body</span
          ><span style="color: #d4d4d4">.orderid</span
          ><span style="color: #569cd6">}</span>
        </div>
        <div>
          <span style="color: #ce9178"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>id<span
              class="vscode-space"
            ></span
            >=<span class="vscode-space"></span></span
          ><span style="color: #569cd6">${</span
          ><span style="color: #9cdcfe">req</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4">body</span
          ><span style="color: #d4d4d4">.id</span
          ><span style="color: #569cd6">}</span>
        </div>
        <div>
          <span style="color: #ce9178"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>status<span
              class="vscode-space"
            ></span
            >=<span class="vscode-space"></span></span
          ><span style="color: #569cd6">${</span
          ><span style="color: #9cdcfe">req</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4">body</span
          ><span style="color: #d4d4d4">.status</span
          ><span style="color: #569cd6">}</span>
        </div>
        <div>
          <span style="color: #ce9178"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>signature<span
              class="vscode-space"
            ></span
            >=<span class="vscode-space"></span></span
          ><span style="color: #569cd6">${</span
          ><span style="color: #9cdcfe">req</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4">body</span
          ><span style="color: #d4d4d4">.signature</span
          ><span style="color: #569cd6">}</span>
        </div>
        <div>
          <span style="color: #ce9178"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>`</span
          ><span style="color: #d4d4d4">)</span>
        </div>
        <br />
        <div><span style="color: #d4d4d4">})</span></div>
        <br />
        <div>
          <span style="color: #9cdcfe">app</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">listen</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #9cdcfe">process</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4">env</span
          ><span style="color: #d4d4d4"
            >.PORT<span class="vscode-space"></span>||<span
              class="vscode-space"
            ></span></span
          ><span style="color: #b5cea8">8888</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span>()<span
              class="vscode-space"
            ></span></span
          ><span style="color: #569cd6">=&gt;</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">console</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">log</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178"
            >`Example<span class="vscode-space"></span>app<span
              class="vscode-space"
            ></span
            >listening<span class="vscode-space"></span>on<span
              class="vscode-space"
            ></span></span
          ><span style="color: #569cd6">${</span
          ><span style="color: #9cdcfe">process</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4">env</span
          ><span style="color: #d4d4d4"
            >.PORT<span class="vscode-space"></span>||<span
              class="vscode-space"
            ></span></span
          ><span style="color: #b5cea8">8888</span
          ><span style="color: #569cd6">}</span
          ><span style="color: #ce9178"
            ><span class="vscode-space"></span>port!`</span
          ><span style="color: #d4d4d4">);</span>
        </div>
        <div><span style="color: #d4d4d4">});</span></div>
      </div>
    </tab-pane>
    <tab-pane title="PHP">
      <a href="https://bit.ly/3kd3fRH" target="_blank" rel="noopener noreferrer"
      ><p-button type="info">GitLab PHP Code</p-button></a
    >    
      <div class="vscode" style="white-space: pre">
        <div><span style="color: #569cd6">&lt;?php</span></div>
        <div>
          <span style="color: #c586c0">if</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>($</span
          ><span style="color: #9cdcfe">_SERVER</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">'REQUEST_METHOD'</span
          ><span style="color: #d4d4d4"
            >]<span class="vscode-space"></span>==<span
              class="vscode-space"
            ></span></span
          ><span style="color: #ce9178">"POST"</span
          ><span style="color: #d4d4d4"
            >)<span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>$</span
          ><span style="color: #9cdcfe">data</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcaa">json_decode</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #dcdcaa">file_get_contents</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178">'php://input'</span
          ><span style="color: #d4d4d4"
            >),<span class="vscode-space"></span></span
          ><span style="color: #569cd6">true</span
          ><span style="color: #d4d4d4">);</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #6a9955"
            >//<span class="vscode-space"></span>Do<span
              class="vscode-space"
            ></span
            >Someting<span class="vscode-space"></span>Or<span
              class="vscode-space"
            ></span
            >Save<span class="vscode-space"></span>Into<span
              class="vscode-space"
            ></span
            >DB</span
          >
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcaa">echo</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"type<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >"</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>$</span
          ><span style="color: #9cdcfe">data</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">'type'</span
          ><span style="color: #d4d4d4">];</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcaa">echo</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"orderid<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >"</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>$</span
          ><span style="color: #9cdcfe">data</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">'orderid'</span
          ><span style="color: #d4d4d4">];</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcaa">echo</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"id<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >"</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>$</span
          ><span style="color: #9cdcfe">data</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">'id'</span
          ><span style="color: #d4d4d4">];</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcaa">echo</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"status<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >"</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>$</span
          ><span style="color: #9cdcfe">data</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">'status'</span
          ><span style="color: #d4d4d4">];</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcaa">echo</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"signature<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >"</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>$</span
          ><span style="color: #9cdcfe">data</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">'signature'</span
          ><span style="color: #d4d4d4">];</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4">}<span class="vscode-space"></span></span
          ><span style="color: #c586c0">else</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcaa">echo</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"POST<span class="vscode-space"></span>Only"</span
          ><span style="color: #d4d4d4">;</span>
        </div>
        <div><span style="color: #d4d4d4">}</span></div>
        <br />
      </div>
    </tab-pane>
    <tab-pane title="Go">
      <a href="https://bit.ly/2IllzLh" target="_blank" rel="noopener noreferrer"
      ><p-button type="info">GitLab Go Lang Code</p-button></a
    >
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #569cd6">package</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>main</span
          >
        </div>
        <br />
        <div>
          <span style="color: #569cd6">import</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>(</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #ce9178">"encoding/json"</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #ce9178">"log"</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #ce9178">"net/http"</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #ce9178">"fmt"</span>
        </div>
        <div><span style="color: #d4d4d4">)</span></div>
        <br />
        <div>
          <span style="color: #569cd6">func</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcaa">callback</span
          ><span style="color: #d4d4d4"
            >(w<span class="vscode-space"></span>http.ResponseWriter,<span
              class="vscode-space"
            ></span
            >r<span class="vscode-space"></span>*http.Request)<span
              class="vscode-space"
            ></span
            >{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
          ></span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #6a9955"
            >//<span class="vscode-space"></span>define<span
              class="vscode-space"
            ></span
            >custom<span class="vscode-space"></span>type</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #569cd6">type</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">RestDataJson</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #569cd6">struct</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>Type<span
              class="vscode-space"
            ></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">string</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #ce9178">`json:"type"`</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>Orderid<span
              class="vscode-space"
            ></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">string</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #ce9178">`json:"orderid"`</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>Id<span
              class="vscode-space"
            ></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">string</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #ce9178">`json:"id"`</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>Status<span
              class="vscode-space"
            ></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">string</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #ce9178">`json:"status"`</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>Signature<span
              class="vscode-space"
            ></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">string</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #ce9178">`json:"signature"`</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>}</span
          >
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #6a9955"
            >//<span class="vscode-space"></span>define<span
              class="vscode-space"
            ></span
            >a<span class="vscode-space"></span>var<span
              class="vscode-space"
            ></span
          ></span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #569cd6">var</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">rData</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>RestDataJson</span
          >
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">err</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>:=<span
              class="vscode-space"
            ></span
            >json.</span
          ><span style="color: #dcdcaa">NewDecoder</span
          ><span style="color: #d4d4d4">(r.Body).</span
          ><span style="color: #dcdcaa">Decode</span
          ><span style="color: #d4d4d4">(&amp;rData)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #c586c0">if</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>err<span
              class="vscode-space"
            ></span
            >!=<span class="vscode-space"></span></span
          ><span style="color: #569cd6">nil</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>w.</span
          ><span style="color: #dcdcaa">WriteHeader</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #b5cea8">400</span
          ><span style="color: #d4d4d4">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>fmt.</span
          ><span style="color: #dcdcaa">Fprintf</span
          ><span style="color: #d4d4d4"
            >(w,<span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"Decode<span class="vscode-space"></span>error!<span
              class="vscode-space"
            ></span
            >please<span class="vscode-space"></span>check<span
              class="vscode-space"
            ></span
            >your<span class="vscode-space"></span>JSON<span
              class="vscode-space"
            ></span
            >formating."</span
          ><span style="color: #d4d4d4">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #c586c0">return</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>}</span
          >
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #6a9955"
            >//<span class="vscode-space"></span>Do<span
              class="vscode-space"
            ></span
            >Someting<span class="vscode-space"></span>Or<span
              class="vscode-space"
            ></span
            >Save<span class="vscode-space"></span>Into<span
              class="vscode-space"
            ></span
            >DB</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>fmt.</span
          ><span style="color: #dcdcaa">Fprintf</span
          ><span style="color: #d4d4d4"
            >(w,<span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"ID:<span class="vscode-space"></span>%s"</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span>rData.Id)</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>fmt.</span
          ><span style="color: #dcdcaa">Fprintf</span
          ><span style="color: #d4d4d4"
            >(w,<span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"Type:<span class="vscode-space"></span>%s"</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span>rData.Type)</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>fmt.</span
          ><span style="color: #dcdcaa">Fprintf</span
          ><span style="color: #d4d4d4"
            >(w,<span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"Orderid:<span class="vscode-space"></span>%s"</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span>rData.Orderid)</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>fmt.</span
          ><span style="color: #dcdcaa">Fprintf</span
          ><span style="color: #d4d4d4"
            >(w,<span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"Status:<span class="vscode-space"></span>%s"</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span>rData.Status)</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>fmt.</span
          ><span style="color: #dcdcaa">Fprintf</span
          ><span style="color: #d4d4d4"
            >(w,<span class="vscode-space"></span></span
          ><span style="color: #ce9178"
            >"Signature:<span class="vscode-space"></span>%s"</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span>rData.Signature)</span
          >
        </div>
        <div><span style="color: #d4d4d4">}</span></div>
        <br />
        <div>
          <span style="color: #569cd6">func</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcaa">main</span
          ><span style="color: #d4d4d4"
            >()<span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>http.</span
          ><span style="color: #dcdcaa">HandleFunc</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178">"/callback"</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span>callback)</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>log.</span
          ><span style="color: #dcdcaa">Fatal</span
          ><span style="color: #d4d4d4">(http.</span
          ><span style="color: #dcdcaa">ListenAndServe</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178">":8888"</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span></span
          ><span style="color: #569cd6">nil</span
          ><span style="color: #d4d4d4">))</span>
        </div>
        <div><span style="color: #d4d4d4">}</span></div>
      </div>
    </tab-pane>
    <tab-pane title="C#">
      <a href="https://bit.ly/36jCRAY" target="_blank" rel="noopener noreferrer"
      ><p-button type="info">GitLab C# Code</p-button></a
    >
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #c586c0">using</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">System</span
          ><span style="color: #d4d4d4">;</span>
        </div>
        <div>
          <span style="color: #c586c0">using</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">System</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #4ec9b0">Collections</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #4ec9b0">Generic</span
          ><span style="color: #d4d4d4">;</span>
        </div>
        <div>
          <span style="color: #c586c0">using</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">System</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #4ec9b0">Text</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #4ec9b0">Json</span
          ><span style="color: #d4d4d4">;</span>
        </div>
        <div>
          <span style="color: #c586c0">using</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">Microsoft</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #4ec9b0">AspNetCore</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #4ec9b0">Mvc</span
          ><span style="color: #d4d4d4">;</span>
        </div>
        <br />
        <div>
          <span style="color: #569cd6">namespace</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">testcsapi</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #4ec9b0">Controllers</span>
        </div>
        <div><span style="color: #d4d4d4">{</span></div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>[</span
          ><span style="color: #4ec9b0">ApiController</span
          ><span style="color: #d4d4d4">]</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #6a9955"
            >//<span class="vscode-space"></span>POST:<span
              class="vscode-space"
            ></span
            >/callback</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>[</span
          ><span style="color: #4ec9b0">Route</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178">"[controller]"</span
          ><span style="color: #d4d4d4">)]</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #569cd6">public</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #569cd6">class</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #4ec9b0">CallbackController</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>:<span
              class="vscode-space"
            ></span></span
          ><span style="color: #4ec9b0">ControllerBase</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>{</span
          >
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>[</span
          ><span style="color: #4ec9b0">HttpPost</span
          ><span style="color: #d4d4d4">]</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #569cd6">public</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #569cd6">string</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcaa">Main</span
          ><span style="color: #d4d4d4">([</span
          ><span style="color: #4ec9b0">FromBody</span
          ><span style="color: #d4d4d4"
            >]<span class="vscode-space"></span></span
          ><span style="color: #569cd6">dynamic</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">raw</span
          ><span style="color: #d4d4d4">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #569cd6">string</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">jsonString</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span></span
          ><span style="color: #9cdcfe">JsonSerializer</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">Serialize</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #9cdcfe">raw</span
          ><span style="color: #d4d4d4">);</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #569cd6">var</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">newJson</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span></span
          ><span style="color: #9cdcfe">JsonSerializer</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">Deserialize</span
          ><span style="color: #d4d4d4">&lt;</span
          ><span style="color: #4ec9b0">Dictionary</span
          ><span style="color: #d4d4d4">&lt;</span
          ><span style="color: #569cd6">string</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span></span
          ><span style="color: #569cd6">string</span
          ><span style="color: #d4d4d4">&gt;&gt;(</span
          ><span style="color: #9cdcfe">jsonString</span
          ><span style="color: #d4d4d4">);</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #6a9955"
            >//Do<span class="vscode-space"></span>Someting<span
              class="vscode-space"
            ></span
            >Or<span class="vscode-space"></span>Save<span
              class="vscode-space"
            ></span
            >Into<span class="vscode-space"></span>DB</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">Console</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">Write</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178"
            >"type<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >"</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>+<span
              class="vscode-space"
            ></span></span
          ><span style="color: #9cdcfe">newJson</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">"type"</span
          ><span style="color: #d4d4d4">]);</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">Console</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">Write</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178"
            >"orderid<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >"</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>+<span
              class="vscode-space"
            ></span></span
          ><span style="color: #9cdcfe">newJson</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">"orderid"</span
          ><span style="color: #d4d4d4">]);</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">Console</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">Write</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178"
            >"id<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >"</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>+<span
              class="vscode-space"
            ></span></span
          ><span style="color: #9cdcfe">newJson</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">"id"</span
          ><span style="color: #d4d4d4">]);</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">Console</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">Write</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178"
            >"status<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >"</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>+<span
              class="vscode-space"
            ></span></span
          ><span style="color: #9cdcfe">newJson</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">"status"</span
          ><span style="color: #d4d4d4">]);</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">Console</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #dcdcaa">Write</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #ce9178"
            >"signature<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >"</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>+<span
              class="vscode-space"
            ></span></span
          ><span style="color: #9cdcfe">newJson</span
          ><span style="color: #d4d4d4">[</span
          ><span style="color: #ce9178">"signature"</span
          ><span style="color: #d4d4d4">]);</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #c586c0">return</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #9cdcfe">jsonString</span
          ><span style="color: #d4d4d4">;</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>}</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>}</span
          >
        </div>
        <div><span style="color: #d4d4d4">}</span></div>
        <br />
      </div>
    </tab-pane>
  </tabs>
</template>