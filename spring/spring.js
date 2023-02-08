const canvas=document.getElementById('canvas')
const ctx=canvas.getContext('2d')
canvas.width=1300
canvas.height=800
let fps=50

let ceiling
let pp
let p2
let world_=new world(0,500,10)
let b1
let b2
let rs=[]
let bars=[]
let cubes=[]
let floor

function init(){
    ceiling=new polygon(500,0,[[0,0],[1000,0],[1000,20],[0,20]],Infinity)
    ceiling.isgravity=false
    world_.add(ceiling)

    //雙多邊形懸掛
    let r=Math.random()*50+20
    let ps=[]
    for(let rad=0;rad<Math.PI*2;rad+=Math.random()*1+1){
        let p0=[r*Math.cos(rad),r*Math.sin(rad)]
        ps.push(p0)
    }
    pp=new polygon(Math.random()*10+100,Math.random()*10+200,ps)
    pp.resistance=0.1
    pp.angular_resistance=0.1
    pp.set_mass_by_density(0.001)
    world_.add(pp)

    r=Math.random()*50+20
    ps=[]
    for(let rad=0;rad<Math.PI*2;rad+=Math.random()*1+1){
        let p0=[r*Math.cos(rad),r*Math.sin(rad)]
        ps.push(p0)
    }
    p2=new polygon(Math.random()*10+100,Math.random()*10+300,ps)
    p2.resistance=0.1
    p2.angular_resistance=0.1
    p2.mass=pp.get_area()*0.001
    p2.inertia=inertiaCalculator.get_object_inertia(p2)
    world_.add(p2)

    world_.addSpring(ceiling,pp,200,60,[-400,10],[10,10])
    world_.addSpring(pp,p2,100,60,[-10,-10],[10,10])

    //雙圓形懸掛
    r=Math.random()*50+20
    b1=new ball(300,200,r,r**2/500)
    world_.add(b1)
    b1.resistance=0.1
    b1.angular_resistance=0.1
    
    
    r=Math.random()*50+20
    b2=new ball(305,300,r,r**2/500)
    world_.add(b2)
    b2.resistance=0.1
    b2.angular_resistance=0.1
    world_.addSpring(ceiling,b1,200,60,[-200,10],[30,0])
    world_.addSpring(b1,b2,100,60,[0,-30],[-10,0])
    
    //混沌擺
    for(let i=0;i<3;i++){
        let rr
        if(i==2){
            rr=new polygon(0,0,[[0,0],[10,0],[10,100],[0,100]],Infinity)
            rr.isgravity=false
        }else{
            rr=new polygon(0,0,[[0,0],[10,0],[10,100],[0,100]],10)
        }
        world_.add(rr)
        rs.push(rr)
        rr.collision=(e)=>{
            for(let i of rs){
                if(i===e.object){
                    return false
                }
            }
        }
    }
    let bias=20
    rs[0].position=[600,500]
    rs[1].position=[600-bias,550]
    rs[2].position=[600-bias,600-bias]
    rs[0].angle=Math.PI/2

    world_.addSpring(rs[0],rs[1],0,Infinity,[0,bias],[0,-50])
    world_.addSpring(rs[1],rs[2],0,Infinity,[0,-bias],[0,-50])
    //多桿擺
    for(let i=0;i<3;i++){
        let bar=new polygon(0,0,[[0,0],[100,0],[100,10],[0,10]],5)
        bars.push(bar)
        world_.add(bar)
        bar.resistance=0.1
        bar.angular_resistance=0.1
    }
    bars[0].position=[700,50]
    bars[1].position=[500,50]
    bars[2].position=[300,50]

    world_.addSpring(ceiling,bars[0],myVector.abs([50,40]),Infinity,[300,10],[50,0])
    world_.addSpring(bars[0],bars[1],100,Infinity,[-50,0],[50,0])
    world_.addSpring(bars[1],bars[2],100,Infinity,[-50,0],[50,0])

    //連結塊
    for(let i=0;i<2;i++){
        let cube=new polygon(0,0,[[0,0],[50,0],[50,50],[0,50]],10,'cube')
        cubes.push(cube)
        world_.add(cube)
    }
    cubes[0].position=[1000,100]
    cubes[1].position=[1000,300]
    floor=new polygon(1000,600,[[0,0],[100,0],[100,10],[0,10]],Infinity)
    floor.isgravity=false
    world_.add(floor)

    world_.addSpring(cubes[0],cubes[1],150,Infinity,[20,25],[20,-25],true,false)
    world_.addSpring(cubes[0],cubes[1],150,Infinity,[-20,25],[-20,-25],true,false)

    world_.setCoefficient('cube','default',1,0.8)
    world_.setCoefficient('cube','cube',1,0.8)

    
    
}

function update(){
    world_.update(1/fps)
}

function draw(){
    ctx.fillStyle='black'
    ctx.fillRect(0,0,1300,800)

    world.draw_helper(ceiling,'yellow')
    world.draw_helper(floor,'yellow')
    world.draw_helper(pp,'white')
    world.draw_helper(p2,'white')
    world.draw_helper(b1,'white')
    world.draw_helper(b2,'white')
    world.draw_helper(rs[2],'yellow')
    world.draw_helper(rs[0],'white')
    world.draw_helper(rs[1],'white')
    for(let i of bars){
        world.draw_helper(i,'white')
    }
    for(let i of cubes){
        world.draw_helper(i,'white')

    }

    for(let i of world_.springs){
        world.spring_drawer(i)
    }


    requestAnimationFrame(draw)
}


init()
setInterval(update,1000/fps)
draw()
