var scene;

function randint(low, high) { // Return a random integer between low and high
  return Math.floor(( Math.random()*(high-low) ))+low;
}

// Add a layer to the scene

function addLayer() {
  // Make a "layer" in the parallax animation
  var layer = document.createElement("div");
  layer.setAttribute("class", "layer");
  // Make it say "404"
  layer.appendChild(document.createTextNode("404"));
  // Add a bunch of randomized attributes
  setAttributes(layer);
  // Add it to the scene
  scene.appendChild(layer);
}

function setAttributes(layer) {
  var z = Math.random();                                     // Give it a random Z value, and
  layer.setAttribute("data-z", z.toFixed(2));                // store the Z value.
  layer.style.left = randint(-10, window.innerWidth) + "px"; // Give it a random X position,
  layer.style.top = "-150px";                                // and have it start below the bottom of the screen/
  layer.style.fontSize = Math.ceil(z * 100) + 50 + "px";     // Font size is based on Z value (ranges from 50 to 150),
  layer.style.fontWeight = Math.ceil(z * 4) * 100;           // as is font weight.
  layer.style.opacity = (Math.random() / 10).toFixed(2);     // It has a random opacity.
}

function updatePositions() {
  var layers = scene.getElementsByTagName("div");
  var layer, div, z;
  for (var i = 0; i < layers.length; i++) {
    layer = layers[i];
    z = parseFloat(layer.getAttribute("data-z"));
    y = parseInt(layer.style.top.slice(0, layer.style.top.length - 2));
    layer.style.top = (y + Math.ceil(z * 10)).toFixed(2) + "px";

    if (y > window.innerHeight) { // Max fontsize is 150px
      setAttributes(layer); // Go back down to the bottom, get randomized again
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
  updatePositions();
  updateColor();
  window.requestAnimationFrame(update); // Recur
}

window.onload = function() {
  scene = document.getElementById("scene");
  // Add 100 nodes with 50 millisecond delay between each
  for (var i=0; i < 100; i++) {
    setTimeout(addLayer, 50 * i);
  }
  window.requestAnimationFrame(update);
};
