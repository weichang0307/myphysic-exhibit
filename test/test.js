let canvas=document.getElementById('canvas')
canvas.width=800
canvas.height=400
let ctx=canvas.getContext('2d')
let fps=50
let tt=0

let ps1=document.getElementById('ps1')
let pp1=document.getElementById('pp1')
let d1=document.getElementById('d1')
let p1=document.getElementById('p1')
let v1=document.getElementById('v1')
let a1=document.getElementById('a1')
let w1=document.getElementById('w1')
let btn1=document.getElementById('btn1')

ps1.value='[[0,0],[50,0],[50,50],[0,50]]'
d1.value=1
p1.value='[100,180]'
v1.value='[100,0]'
a1.value=0
w1.value=1
btn1.onclick=()=>{
    if(btn1.innerHTML==='polygon'){
        btn1.innerHTML='ball'
        ps1.value=30
        ps1.style.width='100px'
        pp1.innerHTML='radius: '
    }else{
        btn1.innerHTML='polygon'
        ps1.value='[[0,0],[50,0],[50,50],[0,50]]'
        ps1.style.width='300px'
        pp1.innerHTML='points: '


    }
}



let ps2=document.getElementById('ps2')
let pp2=document.getElementById('pp2')
let d2=document.getElementById('d2')
let p2=document.getElementById('p2')
let v2=document.getElementById('v2')
let a2=document.getElementById('a2')
let w2=document.getElementById('w2')
let btn2=document.getElementById('btn2')

ps2.value=30
d2.value=1
p2.value='[700,220]'
v2.value='[-100,0]'
a2.value=0
w2.value=1
btn2.onclick=()=>{
    if(btn2.innerHTML==='polygon'){
        btn2.innerHTML='ball'
        ps2.value=30
        ps2.style.width='100px'
        pp2.innerHTML='radius: '
    }else{
        btn2.innerHTML='polygon'
        ps2.value='[[0,0],[50,0],[50,50],[0,50]]'
        ps2.style.width='300px'
        pp2.innerHTML='points: '


    }
}

let cf=document.getElementById('cf')
let cr=document.getElementById('cr')
let btn_start=document.getElementById('btn_start')

cf.value=1
cr.value=1
btn_start.onclick=()=>{
    init()
}




let world_
let keys={}
let obj1
let obj2
function init(){

    world_=new world(0,0,10)

    if(btn1.innerHTML==='polygon'){
        obj1=new polygon(0,0,stov2(ps1.value),0)
    }else{
        obj1=new ball(0,0,parseFloat(ps1.value),0)
    }
    obj1.position=stov2(p1.value)[0]
    obj1.velocity=stov2(v1.value)[0]
    obj1.angle=parseFloat(a1.value)
    obj1.omega=[0,0,parseFloat(w1.value)]
    obj1.set_mass_by_density(parseFloat(d1.value))
    world_.add(obj1)
    console.log(obj1);

    
    if(btn2.innerHTML==='polygon'){
        obj2=new polygon(0,0,stov2(ps2.value),0)
    }else{
        obj2=new ball(0,0,parseFloat(ps2.value),0)
    }
    obj2.position=stov2(p2.value)[0]
    obj2.velocity=stov2(v2.value)[0]
    obj2.angle=parseFloat(a2.value)
    obj2.omega=[0,0,parseFloat(w2.value)]
    obj2.set_mass_by_density(parseFloat(d2.value))
    world_.add(obj2)
    console.log(obj2);




    world_.setCoefficient('default','default',parseFloat(cf.value),parseFloat(cr.value))


    
}

function stov2(string){
    string=string.replaceAll('[','')
    string=string.replaceAll(']','')
    arr=string.split(',')
    let vs=[]
    for(let i=0;i<arr.length;i+=2){
        vs.push([parseFloat(arr[i]),parseFloat(arr[i+1])])
    }
    return vs
}


function update(){

    tt+=1000/fps


    world_.update(1/fps)

}

function draw(){
    ctx.fillStyle='black'
    ctx.fillRect(0,0,1600,1000)

    world.draw_helper(obj1,'red')
    world.draw_helper(obj2,'blue')
    requestAnimationFrame(draw)
}



init()
setInterval(update,1000/fps)
draw()


