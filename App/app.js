
var direction = "";
var slider = document.getElementById("sldrSpeed");

let rSpeed= 0.1;
let fov = 100;
function rStart()
{
    rotate();
    direction = "anti-clockwise";
}
function rStop()
{
    rSpeed= 0.0;
    direction = "";
}
function rChange(){

    if(direction == "anti-clockwise")
        {
            const clock = new THREE.Clock()
            const tick = () =>
            {
                const elapsedTime = clock.getElapsedTime()
                scene.rotation.y = -rSpeed * elapsedTime
                renderer.render(scene, camera)
                window.requestAnimationFrame(tick)
            }

            tick()
            direction = "clockwise";
            
        } 
    else if(direction == "clockwise")
    {
            const clock = new THREE.Clock()
            const tick = () =>
            {
                const elapsedTime = clock.getElapsedTime()
                scene.rotation.y = rSpeed * elapsedTime  
                renderer.render(scene, camera)
                window.requestAnimationFrame(tick)
            }
            tick()
            direction = "anti-clockwise"; 
    }
}

function rotate() {
    rSpeed =slider.value;
    const clock = new THREE.Clock()
    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        scene.rotation.y = rSpeed * elapsedTime
        renderer.render(scene, camera)
        window.requestAnimationFrame(tick)
    }
    tick()
}

const canvas = document.querySelector('#canvas');
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0xfb8e00 );

//Roof
const geometry = new THREE.ConeGeometry( 3.2, 5, 30 );
const material = new THREE.MeshLambertMaterial();
material.color = new THREE.Color( 0xfb8e00 );
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(-2, 5,0 );
scene.add(mesh);

//Walls
const geometryCylinder = new THREE.CylinderGeometry( 3, 3, 5, 32 );
const material2 = new THREE.MeshLambertMaterial({ color: 0xfAA4A44 });
const mesh2 = new THREE.Mesh(geometryCylinder, material2);
mesh2.position.set(-2, 0, 0);
scene.add(mesh2);

//pond
const Circle = new THREE.CylinderGeometry( 3, 3, 0.1, 32 );
const water = new THREE.MeshLambertMaterial({ color: 0xf006994 });
const mesh3 = new THREE.Mesh(Circle, water);
mesh3.position.set(7, 0, -3);
scene.add(mesh3);


//Igloo
const hCircle = new THREE.SphereBufferGeometry(5, 40, 16, 0, 2*Math.PI, 0, 0.5* Math.PI);
const wall2 = new THREE.MeshLambertMaterial({ color:0xfEDF4F5 });
const mesh5 = new THREE.Mesh(hCircle, wall2);
wall2.roughness = 0.5;
material.side = THREE.DoubleSide;
mesh5.position.set(-12, 0, 3);
scene.add(mesh5);

//const newLocal = 5;
//Igloo Door
const Cylinder = new THREE.CylinderGeometry();
Cylinder.radiusTop=12;
Cylinder.radiusBottom= 12;
Cylinder.height= 20;
Cylinder.radialSegments= 28;
Cylinder.heightSegments= 9;
Cylinder.openEnded= false;
Cylinder.thetaStart=  2*Math.PI;
Cylinder.thetaLength= 0.5*Math.PI ;


const materialD = new THREE.MeshLambertMaterial({ color:0xfEDF4F5});
const mesh6 = new THREE.Mesh(Cylinder, materialD);
mesh6.position.set(-12, 0,8);
scene.add(mesh6);


// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 20, 0); // x, y, z
scene.add(directionalLight);



    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      'snow_field.jpg',
      () => {
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;
      });
  
/*
const loader = new THREE.TextureLoader();
loader.load('https://images.unsplash.com/photo-1610486549397-1e9fdb88e9aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80' , function(texture)
            {
             scene.background = texture;  
            });
*/



// Camera
camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(17, 10, 17);
camera.lookAt(0, 0, 0)

document.getElementById("sldrSpeed").onchange = function(event) {
    rSpeed = parseFloat(event.target.value);
}
document.getElementById("zoom").onchange = function(event) {
    fov = parseFloat(event.target.value);
    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(17, 10, 17);
    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
}


// Renderer
//const renderer = new THREE.WebGLRenderer({ antialias: true });
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)
