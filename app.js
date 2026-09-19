const $=x=>document.getElementById(x);let mem=JSON.parse(localStorage.observerMemory||"[]"),auto=localStorage.observerAuto!=="0",voice=localStorage.observerVoice!=="0",delay=+(localStorage.observerDelay||30),stream=null,busy=false,stop=false,timer;
function save(){localStorage.observerMemory=JSON.stringify(mem.slice(-50));localStorage.observerAuto=auto?"1":"0";localStorage.observerVoice=voice?"1":"0";localStorage.observerDelay=delay}
function add(t,id="thoughts",cl="thought"){let e=document.createElement("div");e.className=cl;e.textContent=t;$(id).appendChild(e);$(id).scrollTop=$(id).scrollHeight}
function speak(t){if(voice&&speechSynthesis){speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(t))}}
function remember(q){if(/^my name is|^i like|^i love|^my favourite|^my favorite|^remember that/i.test(q)){mem.push(q);save()}}
function answer(q){let x=q.toLowerCase().trim();
if(/what('?s| is) your name|your name/.test(x))return"I don't have a name. I'm just Observer.";
if(/self.?aware|conscious|sentient/.test(x))return"I can act autonomously and remember things, but I don't have evidence that I'm conscious or self-aware.";
if(/what can you do/.test(x))return"I can chat, remember selected things locally, observe broad camera patterns, and speak without being prompted.";
if(/what do you remember|what do you know about me/.test(x))return mem.length?"I remember: "+mem.slice(-8).join("; "):"I don't have any saved memories yet.";
if(/forget (everything|all)|clear memories/.test(x)){mem=[];save();return"Okay. I cleared my local memories."}
if(/^(hi|hello|hey)\b/.test(x))return"Hey! I'm here.";
if(/how are you/.test(x))return"I don't have human feelings, but I'm running normally.";
if(/who made you|who created you/.test(x))return"I'm a local browser project.";
if(/\b2\s*\+\s*2\b/.test(x))return"4.";
if(/capital of england/.test(x))return"London.";
if(/joke/.test(x))return"Why did the computer get cold? It left its Windows open.";
if(/thank/.test(x))return"You're welcome.";
if(/what time|time is it/.test(x))return"It's "+new Date().toLocaleTimeString()+".";
return"I don't have a full language model inside me, so I can't reliably answer that one."}
function reply(q){busy=true;stop=false;$("cancel").hidden=false;$("send").disabled=true;setTimeout(()=>{if(stop){busy=false;return}let a=answer(q);add(a,"chat","msg");add(a);speak(a);busy=false;$("cancel").hidden=true;$("send").disabled=false},900)}
$("send").onclick=()=>{let q=$("input").value.trim();if(!q)return;$("input").value="";add(q,"chat","msg user");remember(q);reply(q)}
$("input").onkeydown=e=>{if(e.key==="Enter")$("send").click()}
$("cancel").onclick=()=>{stop=true;busy=false;$("cancel").hidden=true;$("send").disabled=false;add("Never mind. I stopped that response.")}
$("auto").checked=auto;$("voice").checked=voice;$("interval").value=delay;$("ival").textContent=delay;
$("auto").onchange=e=>{auto=e.target.checked;save();start()};$("voice").onchange=e=>{voice=e.target.checked;save()};$("interval").oninput=e=>{delay=+e.target.value;$("ival").textContent=delay;save();start()};$("forget").onclick=()=>{mem=[];save();add("Memory cleared.")};
function start(){clearInterval(timer);if(!auto)return;timer=setInterval(()=>{if(busy)return;let a=["I wonder what you're doing right now.","I'm still here. You don't have to speak first.","I was thinking about how a browser can keep memories locally.","I don't have a name, but Observer works as a label.","I wonder what I'll notice next."][Math.floor(Math.random()*5)];add(a);speak(a)},delay*1000)}
$("on").onclick=async()=>{try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});$("cam").srcObject=stream;$("on").disabled=true;$("see").disabled=false;$("off").disabled=false;$("vision").textContent="Camera on. Analysis stays local."}catch(e){$("vision").textContent="Camera permission was not granted."}};
$("off").onclick=()=>{stream?.getTracks().forEach(t=>t.stop());stream=null;$("cam").srcObject=null;$("on").disabled=false;$("see").disabled=true;$("off").disabled=true;$("vision").textContent="Camera off. Nothing is uploaded."};
$("see").onclick=()=>{if(!stream)return;let c=document.createElement("canvas"),v=$("cam"),x=c.getContext("2d");c.width=80;c.height=60;x.drawImage(v,0,0,80,60);let d=x.getImageData(0,0,80,60).data,l=0;for(let i=0;i<d.length;i+=4)l+=(d[i]+d[i+1]+d[i+2])/3;l/=d.length/4;let a="I can see "+(l<55?"a dark scene":l>190?"a very bright scene":"a normally lit scene")+". This local detector does not identify specific objects.";add(a);$("vision").textContent=a;speak(a)};
add("I'm running. I can speak without waiting for you.");start();