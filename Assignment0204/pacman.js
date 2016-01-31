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
        var facingLeft = pacmanProperties.isFacingLeft || false;
        var isChomping = pacmanProperties.isChomping || true;

        renderingContext.save();

        if (isFacingLeft) {
            if (isChomping){

            } else {

            }
            // Draw the other way
        } else {
            if (isChomping) {

            } else {
                var radialGradient = renderingContext.createRadialGradient(160, 160, 1, 180, 180, 320);

                // Put your canvas drawing code (and any other code) here.
                radialGradient.addColorStop(0, "yellow");
                
                renderingContext.fillStyle = radialGradient;
                renderingContext.beginPath();
                renderingContext.arc(256, 256, 200, 0, Math.PI * 2/3, true);
                renderingContext.fill();
            }
        }
        

        renderingContext.restore();
    };
    
}());