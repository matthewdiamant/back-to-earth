!function(t){var e={};function s(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(i,a,function(e){return t[e]}.bind(null,a));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=2)}([function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return Sound});var jsfxr__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(1),jsfxr__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(jsfxr__WEBPACK_IMPORTED_MODULE_0__);class Oscillator{constructor(){window.AudioContext=window.AudioContext||window.webkitAudioContext;let t=new AudioContext;this.oscillator=t.createOscillator(),this.gainNode=t.createGain(),this.oscillator.connect(this.gainNode),this.gainNode.connect(t.destination),this.gainNode.gain.value=0,this.oscillator.start(0)}on({frequency:t,type:e,volume:s}){this.oscillator.type=e,this.gainNode.gain.value=s,this.oscillator.frequency.value=t}off(){this.gainNode.gain.value=0}kill(){this.oscillator.stop(0)}play({volume:t,frequency:e,duration:s,type:i}){this.oscillator.type=i,this.oscillator.frequency.value=e,this.gainNode.gain.value=t,setTimeout(()=>this.gainNode.gain.value=0,s)}}class Sound{constructor(){this.state={engine:!1}}engineOn(){this.state.engine||(this.state.engine=!0,this.engine=this.engine||new Oscillator,this.engine.on({frequency:50,type:"triangle",volume:.2}))}engineOff(){this.state.engine&&(this.state.engine=!1,this.engine.off(),this.engine=null)}playSound(url){const soundUrl=jsfxr__WEBPACK_IMPORTED_MODULE_0___default()(eval(url));let player=new Audio;player.src=soundUrl,player.play()}mainLaser(){this.playSound("[2,,0.1749,,0.3063,0.713,0.2,-0.2645,,,,,,0.0543,0.1546,,,,1,,,,,0.5]")}secondaryLaser(){this.playSound("[2,,0.1426,,0.2251,0.7799,0.2555,-0.2285,,,,,,0.7631,-0.4501,,,,1,,,0.0846,,0.5]")}missile(){this.playSound("[3,,0.0937,0.571,0.3803,0.7495,,,,,,,,,,,,,1,,,,,0.5]")}projectileHit(){this.playSound("[3,,0.0867,,0.2283,0.2711,,-0.6853,,,,,,,,,,,1,,,,,0.5]")}}},function(t,e,s){function i(){this.setSettings=function(t){for(var e=0;e<24;e++)this[String.fromCharCode(97+e)]=t[e]||0;this.c<.01&&(this.c=.01);var s=this.b+this.c+this.e;if(s<.18){var i=.18/s;this.b*=i,this.c*=i,this.e*=i}}}var a=new function(){var t,e,s,a,r,o,n,h,l,d,c,u;this._params=new i,this.reset=function(){var t=this._params;a=100/(t.f*t.f+.001),r=100/(t.g*t.g+.001),o=1-t.h*t.h*t.h*.01,n=-t.i*t.i*t.i*1e-6,t.a||(c=.5-t.n/2,u=5e-5*-t.o),h=1+t.l*t.l*(t.l>0?-.9:10),l=0,d=1==t.m?0:(1-t.m)*(1-t.m)*2e4+32},this.totalReset=function(){this.reset();var i=this._params;return t=i.b*i.b*1e5,e=i.c*i.c*1e5,s=i.e*i.e*1e5+12,3*((t+e+s)/3|0)},this.synthWave=function(i,f){var p=this._params,y=1!=p.s||p.v,w=p.v*p.v*.1,x=1+3e-4*p.w,m=p.s*p.s*p.s*.1,g=1+1e-4*p.t,v=1!=p.s,_=p.x*p.x,S=p.g,C=p.q||p.r,j=p.r*p.r*p.r*.2,k=p.q*p.q*(p.q<0?-1020:1020),M=p.p?32+((1-p.p)*(1-p.p)*2e4|0):0,b=p.d,E=p.j/2,A=p.k*p.k*.01,D=p.a,L=t,P=1/t,O=1/e,R=1/s,U=5/(1+p.u*p.u*20)*(.01+m);U>.8&&(U=.8),U=1-U;for(var T,q,B,z,I,N,Y=!1,F=0,W=0,K=0,X=0,H=0,G=0,J=0,Q=0,V=0,Z=0,$=new Array(1024),tt=new Array(32),et=$.length;et--;)$[et]=0;for(et=tt.length;et--;)tt[et]=2*Math.random()-1;for(et=0;et<f;et++){if(Y)return et;if(M&&++V>=M&&(V=0,this.reset()),d&&++l>=d&&(d=0,a*=h),(a*=o+=n)>r&&(a=r,S>0&&(Y=!0)),q=a,E>0&&(Z+=A,q*=1+Math.sin(Z)*E),(q|=0)<8&&(q=8),D||((c+=u)<0?c=0:c>.5&&(c=.5)),++W>L)switch(W=0,++F){case 1:L=e;break;case 2:L=s}switch(F){case 0:K=W*P;break;case 1:K=1+2*(1-W*O)*b;break;case 2:K=1-W*R;break;case 3:K=0,Y=!0}C&&((B=0|(k+=j))<0?B=-B:B>1023&&(B=1023)),y&&x&&((w*=x)<1e-5?w=1e-5:w>.1&&(w=.1)),N=0;for(var st=8;st--;){if(++J>=q&&(J%=q,3==D))for(var it=tt.length;it--;)tt[it]=2*Math.random()-1;switch(D){case 0:I=J/q<c?.5:-.5;break;case 1:I=1-J/q*2;break;case 2:I=.225*(((I=1.27323954*(z=6.28318531*((z=J/q)>.5?z-1:z))+.405284735*z*z*(z<0?1:-1))<0?-1:1)*I*I-I)+I;break;case 3:I=tt[Math.abs(32*J/q|0)]}y&&(T=G,(m*=g)<0?m=0:m>.1&&(m=.1),v?(H+=(I-G)*m,H*=U):(G=I,H=0),X+=(G+=H)-T,I=X*=1-w),C&&($[Q%1024]=I,I+=$[(Q-B+1024)%1024],Q++),N+=I}N*=.125*K*_,i[et]=N>=1?32767:N<=-1?-32768:32767*N|0}return f}};t.exports=function(t){a._params.setSettings(t);var e=a.totalReset(),s=new Uint8Array(4*((e+1)/2|0)+44),i=2*a.synthWave(new Uint16Array(s.buffer,44),e),r=new Uint32Array(s.buffer,0,44);r[0]=1179011410,r[1]=i+36,r[2]=1163280727,r[3]=544501094,r[4]=16,r[5]=65537,r[6]=44100,r[7]=88200,r[8]=1048578,r[9]=1635017060,r[10]=i,i+=44;for(var o=0,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",h="data:audio/wav;base64,";o<i;o+=3){var l=s[o]<<16|s[o+1]<<8|s[o+2];h+=n[l>>18]+n[l>>12&63]+n[l>>6&63]+n[63&l]}return h}},function(t,e,s){"use strict";s.r(e);let i=null;class a{constructor(t){this.canvas=t,i=this.canvas.getContext("2d"),this.camera={x:0,y:0}}cameraAdjustX(t){return t-this.camera.x+this.canvas.width/2}cameraAdjustY(t){return t-this.camera.y+this.canvas.height/2}draw(t){i.save(),t(),i.restore()}clearBackground(){i.clearRect(0,0,this.canvas.width,this.canvas.height)}drawBackground(t){i.fillStyle=t,i.fillRect(0,0,this.canvas.width,this.canvas.height)}fillRect({rect:t,color:e,shadowBlur:s,shadowColor:a}){i.fillStyle=e,i.shadowBlur=s,i.shadowColor=a,i.fillRect(this.cameraAdjustX(t[0]),this.cameraAdjustY(t[1]),...t.slice(2))}fillRectUnadjusted({rect:t,color:e}){i.fillStyle=e,i.fillRect(...t)}arc({arc:t,fillColor:e,strokeColor:s,shadowBlur:a,shadowColor:r}){i.beginPath(),i.arc(this.cameraAdjustX(t[0]),this.cameraAdjustY(t[1]),...t.slice(2)),i.shadowBlur=a,i.shadowColor=r,e&&(i.fillStyle=e,i.fill()),s&&(i.strokeStyle=s,i.stroke())}text({text:t,x:e,y:s,size:a="14px",font:r="Courier",letterSpacing:o=!1,isUnadjusted:n=!1}){n||(e=this.cameraAdjustX(e),s=this.cameraAdjustY(s)),i.font=a+" "+r,t=o?t.split("").join(" "):t,i.fillStyle="#fff",i.fillText(t,e,s)}lines({lines:t,shadowBlur:e=0,shadowColor:s,rotation:a,x:r,y:o,fillColor:n,strokeColor:h}){a&&(i.translate(this.cameraAdjustX(r),this.cameraAdjustY(o)),i.rotate(a),i.translate(-1*this.cameraAdjustX(r),-1*this.cameraAdjustY(o))),i.beginPath(),i.moveTo(this.cameraAdjustX(t[0][0]),this.cameraAdjustY(t[0][1])),t.slice(1).map(t=>i.lineTo(this.cameraAdjustX(t[0]),this.cameraAdjustY(t[1]))),i.closePath(),i.shadowBlur=e,i.shadowColor=s,h&&(i.strokeStyle=h,i.stroke()),n&&(i.fillStyle=n,i.fill())}hitbox({x:t,y:e,size:s}){this.fillRect({rect:[t-s/2,e-s/2,s,s],color:"#f00"})}}let r=document.getElementById("c");class o{constructor(){this.canvas=r}initialize(){let t=document.querySelector("body");const e=e=>{t.clientWidth/t.clientHeight>640/480?(r.style.height="100vh")&&(r.style.width="auto"):(r.style.height="auto")&&(r.style.width="100vw")};e(),t.onresize=e}}var n=class{constructor(){document.addEventListener("keyup",t=>this.onKeyup(t)),document.addEventListener("keydown",t=>this.onKeydown(t)),this._pressed={},this.ENTER=13,this.SPACE=32,this.LEFT=37,this.UP=38,this.RIGHT=39,this.DOWN=40}isDown(t){return this._pressed[t]}onKeydown(t){this._pressed[t.keyCode]=!0}onKeyup(t){delete this._pressed[t.keyCode]}},h=s(0);class l{handle(t,e){return!t.exploding&&!e.exploding&&t.x<e.x+e.size/2&&t.x+t.size>e.x-e.size/2&&t.y<e.y+e.size/2&&t.y+t.size>e.y-e.size/2&&(t.destroy(),e.takeDamage(t),!0)}}let d=[];class c{constructor({cw:t,ch:e}){for(let s=0;s<100;s++)d.push([Math.random()*t,Math.random()*e])}draw(t){t.draw(()=>{t.drawBackground("#111"),d.map(e=>t.fillRectUnadjusted({rect:[e[0],e[1],1,1],color:"#fff"})),t.text({text:"back to earth",x:-140,y:-100,size:"36px",font:"serif",letterSpacing:!0}),t.text({text:"Arrow keys to move. SPACE to shoot.",x:-140,y:100}),t.text({text:"ENTER to land back on earth.",x:-110,y:125}),t.text({text:"Shoot things. Collect ore. Upgrade weapons.",x:-173,y:150})})}}class u{constructor(){this.timeout=15}tick(t,e){if(t.isDown(t.ENTER)&&this.timeout<0&&(this.timeout=15,e.landed=!1,e.timeout=15),this.timeout-=1,t.isDown(t.SPACE)&&this.timeout<0){if(this.timeout=15,e.level>=e.shipLevels.length-1)return;let t=e.shipLevels[e.level+1].cost;e.ore>t&&(e.ore-=t,e.level+=1)}}draw(t,e){t.draw(()=>{if(t.fillRectUnadjusted({rect:[0,0,640,480],color:"rgba(0, 0, 0, 0.6)"}),t.fillRectUnadjusted({rect:[150,90,340,300],color:"#fff"}),t.fillRectUnadjusted({rect:[151,91,338,298],color:"#000",shadowBlur:2,shadowColor:"#fff"}),t.text({text:"Welcome to Earth",x:210,y:140,size:"20px",font:"serif",letterSpacing:!0,isUnadjusted:!0}),e.level>=e.shipLevels.length-1)t.text({text:"You have all ship upgrades",x:245,y:180,isUnadjusted:!0});else{let s=e.shipLevels[e.level+1].cost;t.text({text:"If you have "+s+" ore,",x:245,y:180,isUnadjusted:!0}),t.text({text:"you may upgrade your ship",x:215,y:205,isUnadjusted:!0}),t.text({text:"by pressing SPACE",x:247,y:230,isUnadjusted:!0}),t.text({text:"You have "+e.ore+" ore",x:260,y:270,isUnadjusted:!0})}t.text({text:"Leave Earth by pressing ENTER",x:195,y:360,isUnadjusted:!0})})}}class f{draw(t){t.draw(()=>{t.arc({arc:[0,0,50,0,2*Math.PI],fillColor:"#fff",shadowBlur:10,shadowColor:"#fff"})})}}class p{constructor(){this.ore=0}tick(t){this.ore=t.ore}draw(t){t.draw(()=>{this.ore>0&&t.text({text:"ore: "+this.ore,x:"305",y:"20",size:"11px",isUnadjusted:!0})})}}let y={"main-laser":{color:"#f66",shadowColor:"#f00",speed:4,lifeSpan:4},"secondary-laser":{color:"#f6f",shadowColor:"#f0f",speed:10,lifeSpan:1},missile:{type:"missile",color:"#ff0",shadowColor:"#ff0",speed:.8,lifeSpan:10,maxSpeed:5}};class w{constructor({x:t,y:e,yaw:s,damage:i,type:a,owner:r,target:o}){this.type=y[a],this.x=t,this.y=e,this.yaw=s,this.owner=r,this.lifeSpan=1e3*this.type.lifeSpan/60,this.size=1,this.shouldDie=!1,this.damage=i,this.exploding=!1,this.dx=Math.sin(this.yaw)*this.type.speed,this.dy=-Math.cos(this.yaw)*this.type.speed,this.target=o}tick(){if(this.lifeSpan-=1,this.lifeSpan<=0&&(this.shouldDie=!0),!this.exploding){if("missile"===this.type.type){let t,e;if(this.target&&!this.target.exploding&&this.lifeSpan<1e3*(this.type.lifeSpan-.5)/60){t=this.x-this.target.x,e=this.y-this.target.y;let s=Math.sqrt(t*t+e*e);t=t/s*this.type.speed,e=e/s*this.type.speed}else t=this.dx*-this.type.speed,e=this.dy*-this.type.speed;this.dx-=t,this.dy-=e;let s=Math.sqrt(this.dx*this.dx+this.dy*this.dy);s>this.type.maxSpeed&&(this.dx=this.dx/s*this.type.maxSpeed,this.dy=this.dy/s*this.type.maxSpeed)}this.x+=this.dx,this.y+=this.dy}}destroy(){this.exploding=!0,this.lifeSpan=2}draw(t){t.draw(()=>{this.exploding?t.arc({arc:[this.x,this.y,4/this.lifeSpan,0,2*Math.PI],fillColor:"#ff8",shadowBlur:10,shadowColor:"#ff0"}):t.fillRect({rect:[this.x,this.y,2,2],color:this.type.color,shadowBlur:2,shadowColor:this.type.shadowColor})})}}let x=[{turnSpeed:.05,maxSpeed:1,acceleration:.01,size:10,mainLaserCooldown:.3,mainLaserCanFire:!0},{cost:100,turnSpeed:.05,maxSpeed:1,acceleration:.01,size:15,mainLaserCooldown:.3,mainLaserCanFire:!0,secondaryLaserCooldown:.2,secondaryLaserCanFire:!0},{cost:400,turnSpeed:.05,maxSpeed:1,acceleration:.01,size:20,mainLaserCooldown:.3,mainLaserCanFire:!0,secondaryLaserCooldown:.2,secondaryLaserCanFire:!0,missileCooldown:.2,missileCanFire:!0}],m=100,g=-400,v=-.1,_=.5,S=3.4,C=.05,j=1,k=.01,M=10,b=.3,E=!0,A=!1,D=1,L=.2,P=!1,O=1,R=.2,U={engineOn:!1},T=!1;function q(t,e,s,i){let a=null,r=99999999;return s.forEach(s=>{if(s.exploding)return;let o=s.x-t,n=s.y-e,h=Math.sqrt(o*o+n*n);h>i||h<r&&(a=s,r=h)}),a}class B{constructor(){this.projectiles=[],this.landed=!1,this.ore=0,this.timeout=0,this.level=0,this.shipLevels=x}weaponsTick(t,e,s){t.isDown(t.SPACE)&&(E&&(this.projectiles.push(new w({x:m,y:g,yaw:S,damage:1,type:"main-laser",owner:this})),E=!1,window.setTimeout(()=>E=!0,1e3*b),e.mainLaser()),A&&(console.log(this),this.projectiles.push(new w({x:D*Math.cos(S)*(M/2)+m,y:D*Math.sin(S)*(M/2)+g,yaw:S,damage:1,type:"secondary-laser",owner:this})),D*=-1,A=!1,window.setTimeout(()=>A=!0,1e3*L),e.secondaryLaser()),P&&(this.projectiles.push(new w({x:O*Math.cos(S)*(M/2)+m,y:O*Math.sin(S)*(M/2)+g,yaw:S+Math.PI/2*O,damage:1,type:"missile",owner:this,target:q(m,g,s,260)})),O*=-1,P=!1,window.setTimeout(()=>P=!0,1e3*R),e.missile()))}tick(t,e,s,i){if(this.timeout<0&&t.isDown(t.ENTER)&&m*m+g*g<3600&&(this.landed=!0),this.timeout-=1,t.isDown(t.LEFT)&&(S-=C),t.isDown(t.RIGHT)&&(S+=C),U.engineOn=t.isDown(t.UP),U.engineOn){v+=Math.sin(S)*k,_+=Math.cos(S)*-k;let t=Math.sqrt(v*v+_*_);t>j&&(v=v/t*j,_=_/t*j),e.engineOn()}else e.engineOff();this.weaponsTick(t,e,i),m+=v,g+=_,s.camera.x=m,s.camera.y=g,T=Math.sqrt(m*m+g*g)>400,this.projectiles.map(t=>t.tick()),this.projectiles=this.projectiles.filter(t=>!t.shouldDie)}draw(t){this.projectiles.map(e=>e.draw(t)),T&&this.drawEarthIndicator(t),U.engineOn&&this.drawEngine(t),t.draw(()=>{t.lines({x:m,y:g,lines:[[m,g-7],[m+5,g+5],[m-5,g+5]],size:M,rotation:S,fillColor:"#070"})})}drawEngine(t){t.draw(()=>{t.lines({x:m,y:g,lines:[[m+-.5*M,g+.5*M],[m+.5*M,g+.5*M],[m,g+.5*M+5*Math.random()],[m+-.5*M,g+.5*M]],rotation:S,fillColor:"orange"})})}drawEarthIndicator(t){t.draw(()=>{let e=Math.atan2(g,m);t.fillRectUnadjusted({rect:[-230*Math.cos(e)+320,-230*Math.sin(e)+240,5,5],color:"#4f4"})})}}const z=[[[-6,-10],[2,-10],[10,-7],[10,-5],[2,0],[10,3],[4,10],[1,8],[-6,10],[-10,2],[-10,-5],[-5,-5]],[[-5,-10],[0,-7],[5,-10],[10,-3],[5,0],[9,5],[4,10],[-3,7],[-7,9],[-10,5],[-7,0],[-9,-6]]];class I{constructor({x:t,y:e}){this.x=t,this.y=e,this.dx=4*Math.random()-2,this.dy=4*Math.random()-2,this.shouldDie=!1,this.exploding=!1}tick(){this.x+=this.dx,this.y+=this.dy}draw(t){t.draw(()=>{t.fillRect({rect:[this.x,this.y,2,2],color:"#fff",shadowBlur:2,shadowColor:"#fff"})})}}class N{constructor({x:t,y:e}){this.x=t,this.y=e,this.dx=0,this.dy=0,this.asteroidStyle=Math.floor(Math.random()*z.length),this.rotation=Math.random()*Math.PI,this.turnSpeed=.03*Math.random(),this.size=20,this.health=3,this.shouldDie=!1,this.exploding=!1}takeDamage({damage:t,dx:e,dy:s,owner:i}){this.dx+=e/30,this.dy+=s/30,this.health-=t,this.health<=0&&(this.exploding=!0,this.debris=Array(20).fill().map(t=>new I({x:this.x,y:this.y})),this.lifeSpan=50,i.ore+=10)}tick(){this.exploding&&(this.lifeSpan-=1,this.debris.map(t=>t.tick()),this.lifeSpan<=0&&(this.shouldDie=!0)),this.x+=this.dx,this.y+=this.dy,this.rotation+=this.turnSpeed}draw(t){t.draw(()=>{this.exploding?this.debris.map(e=>e.draw(t)):t.lines({lines:z[this.asteroidStyle].map(t=>[this.x+t[0],this.y+t[1]]),strokeColor:"#fff",shadowBlur:8,shadowColor:"#fff",rotation:this.rotation,x:this.x,y:this.y})})}}class Y{constructor(){this.asteroids=[];for(let t=0;t<40;t++){let t=Math.random()*Math.PI*2,e=Math.sin(t)*(210+400*Math.random()),s=Math.cos(t)*(210+400*Math.random());this.asteroids.push(new N({x:e,y:s}))}}tick(){this.asteroids.forEach(t=>t.tick()),this.asteroids=this.asteroids.filter(t=>!t.shouldDie)}draw(t){this.asteroids.map(e=>e.draw(t))}}window.onload=()=>{document.querySelector("main").className+=" loaded";const t=new o,e=new a(t.canvas),s=new n,i=new h.a,r=new l;t.initialize();let d=(new Date).getTime(),y=0,w=0,x=()=>{m(),g(),v()},m=()=>{M.landed?j.tick(s,M):(C.tick(M),M.tick(s,i,e,b.asteroids),b.tick())},g=()=>{M.projectiles.forEach(t=>{b.asteroids.forEach(e=>{r.handle(t,e,i)&&i.projectileHit()})})},v=()=>{window.requestAnimationFrame(x),y=(new Date).getTime(),(w=y-d)>1e3/60&&(e.clearBackground(),_().map(t=>t.draw(e)),M.landed&&j.draw(e,M),d=y-w%(1e3/60))},_=()=>[S,k,b,M,C];const S=new c({cw:t.canvas.width,ch:t.canvas.height}),C=new p,j=new u,k=new f,M=new B,b=new Y;x()}}]);