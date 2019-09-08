!function(t){var e={};function s(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(i,a,function(e){return t[e]}.bind(null,a));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=2)}([function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return Sound});var jsfxr__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1),jsfxr__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(jsfxr__WEBPACK_IMPORTED_MODULE_0__);class Oscillator{constructor(){window.AudioContext=window.AudioContext||window.webkitAudioContext;let t=new AudioContext;this.oscillator=t.createOscillator(),this.gainNode=t.createGain(),this.oscillator.connect(this.gainNode),this.gainNode.connect(t.destination),this.gainNode.gain.value=0,this.oscillator.start(0)}on({frequency:t,type:e,volume:s}){this.oscillator.type=e,this.gainNode.gain.value=s,this.oscillator.frequency.value=t}off(){this.gainNode.gain.value=0}kill(){this.oscillator.stop(0)}play({volume:t,frequency:e,duration:s,type:i}){this.oscillator.type=i,this.oscillator.frequency.value=e,this.gainNode.gain.value=t,setTimeout(()=>this.gainNode.gain.value=0,s)}}class Sound{constructor(){this.state={engine:!1}}engineOn(){this.state.engine||(this.state.engine=!0,this.engine=this.engine||new Oscillator,this.engine.on({frequency:50,type:"triangle",volume:.2}))}engineOff(){this.state.engine&&(this.state.engine=!1,this.engine.off(),this.engine=null)}playSound(url){const soundUrl=jsfxr__WEBPACK_IMPORTED_MODULE_0___default()(eval(url));let player=new Audio;player.src=soundUrl,player.play()}mainLaser(){this.playSound("[2,,0.1749,,0.3063,0.713,0.2,-0.2645,,,,,,0.0543,0.1546,,,,1,,,,,0.5]")}secondaryLaser(){this.playSound("[2,,0.1426,,0.2251,0.7799,0.2555,-0.2285,,,,,,0.7631,-0.4501,,,,1,,,0.0846,,0.5]")}missile(){this.playSound("[3,,0.0937,0.571,0.3803,0.7495,,,,,,,,,,,,,1,,,,,0.5]")}projectileHit(){this.playSound("[3,,0.0867,,0.2283,0.2711,,-0.6853,,,,,,,,,,,1,,,,,0.5]")}enemyLaser(){this.playSound("[0,,0.2934,0.1381,0.2143,0.6919,0.3422,-0.2379,,,,,,0.4281,-0.6711,,,,1,,,0.194,,0.5]")}}},function(t,e,s){function i(){this.setSettings=function(t){for(var e=0;e<24;e++)this[String.fromCharCode(97+e)]=t[e]||0;this.c<.01&&(this.c=.01);var s=this.b+this.c+this.e;if(s<.18){var i=.18/s;this.b*=i,this.c*=i,this.e*=i}}}var a=new function(){var t,e,s,a,r,o,h,n,l,d,c,y;this._params=new i,this.reset=function(){var t=this._params;a=100/(t.f*t.f+.001),r=100/(t.g*t.g+.001),o=1-t.h*t.h*t.h*.01,h=-t.i*t.i*t.i*1e-6,t.a||(c=.5-t.n/2,y=5e-5*-t.o),n=1+t.l*t.l*(t.l>0?-.9:10),l=0,d=1==t.m?0:(1-t.m)*(1-t.m)*2e4+32},this.totalReset=function(){this.reset();var i=this._params;return t=i.b*i.b*1e5,e=i.c*i.c*1e5,s=i.e*i.e*1e5+12,3*((t+e+s)/3|0)},this.synthWave=function(i,u){var p=this._params,x=1!=p.s||p.v,w=p.v*p.v*.1,f=1+3e-4*p.w,m=p.s*p.s*p.s*.1,g=1+1e-4*p.t,v=1!=p.s,M=p.x*p.x,C=p.g,S=p.q||p.r,_=p.r*p.r*p.r*.2,k=p.q*p.q*(p.q<0?-1020:1020),b=p.p?32+((1-p.p)*(1-p.p)*2e4|0):0,j=p.d,E=p.j/2,L=p.k*p.k*.01,A=p.a,D=t,z=1/t,O=1/e,P=1/s,T=5/(1+p.u*p.u*20)*(.01+m);T>.8&&(T=.8),T=1-T;for(var B,q,R,Y,F,I,N=!1,X=0,U=0,H=0,W=0,K=0,G=0,J=0,Q=0,V=0,Z=0,$=new Array(1024),tt=new Array(32),et=$.length;et--;)$[et]=0;for(et=tt.length;et--;)tt[et]=2*Math.random()-1;for(et=0;et<u;et++){if(N)return et;if(b&&++V>=b&&(V=0,this.reset()),d&&++l>=d&&(d=0,a*=n),(a*=o+=h)>r&&(a=r,C>0&&(N=!0)),q=a,E>0&&(Z+=L,q*=1+Math.sin(Z)*E),(q|=0)<8&&(q=8),A||((c+=y)<0?c=0:c>.5&&(c=.5)),++U>D)switch(U=0,++X){case 1:D=e;break;case 2:D=s}switch(X){case 0:H=U*z;break;case 1:H=1+2*(1-U*O)*j;break;case 2:H=1-U*P;break;case 3:H=0,N=!0}S&&((R=0|(k+=_))<0?R=-R:R>1023&&(R=1023)),x&&f&&((w*=f)<1e-5?w=1e-5:w>.1&&(w=.1)),I=0;for(var st=8;st--;){if(++J>=q&&(J%=q,3==A))for(var it=tt.length;it--;)tt[it]=2*Math.random()-1;switch(A){case 0:F=J/q<c?.5:-.5;break;case 1:F=1-J/q*2;break;case 2:F=.225*(((F=1.27323954*(Y=6.28318531*((Y=J/q)>.5?Y-1:Y))+.405284735*Y*Y*(Y<0?1:-1))<0?-1:1)*F*F-F)+F;break;case 3:F=tt[Math.abs(32*J/q|0)]}x&&(B=G,(m*=g)<0?m=0:m>.1&&(m=.1),v?(K+=(F-G)*m,K*=T):(G=F,K=0),W+=(G+=K)-B,F=W*=1-w),S&&($[Q%1024]=F,F+=$[(Q-R+1024)%1024],Q++),I+=F}I*=.125*H*M,i[et]=I>=1?32767:I<=-1?-32768:32767*I|0}return u}};t.exports=function(t){a._params.setSettings(t);var e=a.totalReset(),s=new Uint8Array(4*((e+1)/2|0)+44),i=2*a.synthWave(new Uint16Array(s.buffer,44),e),r=new Uint32Array(s.buffer,0,44);r[0]=1179011410,r[1]=i+36,r[2]=1163280727,r[3]=544501094,r[4]=16,r[5]=65537,r[6]=44100,r[7]=88200,r[8]=1048578,r[9]=1635017060,r[10]=i,i+=44;for(var o=0,h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n="data:audio/wav;base64,";o<i;o+=3){var l=s[o]<<16|s[o+1]<<8|s[o+2];n+=h[l>>18]+h[l>>12&63]+h[l>>6&63]+h[63&l]}return n}},function(t,e,s){"use strict";s.r(e);let i=null;class a{constructor(t){this.canvas=t,i=this.canvas.getContext("2d"),this.camera={x:0,y:0}}cameraAdjustX(t){return t-this.camera.x+this.canvas.width/2}cameraAdjustY(t){return t-this.camera.y+this.canvas.height/2}draw(t){i.save(),t(),i.restore()}clearBackground(){i.clearRect(0,0,this.canvas.width,this.canvas.height)}drawBackground(t){i.fillStyle=t,i.fillRect(0,0,this.canvas.width,this.canvas.height)}rect({rect:t,fillColor:e,shadowBlur:s,shadowColor:a,adjusted:r=!0,rotation:o,size:h}){r&&(t[0]=this.cameraAdjustX(t[0]),t[1]=this.cameraAdjustY(t[1])),o&&(i.translate(t[0]+h/2,t[1]+h/2),i.rotate(o),i.translate(-1*t[0]-h/2,-1*t[1]-h/2)),i.fillStyle=e,i.shadowBlur=s,i.shadowColor=a,i.fillRect(t[0],t[1],...t.slice(2))}arc({arc:t,fillColor:e,strokeColor:s,shadowBlur:a,shadowColor:r}){i.beginPath(),i.arc(this.cameraAdjustX(t[0]),this.cameraAdjustY(t[1]),...t.slice(2)),i.shadowBlur=a,i.shadowColor=r,e&&(i.fillStyle=e,i.fill()),s&&(i.strokeStyle=s,i.stroke())}text({text:t,x:e,y:s,size:a="14px",font:r="Courier",letterSpacing:o=!1,adjusted:h=!0,filter:n}){h&&(e=this.cameraAdjustX(e),s=this.cameraAdjustY(s)),n&&(i.filter=n),i.font=a+" "+r,t=o?t.split("").join(" "):t,i.fillStyle="#fff",i.fillText(t,e,s)}lines({lines:t,shadowBlur:e=0,shadowColor:s,rotation:a,x:r,y:o,fillColor:h,strokeColor:n}){a&&(i.translate(this.cameraAdjustX(r),this.cameraAdjustY(o)),i.rotate(a),i.translate(-1*this.cameraAdjustX(r),-1*this.cameraAdjustY(o))),i.beginPath(),i.moveTo(this.cameraAdjustX(t[0][0]),this.cameraAdjustY(t[0][1])),t.slice(1).map(t=>i.lineTo(this.cameraAdjustX(t[0]),this.cameraAdjustY(t[1]))),i.closePath(),i.shadowBlur=e,i.shadowColor=s,n&&(i.strokeStyle=n,i.stroke()),h&&(i.fillStyle=h,i.fill())}hitbox({x:t,y:e,size:s}){this.rect({rect:[t-s/2,e-s/2,s,s],color:"#f00"})}}let r=document.getElementById("c");class o{constructor(){this.canvas=r}initialize(){let t=document.querySelector("body");const e=e=>{t.clientWidth/t.clientHeight>640/480?(r.style.height="100vh")&&(r.style.width="auto"):(r.style.height="auto")&&(r.style.width="100vw")};e(),t.onresize=e}}var h=class{constructor(){document.addEventListener("keyup",t=>this.onKeyup(t)),document.addEventListener("keydown",t=>this.onKeydown(t)),this._pressed={},this.ENTER=13,this.SPACE=32,this.LEFT=37,this.UP=38,this.RIGHT=39,this.DOWN=40}isDown(t){return this._pressed[t]}onKeydown(t){this._pressed[t.keyCode]=!0}onKeyup(t){delete this._pressed[t.keyCode]}},n=s(0);class l{constructor(){new Worker("./src/sound-box-worker.js").onmessage=function(t){let e=t.data,s=document.createElement("audio");s.src=URL.createObjectURL(new Blob([e],{type:"audio/wav"})),s.volume=.5,s.loop=!0,function t(e){e.then(t=>{}).catch(e=>{setTimeout(()=>{let e=s.play();t(e)},1e3)})}(s.play())}}}class d{handle(t,e){return!t.exploding&&!e.exploding&&t.x<e.x+e.size/2&&t.x+t.size>e.x-e.size/2&&t.y<e.y+e.size/2&&t.y+t.size>e.y-e.size/2&&(t.destroy(),e.takeDamage(t),!0)}}let c=[],y=[];function u(t,e){return(t%e+e)%e}class p{constructor({cw:t,ch:e}){for(let s=0;s<100;s++)c.push([Math.random()*t,Math.random()*e,Math.random()]);for(let s=0;s<100;s++)y.push([Math.random()*t,Math.random()*e,Math.random()])}draw(t){t.draw(()=>{t.drawBackground("#111"),c.map(e=>t.rect({rect:[u(e[0]-t.camera.x/(3+3*e[2]),t.canvas.width),u(e[1]-t.camera.y/(3+3*e[2]),t.canvas.height),1,1],fillColor:"rgba(255, 255, 255, 0.6)",adjusted:!1})),y.map(e=>t.rect({rect:[u(e[0]-t.camera.x/(7+3*e[2]),t.canvas.width),u(e[1]-t.camera.y/(7+3*e[2]),t.canvas.height),1,1],fillColor:"rgba(255, 255, 255, 0.3)",adjusted:!1})),t.text({text:"back to earth",x:-145,y:-95,size:"36px",font:"serif",letterSpacing:!0}),t.text({text:"Arrow keys to move. SPACE to shoot.",x:-145,y:105}),t.text({text:"ENTER to land back on earth.",x:-115,y:130}),t.text({text:"Shoot things. Collect ore. Upgrade weapons.",x:-178,y:155})})}}class x{constructor(){this.compasses=[{x:0,y:0,theta:0,color:"#4f4",visible:!1}]}tick(t){this.compasses=this.compasses.map(e=>(e.visible=Math.sqrt(t.getX()*t.getX()+t.getY()*t.getY())>400,e.theta=Math.atan2(t.getY(),t.getX()),e))}draw(t){this.compasses.forEach(e=>e.visible&&t.draw(()=>{t.rect({rect:[-230*Math.cos(e.theta)+320,-230*Math.sin(e.theta)+240,5,5],fillColor:e.color,adjusted:!1})}))}}class w{constructor(){this.timeout=15}tick(t,e,s,i){if(t.isDown(t.ENTER)&&this.timeout<0){if(this.timeout=15,e.landed=!1,e.timeout=15,e.setDx(0),e.setDy(0),s.initializeAsteroids(),e.heal(),e.level>=1)for(let t=0;t<5;t++)i.addEnemy((300+300*Math.random())*(2*Math.round(Math.random())-1)+e.getX(),(300+300*Math.random())*(2*Math.round(Math.random())-1)+e.getY());if(e.level>=2)for(let t=0;t<20;t++)i.addEnemy((300+300*Math.random())*(2*Math.round(Math.random())-1)+e.getX(),(300+300*Math.random())*(2*Math.round(Math.random())-1)+e.getY())}if(this.timeout-=1,t.isDown(t.SPACE)&&this.timeout<0){if(this.timeout=15,e.level>=e.shipLevels.length-1)return;let t=e.shipLevels[e.level+1].cost;e.ore>=t&&(e.ore-=t,e.setLevel(e.level+1))}}draw(t,e){t.draw(()=>{if(t.rect({rect:[0,0,640,480],fillColor:"rgba(0, 0, 0, 0.6)",adjusted:!1}),t.rect({rect:[150,90,340,300],fillColor:"#fff",adjusted:!1}),t.rect({rect:[151,91,338,298],fillColor:"#000",shadowBlur:2,shadowColor:"#fff",adjusted:!1}),t.text({text:"Welcome to Earth",x:210,y:140,size:"20px",font:"serif",letterSpacing:!0,adjusted:!1}),e.level>=e.shipLevels.length-1)t.text({text:"You have all ship upgrades",x:245,y:180,adjusted:!1});else{let s=e.shipLevels[e.level+1].cost;t.text({text:"If you have "+s+" ore,",x:245,y:180,adjusted:!1}),t.text({text:"you may upgrade your ship",x:215,y:205,adjusted:!1}),t.text({text:"by pressing SPACE",x:247,y:230,adjusted:!1}),t.text({text:"You have "+e.ore+" ore",x:260,y:270,adjusted:!1})}t.text({text:"Leave Earth by pressing ENTER",x:195,y:360,adjusted:!1})})}}class f{draw(t){t.draw(()=>{t.text({text:"🌎",x:-65,y:35,size:"100px",color:"blue",filter:"contrast(75%) brightness(60%) saturate(40%) hue-rotate(-10deg)"})})}}let m={"main-laser":{color:"#f66",shadowColor:"#f00",speed:4,lifeSpan:4},"enemy-laser":{color:"#a0f",shadowColor:"#a0f",speed:4,lifeSpan:4},"secondary-laser":{color:"#f6f",shadowColor:"#f0f",speed:10,lifeSpan:1,line:8},missile:{type:"missile",color:"#ff0",shadowColor:"#ff0",speed:.8,lifeSpan:10,maxSpeed:5}};class g{constructor({x:t,y:e,yaw:s,damage:i,type:a,owner:r,target:o}){this.type=m[a],this.x=t,this.y=e,this.yaw=s,this.owner=r,this.lifeSpan=1e3*this.type.lifeSpan/60,this.size=1,this.shouldDie=!1,this.damage=i,this.exploding=!1,this.dx=Math.sin(this.yaw)*this.type.speed,this.dy=-Math.cos(this.yaw)*this.type.speed,this.target=o}tick(){if(this.lifeSpan-=1,this.lifeSpan<=0&&(this.shouldDie=!0),!this.exploding){if("missile"===this.type.type){let t,e;if(this.target&&!this.target.exploding&&this.lifeSpan<1e3*(this.type.lifeSpan-.5)/60){t=this.x-this.target.x,e=this.y-this.target.y;let s=Math.sqrt(t*t+e*e);t=t/s*this.type.speed,e=e/s*this.type.speed}else t=this.dx*-this.type.speed,e=this.dy*-this.type.speed;this.dx-=t,this.dy-=e;let s=Math.sqrt(this.dx*this.dx+this.dy*this.dy);s>this.type.maxSpeed&&(this.dx=this.dx/s*this.type.maxSpeed,this.dy=this.dy/s*this.type.maxSpeed)}this.x+=this.dx,this.y+=this.dy}}destroy(){this.exploding=!0,this.lifeSpan=2}draw(t){t.draw(()=>{this.exploding?t.arc({arc:[this.x,this.y,4/this.lifeSpan,0,2*Math.PI],fillColor:"#ff8",shadowBlur:10,shadowColor:"#ff0"}):this.type.line?t.rect({rect:[this.x,this.y,1,this.type.line],fillColor:this.type.color,shadowBlur:2,shadowColor:this.type.shadowColor,rotation:this.yaw,size:1}):t.rect({rect:[this.x,this.y,2,2],fillColor:this.type.color,shadowBlur:2,shadowColor:this.type.shadowColor})})}}class v{constructor({x:t,y:e,color:s="#fff"}){this.x=t,this.y=e,this.color=s,this.dx=4*Math.random()-2,this.dy=4*Math.random()-2,this.shouldDie=!1,this.exploding=!1}tick(){this.x+=this.dx,this.y+=this.dy}draw(t){t.draw(()=>{t.rect({rect:[this.x,this.y,2,2],fillColor:this.color,shadowBlur:2,shadowColor:this.color})})}}let M=[{draw:(t,e,s,i,a)=>{t.draw(()=>{t.rect({rect:[e-i/2,s-i/2,i,i],fillColor:"#fff",rotation:a,size:i})})},acceleration:.01,turnSpeed:.05,maxSpeed:1,weapons:["enemy-laser"],mainLaserCooldown:.5,health:5,bounty:100,size:20}];class C{constructor(t,e,s){this.x=e,this.y=s,this.dx=0,this.dy=0,this.yaw=0,this.shouldDie=!1,this.exploding=!1,this.type=t,this.projectiles=[],this.size=t.size,this.acceleration=t.acceleration,this.maxSpeed=t.maxSpeed,this.turnSpeed=t.turnSpeed,this.health=t.health,this.bounty=t.bounty,this.engineOn=!0,this.mainLaserCanFire=t.weapons.includes("enemy-laser"),this.mainLaserCooldown=t.mainLaserCooldown}takeDamage({damage:t,dx:e,dy:s,owner:i}){this.dx+=e/30,this.dy+=s/30,this.health-=t,this.health<=0&&(this.exploding=!0,this.debris=Array(20).fill().map(t=>new v({x:this.x,y:this.y,color:"#aa3"})).concat(Array(20).fill().map(t=>new v({x:this.x,y:this.y,color:"#a33"}))),this.lifeSpan=80,i.ore+=this.bounty)}weaponsTick(t){this.mainLaserCanFire&&(this.projectiles.push(new g({x:this.x,y:this.y,yaw:this.yaw,damage:1,type:"enemy-laser",owner:this})),this.mainLaserCanFire=!1,window.setTimeout(()=>this.mainLaserCanFire=!0,1e3*this.mainLaserCooldown),t.enemyLaser())}tick(t,e){if(this.projectiles.map(t=>t.tick()),this.projectiles=this.projectiles.filter(t=>!t.shouldDie),this.exploding)this.lifeSpan-=1,this.debris.map(t=>t.tick()),this.lifeSpan<=0&&(this.shouldDie=!0);else{let s=Math.atan2(e.getX()-this.x,-e.getY()+this.y);if(this.yaw+=this.yaw-s>0?-this.turnSpeed:this.turnSpeed,this.yaw%=2*Math.PI,this.engineOn=!0,this.engineOn){this.dx+=Math.sin(this.yaw)*this.acceleration,this.dy+=Math.cos(this.yaw)*-this.acceleration;let t=Math.sqrt(this.dx*this.dx+this.dy*this.dy);t>this.maxSpeed&&(this.dx=this.dx/t*this.maxSpeed,this.dy=this.dy/t*this.maxSpeed)}let i=Math.sqrt((this.x-e.x)*(this.x-e.x)+(this.y-e.y)*(this.y-e.y));!e.exploding&&i<320&&this.weaponsTick(t,[e])}this.x+=this.dx,this.y+=this.dy}draw(t){this.projectiles.map(e=>e.draw(t)),this.exploding?(this.debris.map(e=>e.draw(t)),t.draw(()=>{t.arc({arc:[this.x+20*Math.random()-10,this.y+20*Math.random()-10,2+6*Math.random(),0,2*Math.PI],strokeColor:"rgb(255,"+Math.floor(155*Math.random()+100)+","+Math.floor(50*Math.random())+")",shadowBlur:10,shadowColor:"#f00"})})):this.type.draw(t,this.x,this.y,this.size,this.yaw)}}class S{constructor(){this.enemies=[]}addEnemy(t,e){this.enemies.push(new C(M[0],t,e))}tick(t,e){this.enemies.forEach(s=>s.tick(t,e)),this.enemies=this.enemies.filter(t=>!t.shouldDie)}draw(t){this.enemies.forEach(e=>e.draw(t))}}class _{tick(){}draw(t){t.draw(()=>{t.drawBackground("rgba(0,0,0,0.85)"),t.text({text:"game over",x:170,y:200,size:"48px",font:"serif",adjusted:!1,letterSpacing:!0})})}}class k{constructor(){this.ore=0}tick(t){this.ore=t.ore,this.health=t.health}draw(t){t.draw(()=>{this.ore>0&&t.text({text:"ore: "+this.ore,x:"305",y:"20",size:"11px",adjusted:!1}),t.text({text:"health: "+this.health,x:"305",y:"40",size:"11px",adjusted:!1})})}}let b=[{turnSpeed:.05,maxSpeed:1,acceleration:.01,size:10,mainLaserCooldown:.3,mainLaserCanFire:!0,health:10},{cost:100,turnSpeed:.07,maxSpeed:2,acceleration:.03,size:15,mainLaserCooldown:.3,mainLaserCanFire:!0,secondaryLaserCooldown:.2,secondaryLaserCanFire:!0,health:20},{cost:400,turnSpeed:.09,maxSpeed:3,acceleration:.2,size:20,mainLaserCooldown:.3,mainLaserCanFire:!0,secondaryLaserCooldown:.2,secondaryLaserCanFire:!0,missileCooldown:.2,missileCanFire:!0,health:40}],j=3.4,E=.05,L=1,A=.01,D=10,z=.3,O=!0,P=!1,T=1,B=.2,q=!1,R=1,Y=.2,F={engineOn:!1},I=0;function N(t,e,s,i){let a=null,r=99999999;return s.forEach(s=>{if(s.exploding)return;let o=s.x-t,h=s.y-e,n=Math.sqrt(o*o+h*h);n>i||n<r&&(a=s,r=n)}),a}class X{constructor(){this.x=100,this.y=-400,this.dx=-.1,this.dy=.5,this.projectiles=[],this.landed=!1,this.ore=0,this.timeout=0,this.level=0,this.shipLevels=b,this.health=10,this.exploding=!1,this.size=D}getX(){return this.x}getY(){return this.y}setDx(t){this.dx=t}setDy(t){this.dy=t}takeDamage({damage:t,dx1:e,dy1:s}){this.health-=t,this.health<=0&&(this.exploding=!0,this.debris=Array(100).fill().map(t=>new v({x:this.x,y:this.y,color:"#aa3"})).concat(Array(100).fill().map(t=>new v({x:this.x,y:this.y,color:"#a33"}))),this.lifeSpan=80)}heal(){this.health=b[this.level].health}setLevel(t){({turnSpeed:E,maxSpeed:L,acceleration:A,size:D,mainLaserCooldown:z,mainLaserCanFire:O,secondaryLaserCooldown:B,secondaryLaserCanFire:P,missileCooldown:Y,missileCanFire:q}=b[t]),this.level=t}weaponsTick(t,e,s){t.isDown(t.SPACE)&&(O&&(this.projectiles.push(new g({x:this.x,y:this.y,yaw:j,damage:1,type:"main-laser",owner:this})),O=!1,window.setTimeout(()=>O=!0,1e3*z),e.mainLaser()),P&&(this.projectiles.push(new g({x:T*Math.cos(j)*(D/2)+this.x,y:T*Math.sin(j)*(D/2)+this.y,yaw:j,damage:1,type:"secondary-laser",owner:this})),T*=-1,P=!1,window.setTimeout(()=>P=!0,1e3*B),e.secondaryLaser()),q&&(this.projectiles.push(new g({x:R*Math.cos(j)*(D/2)+this.x,y:R*Math.sin(j)*(D/2)+this.y,yaw:j+Math.PI/2*R,damage:1,type:"missile",owner:this,target:N(this.x,this.y,s,260)})),R*=-1,q=!1,window.setTimeout(()=>q=!0,1e3*Y),e.missile()))}tick(t,e,s,i){if(this.projectiles.map(t=>t.tick()),this.projectiles=this.projectiles.filter(t=>!t.shouldDie),this.exploding)this.lifeSpan-=1,this.debris.map(t=>t.tick()),this.lifeSpan<=0&&(this.death=!0);else{if(this.timeout<0&&t.isDown(t.ENTER)&&(this.landed=!0),this.timeout-=1,I+=1,t.isDown(t.LEFT)&&(j-=E),t.isDown(t.RIGHT)&&(j+=E),F.engineOn=t.isDown(t.UP),F.engineOn){this.dx+=Math.sin(j)*A,this.dy+=Math.cos(j)*-A;let t=Math.sqrt(this.dx*this.dx+this.dy*this.dy);t>L&&(this.dx=this.dx/t*L,this.dy=this.dy/t*L),e.engineOn()}else e.engineOff();this.weaponsTick(t,e,i),this.x+=this.dx,this.y+=this.dy,s.camera.x=this.x,s.camera.y=this.y}}draw(t){if(this.projectiles.map(e=>e.draw(t)),this.exploding)this.debris.map(e=>e.draw(t)),t.draw(()=>{t.arc({arc:[this.x+20*Math.random()-10,this.y+20*Math.random()-10,2+6*Math.random(),0,2*Math.PI],strokeColor:"rgb(255,"+Math.floor(155*Math.random()+100)+","+Math.floor(50*Math.random())+")",shadowBlur:10,shadowColor:"#f00"})});else{F.engineOn&&this.drawEngine(t);let e=this.x*this.x+this.y*this.y;e<3600&&this.drawHalo(t,e),t.draw(()=>{t.lines({x:this.x,y:this.y,lines:[[this.x,this.y-7],[this.x+5,this.y+5],[this.x-5,this.y+5]],rotation:j,fillColor:"#070"})})}}drawEngine(t){t.draw(()=>{t.lines({x:this.x,y:this.y,lines:[[this.x+-.5*D,this.y+.5*D],[this.x+.5*D,this.y+.5*D],[this.x,this.y+.5*D+5*Math.random()],[this.x+-.5*D,this.y+.5*D]],rotation:j,fillColor:"orange"})})}drawHalo(t,e){t.draw(()=>{t.arc({arc:[this.x,this.y,4*e/60+Math.sin(I/8)+10,0,2*Math.PI],strokeColor:`rgba(255, 255, 255, ${1-e/3600})`})})}}const U=[[[-6,-10],[2,-10],[10,-7],[10,-5],[2,0],[10,3],[4,10],[1,8],[-6,10],[-10,2],[-10,-5],[-5,-5]],[[-5,-10],[0,-7],[5,-10],[10,-3],[5,0],[9,5],[4,10],[-3,7],[-7,9],[-10,5],[-7,0],[-9,-6]]];class H{constructor({x:t,y:e}){this.x=t,this.y=e,this.dx=0,this.dy=0,this.asteroidStyle=Math.floor(Math.random()*U.length),this.rotation=Math.random()*Math.PI,this.turnSpeed=.03*Math.random(),this.size=20,this.health=3,this.shouldDie=!1,this.exploding=!1}takeDamage({damage:t,dx:e,dy:s,owner:i}){this.dx+=e/30,this.dy+=s/30,this.health-=t,this.health<=0&&(this.exploding=!0,this.debris=Array(20).fill().map(t=>new v({x:this.x,y:this.y})),this.lifeSpan=50,i.ore+=10)}tick(){this.exploding&&(this.lifeSpan-=1,this.debris.map(t=>t.tick()),this.lifeSpan<=0&&(this.shouldDie=!0)),this.x+=this.dx,this.y+=this.dy,this.rotation+=this.turnSpeed}draw(t){t.draw(()=>{this.exploding?this.debris.map(e=>e.draw(t)):t.lines({lines:U[this.asteroidStyle].map(t=>[this.x+t[0],this.y+t[1]]),strokeColor:"#fff",shadowBlur:8,shadowColor:"#fff",rotation:this.rotation,x:this.x,y:this.y})})}}class W{constructor(){this.initializeAsteroids()}initializeAsteroids(){this.asteroids=[];for(let t=0;t<40;t++){let t=Math.random()*Math.PI*2,e=Math.sin(t)*(210+400*Math.random()),s=Math.cos(t)*(210+400*Math.random());this.asteroids.push(new H({x:e,y:s}))}}tick(){this.asteroids.forEach(t=>t.tick()),this.asteroids=this.asteroids.filter(t=>!t.shouldDie)}draw(t){this.asteroids.map(e=>e.draw(t))}}window.onload=()=>{const t=new o,e=new a(t.canvas),s=new h,i=new n.a,r=new d;t.initialize();let c=(new Date).getTime(),y=0,u=0,m=()=>{g(),v(),M()},g=()=>{O.landed?L.tick(s,O,P,D):(E.tick(O),j.tick(O),D.tick(i,O),O.tick(s,i,e,P.asteroids.concat(D.enemies)),P.tick())},v=()=>{O.projectiles.forEach(t=>{P.asteroids.forEach(e=>{r.handle(t,e)&&i.projectileHit()}),D.enemies.forEach(e=>{r.handle(t,e)&&i.projectileHit()})}),D.enemies.forEach(t=>{t.projectiles.forEach(t=>{r.handle(t,O)&&i.projectileHit(),P.asteroids.forEach(e=>{r.handle(t,e)&&i.projectileHit()})})})},M=()=>{window.requestAnimationFrame(m),y=(new Date).getTime(),(u=y-c)>1e3/60&&(e.clearBackground(),C().map(t=>t.draw(e)),O.landed&&L.draw(e,O),O.death&&z.draw(e),c=y-u%(1e3/60))},C=()=>[b,A,P,D,O,j,E];const b=new p({cw:t.canvas.width,ch:t.canvas.height}),j=new x,E=new k,L=new w,A=new f,D=new S,z=new _,O=(new l,new X),P=new W;document.querySelector("main").className+=" loaded",m()}}]);