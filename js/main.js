var canvas;
var engine;
var scene;
document.addEventListener("DOMContentLoaded", startGame);

function startGame() {
  canvas = document.getElementById("renderCanvas");
  //   canvas.style.width = "3500px";
  //   canvas.style.height = "2100px";
  engine = new BABYLON.Engine(canvas, true);
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  scene = createScene();
  modifySettings();
  engine.runRenderLoop(function() {
    scene.render();
  });
}

var createScene = function() {
  var scene = new BABYLON.Scene(engine);
  var ground = CreateGround(scene);
  var camera = createUniversalCamera(scene);
  var light = new BABYLON.DirectionalLight(
    "dir0",
    new BABYLON.Vector3(-0.1, -1, 0),
    scene
  );
  return scene;
};

function CreateGround(scene) {
  var ground = new BABYLON.Mesh.CreateGroundFromHeightMap(
    "ground",
    "images/hmap2.jpg",
    1000,
    1000,
    20,
    0,
    50,
    scene,
    false,
    OnGroundCreated
  );
  function OnGroundCreated() {
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture(
      "images/grass.jpg",
      scene
    );
    ground.material = groundMaterial;
    ground.checkCollisions = true;
  }
  return ground;
}

function createUniversalCamera(scene){
  var camera = new BABYLON.UniversalCamera(
    "UniversalCamera",
    new BABYLON.Vector3(-118.37268800277741, 50.18638187910689, -57.51010707965682),
    scene
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);
  camera.checkCollisions = true;
  camera.applyGravity = true;
  camera.keysUp.push('w'.charCodeAt(0));
  camera.keysUp.push('W'.charCodeAt(0));
  camera.keysDown.push('s'.charCodeAt(0));
  camera.keysDown.push('S'.charCodeAt(0));
  camera.keysRight.push('d'.charCodeAt(0));
  camera.keysRight.push('D'.charCodeAt(0));
  camera.keysLeft.push('a'.charCodeAt(0));
  camera.keysLeft.push('A'.charCodeAt(0));

  scene.onPointerPick = function() {
    console.log(camera.position);
  };
}

// Resize
window.addEventListener("resize", function(camera) {
  engine.resize();
});

function modifySettings(){
  scene.onPointerDown = function(){
    canvas.requestPointerLock();
  }
}

