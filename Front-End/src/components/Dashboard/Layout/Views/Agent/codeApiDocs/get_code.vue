<template>
  <tabs class="api-tabs" type="info">
    <tab-pane title="NodeJs">
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #66d9ef; font-style: italic">const</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">request</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #66d9ef">require</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #e6db74">'request'</span
          ><span style="color: #d4d4d4">);</span>
        </div>
        <div>
          <span style="color: #66d9ef; font-style: italic">let</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">options</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">=</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #e6db74">'method'</span
          ><span style="color: #d4d4d4"
            >:<span class="vscode-space"></span></span
          ><span style="color: #e6db74">'GET'</span
          ><span style="color: #d4d4d4">,</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #e6db74">'url'</span
          ><span style="color: #d4d4d4"
            >:<span class="vscode-space"></span></span
          ><span style="color: #e6db74"
            >'https://api.real-pay.co{{endpoint}}'</span
          ><span style="color: #d4d4d4">,</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #e6db74">'headers'</span
          ><span style="color: #d4d4d4"
            >:<span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #e6db74">'authorization'</span
          ><span style="color: #d4d4d4"
            >:<span class="vscode-space"></span></span
          ><span style="color: #e6db74">'keyclient'</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>}</span
          >
        </div>
        <div><span style="color: #d4d4d4">};</span></div>
        <div>
          <span style="color: #a6e22e">request</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #f8f8f2">options</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span>(</span
          ><span style="color: #fd971f; font-style: italic">error</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span></span
          ><span style="color: #fd971f; font-style: italic">response</span
          ><span style="color: #d4d4d4"
            >)<span class="vscode-space"></span></span
          ><span style="color: #66d9ef; font-style: italic">=&gt;</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">if</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>(</span
          ><span style="color: #f8f8f2">error</span
          ><span style="color: #d4d4d4"
            >)<span class="vscode-space"></span></span
          ><span style="color: #f92672">throw</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">new</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #a6e22e; text-decoration: underline">Error</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #f8f8f2">error</span
          ><span style="color: #d4d4d4">);</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #66d9ef; font-style: italic">console</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #66d9ef">log</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #f8f8f2">response</span
          ><span style="color: #d4d4d4">.body);</span>
        </div>
        <div><span style="color: #d4d4d4">});</span></div>
        <br />
      </div>
    </tab-pane>
    <tab-pane title="Javascript">
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #66d9ef; font-style: italic">var</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">myHeaders</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">new</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #a6e22e; text-decoration: underline"
            >Headers</span
          ><span style="color: #d4d4d4">();</span>
        </div>
        <div>
          <span style="color: #f8f8f2">myHeaders</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #66d9ef">append</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #e6db74">"authorization"</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span></span
          ><span style="color: #e6db74">"keyclient"</span
          ><span style="color: #d4d4d4">);</span>
        </div>
        <br />
        <div>
          <span style="color: #66d9ef; font-style: italic">var</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">requestOptions</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">=</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>{</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>method:<span
              class="vscode-space"
            ></span></span
          ><span style="color: #e6db74">'GET'</span
          ><span style="color: #d4d4d4">,</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>headers:<span
              class="vscode-space"
            ></span></span
          ><span style="color: #f8f8f2">myHeaders</span
          ><span style="color: #d4d4d4">,</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>redirect:<span
              class="vscode-space"
            ></span></span
          ><span style="color: #e6db74">'follow'</span>
        </div>
        <div><span style="color: #d4d4d4">};</span></div>
        <br />
        <div>
          <span style="color: #a6e22e">fetch</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #e6db74"
            >"https://api.real-pay.co{{endpoint}}"</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">requestOptions</span
          ><span style="color: #d4d4d4">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>.</span
          ><span style="color: #66d9ef">then</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #fd971f; font-style: italic">response</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #66d9ef; font-style: italic">=&gt;</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">response</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #a6e22e">text</span
          ><span style="color: #d4d4d4">())</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>.</span
          ><span style="color: #66d9ef">then</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #fd971f; font-style: italic">result</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #66d9ef; font-style: italic">=&gt;</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #66d9ef; font-style: italic">console</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #66d9ef">log</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #f8f8f2">result</span
          ><span style="color: #d4d4d4">))</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>.</span
          ><span style="color: #66d9ef">catch</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #fd971f; font-style: italic">error</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #66d9ef; font-style: italic">=&gt;</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #66d9ef; font-style: italic">console</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #66d9ef">log</span
          ><span style="color: #d4d4d4">(</span
          ><span style="color: #e6db74">'error'</span
          ><span style="color: #d4d4d4"
            >,<span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">error</span
          ><span style="color: #d4d4d4">));</span>
        </div>
      </div>
    </tab-pane>
    <tab-pane title="PHP">
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #f92672">require_once</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74">'HTTP/Request2.php'</span
          ><span style="color: #dcdcdc">;</span>
        </div>
        <div>
          <span style="color: #f8f8f2">$request</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">new</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>HTTP_Request2</span
          ><span style="color: #dcdcdc">();</span>
        </div>
        <div>
          <span style="color: #f8f8f2">$request</span
          ><span style="color: #dcdcdc">-&gt;</span
          ><span style="color: #d4d4d4">setUrl</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #e6db74"
            >'https://api.real-pay.co{{endpoint}}'</span
          ><span style="color: #dcdcdc">);</span>
        </div>
        <div>
          <span style="color: #f8f8f2">$request</span
          ><span style="color: #dcdcdc">-&gt;</span
          ><span style="color: #d4d4d4">setMethod</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">HTTP_Request2</span
          ><span style="color: #dcdcdc">::</span
          ><span style="color: #d4d4d4">METHOD_GET</span
          ><span style="color: #dcdcdc">);</span>
        </div>
        <div>
          <span style="color: #f8f8f2">$request</span
          ><span style="color: #dcdcdc">-&gt;</span
          ><span style="color: #d4d4d4">setConfig</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #f92672">array</span
          ><span style="color: #dcdcdc">(</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #e6db74">'follow_redirects'</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">=&gt;</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>TRUE</span
          >
        </div>
        <div><span style="color: #dcdcdc">));</span></div>
        <div>
          <span style="color: #f8f8f2">$request</span
          ><span style="color: #dcdcdc">-&gt;</span
          ><span style="color: #d4d4d4">setHeader</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #f92672">array</span
          ><span style="color: #dcdcdc">(</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #e6db74">'authorization'</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">=&gt;</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74">'keyclient'</span>
        </div>
        <div><span style="color: #dcdcdc">));</span></div>
        <div>
          <span style="color: #f92672">try</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">$response</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">$request</span
          ><span style="color: #dcdcdc">-&gt;</span
          ><span style="color: #d4d4d4">send</span
          ><span style="color: #dcdcdc">();</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">if</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #f8f8f2">$response</span
          ><span style="color: #dcdcdc">-&gt;</span
          ><span style="color: #d4d4d4">getStatus</span
          ><span style="color: #dcdcdc">()</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">==</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #b5cea8">200</span
          ><span style="color: #dcdcdc">)</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">echo</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">$response</span
          ><span style="color: #dcdcdc">-&gt;</span
          ><span style="color: #d4d4d4">getBody</span
          ><span style="color: #dcdcdc">();</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">}</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">else</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">echo</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74"
            >'Unexpected<span class="vscode-space"></span>HTTP<span
              class="vscode-space"
            ></span
            >status:<span class="vscode-space"></span>'</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">$response</span
          ><span style="color: #dcdcdc">-&gt;</span
          ><span style="color: #d4d4d4">getStatus</span
          ><span style="color: #dcdcdc">()</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74"
            >'<span class="vscode-space"></span>'</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">.</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">$response</span
          ><span style="color: #dcdcdc">-&gt;</span
          ><span style="color: #d4d4d4">getReasonPhrase</span
          ><span style="color: #dcdcdc">();</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">}</span>
        </div>
        <div><span style="color: #dcdcdc">}</span></div>
        <div>
          <span style="color: #f92672">catch</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4"
            >HTTP_Request2_Exception<span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">$e</span
          ><span style="color: #dcdcdc">)</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">echo</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74"
            >'Error:<span class="vscode-space"></span>'</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f8f8f2">$e</span
          ><span style="color: #dcdcdc">-&gt;</span
          ><span style="color: #d4d4d4">getMessage</span
          ><span style="color: #dcdcdc">();</span>
        </div>
        <div><span style="color: #dcdcdc">}</span></div>
      </div>
    </tab-pane>
    <tab-pane title="C#">
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #f92672">var</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>client<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">new</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>RestClient</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #e6db74"
            >"https://api.real-pay.co{{endpoint}}"</span
          ><span style="color: #dcdcdc">);</span>
        </div>
        <div>
          <span style="color: #d4d4d4">client</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4"
            >Timeout<span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">-</span
          ><span style="color: #b5cea8">1</span
          ><span style="color: #dcdcdc">;</span>
        </div>
        <div>
          <span style="color: #f92672">var</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>request<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">new</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>RestRequest</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">Method</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">GET</span
          ><span style="color: #dcdcdc">);</span>
        </div>
        <div>
          <span style="color: #d4d4d4">request</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">AddHeader</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #e6db74">"authorization"</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74">"keyclient"</span
          ><span style="color: #dcdcdc">);</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            >IRestResponse<span class="vscode-space"></span>response<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">=</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>client</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Execute</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">request</span
          ><span style="color: #dcdcdc">);</span>
        </div>
        <div>
          <span style="color: #d4d4d4">Console</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">WriteLine</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">response</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Content</span
          ><span style="color: #dcdcdc">);</span>
        </div>
      </div>
    </tab-pane>
    <tab-pane title="Java">
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #d4d4d4"
            >OkHttpClient<span class="vscode-space"></span>client<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">new</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>OkHttpClient</span
          ><span style="color: #dcdcdc">().</span
          ><span style="color: #d4d4d4">newBuilder</span
          ><span style="color: #dcdcdc">()</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">build</span
          ><span style="color: #dcdcdc">();</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            >Request<span class="vscode-space"></span>request<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">new</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>Request</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Builder</span
          ><span style="color: #dcdcdc">()</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">url</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #e6db74"
            >"https://api.real-pay.co{{endpoint}}"</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">method</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #e6db74">"GET"</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>null</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">addHeader</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #e6db74">"authorization"</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74">"keyclient"</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">build</span
          ><span style="color: #dcdcdc">();</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            >Response<span class="vscode-space"></span>response<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">=</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>client</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">newCall</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">request</span
          ><span style="color: #dcdcdc">).</span
          ><span style="color: #d4d4d4">execute</span
          ><span style="color: #dcdcdc">();</span>
        </div>
      </div>
    </tab-pane>
    <tab-pane title="CURL">
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #d4d4d4"
            >curl<span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">--</span
          ><span style="color: #d4d4d4"
            >location<span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">--</span
          ><span style="color: #d4d4d4"
            >request<span class="vscode-space"></span>GET<span
              class="vscode-space"
            ></span></span
          ><span style="color: #e6db74"
            >'https://api.real-pay.co{{endpoint}}'</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>\</span
          >
        </div>
        <div>
          <span style="color: #dcdcdc">--</span
          ><span style="color: #d4d4d4"
            >header<span class="vscode-space"></span></span
          ><span style="color: #e6db74"
            >'authorization:<span class="vscode-space"></span>keyclient'</span
          >
        </div>
      </div>
    </tab-pane>
    <tab-pane title="Go">
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #f92672">package</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>main</span
          >
        </div>
        <br />
        <div>
          <span style="color: #f92672">import</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">(</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #e6db74">"fmt"</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #e6db74">"net/http"</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #e6db74">"io/ioutil"</span>
        </div>
        <div><span style="color: #dcdcdc">)</span></div>
        <br />
        <div>
          <span style="color: #f92672">func</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>main</span
          ><span style="color: #dcdcdc">()</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>url<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">:=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74"
            >"https://api.real-pay.co{{endpoint}}"</span
          >
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>method<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">:=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74">"GET"</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>client<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">:=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">&amp;</span
          ><span style="color: #d4d4d4">http</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4"
            >Client<span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">}</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>req</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>err<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">:=</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>http</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">NewRequest</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">method</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>url</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">nil</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">if</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>err<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">!=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">nil</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>fmt</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Println</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">err</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">return</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">}</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>req</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Header</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Add</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #e6db74">"authorization"</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74">"keyclient"</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>res</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>err<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">:=</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>client</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Do</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">req</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">if</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>err<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">!=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">nil</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>fmt</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Println</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">err</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">return</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">}</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">defer</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>res</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Body</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Close</span
          ><span style="color: #dcdcdc">()</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>body</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>err<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">:=</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>ioutil</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">ReadAll</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">res</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Body</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">if</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>err<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">!=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">nil</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>fmt</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Println</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">err</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">return</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">}</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>fmt</span
          ><span style="color: #dcdcdc">.</span
          ><span style="color: #d4d4d4">Println</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #f92672">string</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">body</span
          ><span style="color: #dcdcdc">))</span>
        </div>
        <div><span style="color: #dcdcdc">}</span></div>
      </div>
    </tab-pane>
    <tab-pane title="Python">
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #f92672">import</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>requests</span
          >
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            >url<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span></span
          ><span style="color: #e6db74"
            >"https://api.real-pay.co{{endpoint}}"</span
          >
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4">payload=</span
          ><span style="color: #dcdcdc">{}</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            >headers<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #e6db74">'authorization'</span
          ><span style="color: #dcdcdc">:</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74">'keyclient'</span>
        </div>
        <div><span style="color: #dcdcdc">}</span></div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            >response<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >requests.request</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #e6db74">"GET"</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>url</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>headers=headers</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>data=payload</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <br />
        <div>
          <span style="color: #f92672">print</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">response.text</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <br />
      </div>
    </tab-pane>
    <tab-pane title="Swift">
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #f92672">import</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #3dc9b0">Foundation</span>
        </div>
        <br />
        <div>
          <span style="color: #f92672">var</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>semaphore<span
              class="vscode-space"
            ></span></span
          ><span style="color: #909090">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #3dc9b0">DispatchSemaphore</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">value</span
          ><span style="color: #909090">:</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #b5cea8">0</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <br />
        <div>
          <span style="color: #f92672">var</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>request<span
              class="vscode-space"
            ></span></span
          ><span style="color: #909090">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #3dc9b0">URLRequest</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">url</span
          ><span style="color: #909090">:</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #3dc9b0">URL</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">string</span
          ><span style="color: #909090">:</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74"
            >"https://api.real-pay.co{{endpoint}}"</span
          ><span style="color: #dcdcdc">)</span
          ><span style="color: #909090">!,</span
          ><span style="color: #d4d4d4">timeoutInterval</span
          ><span style="color: #909090">:</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #3dc9b0">Double</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #3dc9b0">infinity</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4">request.</span
          ><span style="color: #3dc9b0">addValue</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #e6db74">"keyclient"</span
          ><span style="color: #909090">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>forHTTPHeaderField</span
          ><span style="color: #909090">:</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74">"authorization"</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4">request.</span
          ><span style="color: #3dc9b0">httpMethod</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #909090">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #e6db74">"GET"</span>
        </div>
        <br />
        <div>
          <span style="color: #f92672">let</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>task<span
              class="vscode-space"
            ></span></span
          ><span style="color: #909090">=</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #3dc9b0">URLSession</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #3dc9b0">shared</span
          ><span style="color: #d4d4d4">.</span
          ><span style="color: #3dc9b0">dataTask</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">with</span
          ><span style="color: #909090">:</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>request</span
          ><span style="color: #dcdcdc">)</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>data</span
          ><span style="color: #909090">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>response</span
          ><span style="color: #909090">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>error<span
              class="vscode-space"
            ></span></span
          ><span style="color: #f92672">in</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span
          ></span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">guard</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #f92672">let</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>data<span
              class="vscode-space"
            ></span></span
          ><span style="color: #909090">=</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>data<span
              class="vscode-space"
            ></span></span
          ><span style="color: #f92672">else</span
          ><span style="color: #d4d4d4"><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">{</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>print</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #3dc9b0">String</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">describing</span
          ><span style="color: #909090">:</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>error</span
          ><span style="color: #dcdcdc">))</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>semaphore.</span
          ><span style="color: #3dc9b0">signal</span
          ><span style="color: #dcdcdc">()</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span><span class="vscode-space"></span
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #f92672">return</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span></span
          ><span style="color: #dcdcdc">}</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>print</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #3dc9b0">String</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">data</span
          ><span style="color: #909090">:</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>data</span
          ><span style="color: #909090">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>encoding</span
          ><span style="color: #909090">:</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>.</span
          ><span style="color: #3dc9b0">utf8</span
          ><span style="color: #dcdcdc">)</span
          ><span style="color: #909090">!</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            ><span class="vscode-space"></span
            ><span class="vscode-space"></span>semaphore.</span
          ><span style="color: #3dc9b0">signal</span
          ><span style="color: #dcdcdc">()</span>
        </div>
        <div><span style="color: #dcdcdc">}</span></div>
        <br />
        <div>
          <span style="color: #d4d4d4">task.</span
          ><span style="color: #3dc9b0">resume</span
          ><span style="color: #dcdcdc">()</span>
        </div>
        <div>
          <span style="color: #d4d4d4">semaphore.</span
          ><span style="color: #3dc9b0">wait</span
          ><span style="color: #dcdcdc">()</span>
        </div>
        <br />
      </div>
    </tab-pane>
    <tab-pane title="Ruby">
      <div class="vscode" style="white-space: pre">
        <div>
          <span style="color: #d4d4d4"
            >require<span class="vscode-space"></span></span
          ><span style="color: #e6db74">"uri"</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            >require<span class="vscode-space"></span></span
          ><span style="color: #e6db74">"net/http"</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            >url<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >URI</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #e6db74"
            >"https://api.real-pay.co{{endpoint}}"</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            >https<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >Net</span
          ><span style="color: #f92672">::</span
          ><span style="color: #d4d4d4">HTTP.new</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">url.host</span
          ><span style="color: #dcdcdc">,</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>url.port</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            >https.use_ssl<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span></span
          ><span style="color: #f92672">true</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            >request<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >Net</span
          ><span style="color: #f92672">::</span
          ><span style="color: #d4d4d4">HTTP</span
          ><span style="color: #f92672">::</span
          ><span style="color: #d4d4d4">Get.new</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">url</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4">request</span
          ><span style="color: #dcdcdc">[</span
          ><span style="color: #e6db74">"authorization"</span
          ><span style="color: #dcdcdc">]</span
          ><span style="color: #d4d4d4"
            ><span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span></span
          ><span style="color: #e6db74">"keyclient"</span>
        </div>
        <br />
        <div>
          <span style="color: #d4d4d4"
            >response<span class="vscode-space"></span>=<span
              class="vscode-space"
            ></span
            >https.request</span
          ><span style="color: #dcdcdc">(</span
          ><span style="color: #d4d4d4">request</span
          ><span style="color: #dcdcdc">)</span>
        </div>
        <div>
          <span style="color: #d4d4d4"
            >puts<span class="vscode-space"></span>response.read_body</span
          >
        </div>
        <br />
      </div>
    </tab-pane>
  </tabs>
</template>

<script>
export default {
  props: ["endpoint"],
};
</script>