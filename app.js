document.addEventListener("DOMContentLoaded", () => {
 const form=document.getElementById("chatForm"), input=document.getElementById("messageInput"), messages=document.getElementById("messages"), clearBtn=document.getElementById("clearBtn"), newChatBtn=document.getElementById("newChatBtn"), quick=document.getElementById("quickPrompts");
 const KEY="chatspace_simulation_messages_v1";
 const initial=[{role:"bot",text:"Hi there! 👋 I'm Nova, your demo assistant. Ask me something or choose a quick prompt below.",time:"Just now"}];
 let history=[];
 try{history=JSON.parse(localStorage.getItem(KEY)||"[]");if(!Array.isArray(history))history=[];}catch{history=[];}
 const timeNow=()=>new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
 const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 function save(){try{localStorage.setItem(KEY,JSON.stringify(history));}catch(e){console.warn("History could not be saved",e);}}
 function renderMessage(m){const row=document.createElement("div");row.className="message-row "+(m.role==="user"?"user-row":"bot-row");
 row.innerHTML=(m.role==="bot"?'<div class="bot-avatar small">✦</div>':'')+`<div class="message-content"><div class="bubble ${m.role==="user"?"user-bubble":"bot-bubble"}">${escapeHTML(m.text).replace(/\n/g,"<br>")}</div><time>${escapeHTML(m.time||timeNow())}</time></div>`;
 messages.appendChild(row);messages.scrollTop=messages.scrollHeight;}
 function renderAll(){messages.innerHTML='<div class="day-divider"><span>Today</span></div>';[...initial,...history].forEach(renderMessage);}
 function add(role,text){const m={role,text,time:timeNow()};history.push(m);save();renderMessage(m);}
 function responseFor(text){const t=text.toLowerCase();
 if(/hello|hi\b|hey|good morning|good evening/.test(t))return "Hey! 😊 Nice to chat with you. What would you like to explore today?";
 if(/what can you do|help|features/.test(t))return "I can respond to greetings, share a fun fact, explain basic JavaScript concepts, and demonstrate how a chat interface works. Try one of the quick prompts!";
 if(/fun fact|fact/.test(t))return "Fun fact ✨: JavaScript was created in just 10 days in 1995! Today, it powers interactive experiences across the web.";
 if(/javascript|js\b/.test(t))return "JavaScript makes web pages interactive. In this chat simulation, we use event listeners, DOM manipulation, arrays, objects, and LocalStorage. Want to know about any one of these?";
 if(/time|clock|date/.test(t))return "Your device's current time is "+new Date().toLocaleString()+". I can show this because the chat runs in your browser.";
 if(/thank/.test(t))return "You're welcome! 😊 Happy to help.";
 if(/who are you|your name/.test(t))return "I'm Nova, a simple rule-based assistant created for a Web Technology chat window simulation.";
 if(/bye|goodbye|see you/.test(t))return "Goodbye! 👋 Thanks for trying this chat simulation.";
 if(/html|css/.test(t))return "HTML defines the structure of a page, CSS controls its appearance, and JavaScript adds behavior. Together they create interactive web experiences.";
 return "That's interesting! 💬 I'm a simulated assistant, so my replies are based on a small set of JavaScript rules. Try asking about JavaScript, HTML, a fun fact, or say hello."; }
 function showTyping(){const el=document.createElement("div");el.className="message-row bot-row";el.id="typingIndicator";el.innerHTML='<div class="bot-avatar small">✦</div><div class="typing"><span></span><span></span><span></span></div>';messages.appendChild(el);messages.scrollTop=messages.scrollHeight;return el;}
 function send(text){const value=text.trim();if(!value)return;add("user",value);input.value="";input.focus();quick.style.display="none";const typing=showTyping();setTimeout(()=>{typing.remove();add("bot",responseFor(value));},650);}
 form.addEventListener("submit",e=>{e.preventDefault();send(input.value);});
 quick.addEventListener("click",e=>{const b=e.target.closest("button[data-message]");if(b)send(b.dataset.message);});
 function clearChat(){history=[];save();renderAll();quick.style.display="flex";input.focus();}
 clearBtn.addEventListener("click",clearChat);newChatBtn.addEventListener("click",clearChat);
 document.querySelector(".attach-btn").addEventListener("click",()=>{add("bot","Attachment upload is not enabled in this frontend simulation.");});
 renderAll();if(history.length)quick.style.display="none";
});