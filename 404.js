var scene;

function randint(low, high) { // Return a random integer between low and high
  return Math.floor(( Math.random()*(high-low) ))+low;
}

// Add a layer to the scene

function addLayer() {
  // Make  a "layer" in the parallax animation
  var layer = document.createElement("div");
  // Give it a random Z value (0 to 1)
  layer.setAttribute("class", "layer");
  layer.setAttribute("data-z", Math.random().toFixed(2));

  // Make a div inside that says "404"
  layer.appendChild(document.createTextNode("404"));
  // Random X position
  layer.style.left = randint(-10, window.innerWidth) + "px";
  // Below bottom of screen
  layer.style.top = window.innerHeight + "px";
  // Font size and weight based on Z value
  var z = parseFloat(layer.getAttribute("data-z"));
  layer.style.fontSize = Math.floor(z * 150) + "px";
  layer.style.fontWeight = Math.ceil(z * 4) * 100;
  // Random opacity
  layer.style.opacity = (Math.random() / 10).toFixed(2);

  // Add nodes to appropriate parents
  scene.appendChild(layer);
}

function updatePositions() {
  var layers = scene.getElementsByTagName("div");
  var layer, div, z;
  for (var i = 0; i < layers.length; i++) {
    layer = layers[i];
    z = parseFloat(layer.getAttribute("data-z"));
    y = parseInt(layer.style.top.slice(0, layer.style.top.length - 2));
    layer.style.top = (y - Math.ceil(z * 10)).toFixed(2) + "px";

    if (y < (-150)) { // Max fontsize is 150px
      scene.removeChild(layer);
    }
  }
}

function updateColor() {
  var hue = (parseFloat(document.body.getAttribute("data-hue")) + 0.25) % 360;
  document.body.setAttribute("data-hue", hue.toString());
  var hex = chroma(hue, 1, 1, "hsv").brighten().hex();
  document.body.style.color = hex;
  document.getElementsByTagName("a")[0].style.backgroundColor = hex;
}

function update() {
  addLayer();
  updatePositions();
  updateColor();
  window.requestAnimationFrame(update); // Recur
}

window.onload = function() {
  scene = document.getElementById("scene");
  window.requestAnimationFrame(update);
};
