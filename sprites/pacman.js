//From dondi/bazaar/canvas-template
/*
* First paren is for closure, doesn't dirty up the name space
* Keeps stuff in the func there like, Vegas
* Plus otherwise Window (top-level object) gets really cluttered
*/
(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    SpriteLibrary.pacman = function (pacmanProperties){
        var tweenable = pacmanProperties.renderingContext;
        var renderingContext = tweenable.renderingContext;
        var isFacingLeft = tweenable.isFacingLeft || false;
        var mouthDegree = tweenable.mouthDegree || Math.PI/4;
        var pacmanRadius = pacmanProperties.pacmanRadius || 100;
        var pacmanCenter = {xPos: 0, yPos: 0};

        function fillWithColor(color){
            renderingContext.fillStyle = color;
            renderingContext.fill();
        }

        function strokeWithColor(color){
            renderingContext.strokeStyle = color;
            renderingContext.stroke();
        }

        function drawPacman(){
            renderingContext.save();
            renderingContext.beginPath();
            var x = pacmanCenter.xPos;
            var y = pacmanCenter.yPos;
            if (isFacingLeft){
                renderingContext.arc(x, y, pacmanRadius, Math.PI + mouthDegree/2, Math.PI - mouthDegree/2, false);
            } else {
                renderingContext.arc(x, y, pacmanRadius, mouthDegree/2, -mouthDegree/2, false);
            }     
            renderingContext.lineTo(pacmanCenter.xPos, pacmanCenter.yPos);
            fillWithColor("yellow");
            renderingContext.closePath();
            renderingContext.restore();
        }

        drawPacman();


    };
    
}());