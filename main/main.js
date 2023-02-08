let canvas=document.getElementById('canvas')
canvas.width=800
canvas.height=400
let ctx=canvas.getContext('2d')
let fps=50
let ws=[]
let tt=0

let polys=[]
let balls=[]

let s1=document.getElementById('slider1')
let s2=document.getElementById('slider2')
let s3=document.getElementById('slider3')
let s4=document.getElementById('slider4')
let n1=document.getElementById('n1')
let n2=document.getElementById('n2')
let n3=document.getElementById('n3')
let n4=document.getElementById('n4')
s1.oninput=()=>{n1.innerHTML=Math.floor(s1.value/5)}
s2.oninput=()=>{n2.innerHTML=Math.floor(s2.value/5)}
s3.oninput=()=>{n3.innerHTML=s3.value/20}
s4.oninput=()=>{n4.innerHTML=s4.value/100}
n1.innerHTML=Math.floor(s1.value/5)
n2.innerHTML=Math.floor(s2.value/5)
n3.innerHTML=s3.value/20
n4.innerHTML=s4.value/100
let btn1=document.getElementById('btn1')

btn1.onclick=()=>{
    init(Math.floor(s1.value/5),Math.floor(s2.value/5),s3.value/20,s4.value/100)

}


let world_
let keys={}
function init(bc,pc,cf,cr){

    world_=new world(0,0,10)
    polys=[]
    balls=[]
    ws=[]

    ws.push(new polygon(400,400,[[-800,-10],[800,-10],[800,10],[-800,10]],Infinity))
    ws.push(new polygon(400,0,[[-800,-10],[800,-10],[800,10],[-800,10]],Infinity))
    ws.push(new polygon(800,200,[[-10,-400],[10,-400],[10,400],[-10,400]],Infinity))
    ws.push(new polygon(0,200,[[-10,-400],[10,-400],[10,400],[-10,400]],Infinity))
    for(let i of ws){
        i.isgravity=false
        world_.add(i)
    }

    for(let i=0;i<pc;i++){
        let vv=100
        let oo=20
        let r=Math.random()*50+20
        let ps=[]
        for(let rad=0;rad<Math.PI*2;rad+=Math.random()*1+1){
            let p0=[r*Math.cos(rad),r*Math.sin(rad)]
            ps.push(p0)
        }
        pp=new polygon(Math.random()*700+50,Math.random()*300+50,ps,r**2/100)
        pp.velocity=[Math.random()*vv-vv/2,Math.random()*vv-vv/2]
        pp.omega[2]=Math.random()*oo-oo/2
        pp.mass=pp.area*0.001
        pp.inertia=inertiaCalculator.get_object_inertia(pp)
        world_.add(pp)
        polys.push(pp)
    }

    for(let i=0;i<bc;i++){
        let vv=100
        let oo=20
        let r=Math.random()*30+20
        bb=new ball(Math.random()*700+50,Math.random()*300+50,r)
        bb.velocity=[Math.random()*vv-vv/2,Math.random()*vv-vv/2]
        bb.omega[2]=Math.random()*oo-oo/2
        bb.mass=bb.area*0.001
        bb.inertia=bb.mass*bb.radius**2

        world_.add(bb)
        balls.push(bb)
    }






    world_.setCoefficient('default','default',cf,cr)


    
}


function update(){

    tt+=1000/fps


    world_.update(1/fps)

}

function draw(){
    ctx.fillStyle='black'
    ctx.fillRect(0,0,1600,1000)

    for(let i of polys){
        world.draw_helper(i,'red')
    }
    for(let i of balls){
        world.draw_helper(i,'white')
    }
    for(let i of ws){
        world.draw_helper(i,'yellow')
    }

    requestAnimationFrame(draw)
}



init(s1.value/5,s2.value/5,s3.value/20,s4.value/100)
setInterval(update,1000/fps)
draw()

































