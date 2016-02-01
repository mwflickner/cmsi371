//From dondi/bazaar/canvas-template
/*
* First paren is for closure, doesn't dirty up the name space
* Keeps stuff in the func there like, Vegas
* Plus otherwise Window (top-level object) gets really cluttered
*/
(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    SpriteLibrary.pacman = function (pacmanProperties) {
        var renderingContext = pacmanProperties.renderingContext;
        var isFacingLeft = /*pacmanProperties.isFacingLeft || */false;
        var mouthClosed = pacmanProperties.mouthClosed || true;
        var pacmanSize = pacmanProperties.pacmanSize || 100;
        renderingContext.save();
        if (mouthClosed){
            var radialGradient = renderingContext.createRadialGradient(160, 160, 1, 180, 180, 320);
            // Put your canvas drawing code (and any other code) here.
            radialGradient.addColorStop(0, "yellow");

            renderingContext.fillStyle = radialGradient;
            renderingContext.beginPath();
            renderingContext.arc(256, 256, pacmanSize, 0, Math.PI * 2, true);
            renderingContext.fill();
        } else {
            if (isFacingLeft) {

            } else {
                
            }
        }

        renderingContext.restore();
    };
    
}());