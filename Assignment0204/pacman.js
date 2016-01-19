//From dondi/bazaar/canvas-template

(function () {
    // Ditto on using jQuery here.
    var canvas = document.getElementById("canvas");
    var renderingContext = canvas.getContext("2d");

    // Declare other variables here.
    var radialGradient = renderingContext.createRadialGradient(160, 160, 1, 180, 180, 320);

    // Put your canvas drawing code (and any other code) here.
    //radialGradient.addColorStop(0, "white");
    radialGradient.addColorStop(0, "yellow");

    renderingContext.fillStyle = radialGradient;
    renderingContext.beginPath();
    renderingContext.arc(256, 256, 200, 0, Math.PI * 2/3, true);
    renderingContext.fill();
}());