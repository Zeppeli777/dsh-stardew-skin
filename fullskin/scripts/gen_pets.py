# -*- coding: utf-8 -*-
"""生成 5 个农场伙伴桌宠页面（与宿主页 postMessage 协议：dsh:pet pause/resume、dsh:pet-ack、dsh:pet-ready）。"""
import os

TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>{name} - 桌宠</title>
<!-- 农场伙伴桌宠内容页：宿主页发 dsh:pet pause/resume，本页回 dsh:pet-ack；加载完成发 dsh:pet-ready -->
<style>
html,body{{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:transparent;}}
#stage{{position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;}}
.pet{{
  position:absolute;left:0;top:0;width:{size}px;height:{size}px;
  background-image:url("/{img}");background-size:contain;background-repeat:no-repeat;background-position:center;
  image-rendering:pixelated;will-change:transform;
}}
</style>
</head>
<body>
<div id="stage"><div class="pet" id="pet"></div></div>
<script>
const pet=document.getElementById('pet');
const HALF={half};
let pos={{x:window.innerWidth/2,y:window.innerHeight/2}};
let vel={{x:0,y:0}};
let tgt={{x:pos.x,y:pos.y}};
let t=0;
let running=true;
window.addEventListener('message',(ev)=>{{
  const d=ev.data;
  if(!d||d.type!=='dsh:pet')return;
  if(d.command==='pause')running=false;
  else if(d.command==='resume')running=true;
  if(ev.source)ev.source.postMessage({{type:'dsh:pet-ack',command:d.command,running:running}},'*');
}});
function newTarget(){{
  const m=HALF+40;
  tgt.x=Math.max(m,Math.min(window.innerWidth-m,Math.random()*window.innerWidth));
  tgt.y=Math.max(m,Math.min(window.innerHeight-m,Math.random()*window.innerHeight));
}}
{tick}
window.addEventListener('resize',()=>{{
  pos.x=Math.min(pos.x,window.innerWidth-HALF);
  pos.y=Math.min(pos.y,window.innerHeight-HALF);
}});
newTarget();
tick();
parent.postMessage({{type:'dsh:pet-ready'}},'*');
</script>
</body>
</html>
"""

# 蹦跳（小鸡/史莱姆）：朝目标跳，落地挤压，朝向翻转
HOP = """let hop=0,squash=1;
function tick(){
  if(running){
  t+=1;
  const dx=tgt.x-pos.x,dy=0;
  const dist=Math.hypot(dx,tgt.y-pos.y);
  if(dist<40){newTarget();}
  const dir=Math.sign(dx)||1;
  // 跳跃周期：离地时前进，落地时挤压
  hop=Math.abs(Math.sin(t*0.18));
  squash=hop<0.15?0.75:1;
  if(hop>0.15){pos.x+=dir*2.2;}
  pos.y+=(tgt.y-pos.y)*0.02;
  pet.style.left=(pos.x-HALF)+'px';
  pet.style.top=(pos.y-HALF-hop*22)+'px';
  pet.style.transform='scaleX('+dir*1+') scaleY('+squash+')';
  }
  requestAnimationFrame(tick);
}"""

# 漂浮（虚空鸡）：缓慢飘向目标 + 上下浮动
FLOAT = """function tick(){
  if(running){
  t+=1;
  if(Math.random()<(1/180))newTarget();
  const dx=tgt.x-pos.x,dy=tgt.y-pos.y;
  const dist=Math.hypot(dx,dy);
  if(dist>60){
    vel.x+=dx/dist*0.04;vel.y+=dy/dist*0.04;
  }else{newTarget();}
  vel.x*=0.985;vel.y*=0.985;
  pos.x+=vel.x;pos.y+=vel.y;
  const bob=Math.sin(t*0.06)*14;
  const dir=Math.sign(vel.x)||1;
  pet.style.left=(pos.x-HALF)+'px';
  pet.style.top=(pos.y-HALF+bob)+'px';
  pet.style.transform='scaleX('+dir+')';
  }
  requestAnimationFrame(tick);
}"""

# 游走（猫咪）：走一段停一段（坐下）
WANDER = """let resting=0;
function tick(){
  if(running){
  t+=1;
  const dx=tgt.x-pos.x,dy=tgt.y-pos.y;
  const dist=Math.hypot(dx,dy);
  if(resting>0){
    resting-=1;
    pet.style.transform='scaleY(0.92)';
  }else{
    if(dist<30){resting=120+Math.random()*180;newTarget();}
    else{
      const dir=Math.sign(dx)||1;
      pos.x+=dx/dist*1.6;pos.y+=dy/dist*1.6;
      const step=Math.abs(Math.sin(t*0.25));
      pet.style.left=(pos.x-HALF)+'px';
      pet.style.top=(pos.y-HALF-step*4)+'px';
      pet.style.transform='scaleX('+dir+')';
    }
  }
  if(resting>0){pet.style.left=(pos.x-HALF)+'px';pet.style.top=(pos.y-HALF)+'px';}
  }
  requestAnimationFrame(tick);
}"""

# 飞舞（蝴蝶）：正弦环绕的随机游动
FLUTTER = """function tick(){
  if(running){
  t+=1;
  if(Math.random()<(1/200))newTarget();
  const dx=tgt.x-pos.x,dy=tgt.y-pos.y;
  const dist=Math.hypot(dx,dy);
  if(dist<50){newTarget();}
  const sway=Math.sin(t*0.12)*1.8;
  pos.x+=dx/dist*1.8+sway*0.4;
  pos.y+=dy/dist*1.8+Math.cos(t*0.15)*1.2;
  const dir=Math.sign(dx)||1;
  pet.style.left=(pos.x-HALF)+'px';
  pet.style.top=(pos.y-HALF)+'px';
  pet.style.transform='scaleX('+dir+')';
  }
  requestAnimationFrame(tick);
}"""

PETS = [
    dict(file='chicken_pet.html', name='小鸡', img='chicken_white.png', size=120, half=60, tick=HOP),
    dict(file='voidchicken_pet.html', name='虚空鸡', img='chicken_void.png', size=120, half=60, tick=FLOAT),
    dict(file='slime_pet.html', name='史莱姆', img='slime.gif', size=128, half=64, tick=HOP),
    dict(file='cat_pet.html', name='猫咪', img='cat.gif', size=128, half=64, tick=WANDER),
    dict(file='butterfly_pet.html', name='蝴蝶', img='butterfly.gif', size=110, half=55, tick=FLUTTER),
]

for p in PETS:
    out = TEMPLATE.format(**p)
    with open(os.path.join('web', p['file']), 'w', encoding='utf-8', newline='\n') as f:
        f.write(out)
    print('wrote', p['file'], len(out))
