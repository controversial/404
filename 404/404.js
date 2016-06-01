var scene;

function randint(low, high) { // Return a random integer between low and high
  return Math.floor(( Math.random()*(high-low) ))+low;
}

// Add a layer to the scene

function addLayer() {
  // Make  a "layer" in the parallax animation
  var layer = document.createElement("li");
  layer.setAttribute("class", "layer");
  // Give it a random Z value (0 to 1)
  layer.setAttribute("data-z", Math.random().toFixed(2));

  // Make a div inside that says "404"
  var content = document.createElement("div");
  content.appendChild(document.createTextNode("404"));
  // Random X position
  content.style.left = randint(-10, 100) + "vw";
  // Below bottom of screen
  content.style.top = "100vh";
  // Font size and weight based on Z value
  var z = parseFloat(layer.getAttribute("data-z"));
  content.style.fontSize = z * 150 + "px";
  content.style.fontWeight = Math.ceil(z * 4) * 100;
  // Random opacity
  content.style.opacity = (Math.random() / 10).toFixed(2);

  // Add nodes to appropriate parents
  layer.appendChild(content);
  scene.appendChild(layer);
}

function update() {
  var layers = scene.getElementsByTagName("li");
  var layer, div, z;
  for (var i = 0; i < layers.length; i++) {
    layer = layers[i];
    z = parseFloat(layer.getAttribute("data-z"));
    div = layer.getElementsByTagName("div")[0];
    y = parseInt(div.style.top.slice(0, div.style.top.length - 2));
    div.style.top = (y - Math.ceil(z * 3)).toFixed(2) + "vh";

    if (y < (-50)) {
      scene.removeChild(layer);
    }
  }
}

window.onload = function() {
  scene = document.getElementById("scene");
  setInterval(function() {
    for (var i = 0; i < randint(1, 5); i++) {
      addLayer();
    }
    update();
  }, 40);
};



// window.onload = function() {
//   var scene = document.getElementById("scene");
//   for (var i=0; i<500; i++) { // Generate 500 random layers saying 404
//
//     // Create a layer for the parallax scene
//     var layer = document.createElement("li");
//     layer.setAttribute("class", "layer");
//     // Set random depth
//     layer.setAttribute("data-depth", Math.random().toFixed(2));
//     // Create an inner div to hold the text
//     var content = document.createElement("div");
//     // Randomize attributes
//     content.appendChild(document.createTextNode("404"));   // Add text with:
//     content.style.left = randint(-10, 110)+"vw";           //   Random X position
//     content.style.top = randint(-10, 110)+"vh";            //   Random Y position
//     content.style.fontSize = randint(20, 150)+"px";        //   Random font size (20 to 150 px)
//     content.style.opacity = (Math.random()/10).toFixed(2); //   Random opacity (0.00 to 0.10)
//     content.style.fontWeight = randint(1, 6) * 100;        //   Random font weight (200 to 500)
//     // Add the div
//     layer.appendChild(content);
//
//     // Add the layer
//     scene.appendChild(layer);
//   }
//
//   // Initialize the scene
//   var parallax = new Parallax(scene);
//
// };
