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
  content.style.top = window.innerHeight + "px";
  // Font size and weight based on Z value
  var z = parseFloat(layer.getAttribute("data-z"));
  content.style.fontSize = Math.floor(z * 150) + "px";
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
    div.style.top = (y - Math.ceil(z * 10)).toFixed(2) + "px";

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

window.onload = function() {
  scene = document.getElementById("scene");
  setInterval(function() {
    addLayer();
    update();
    updateColor();
  }, 40);
};
