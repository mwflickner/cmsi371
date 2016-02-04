//From dondi/bazaar/canvas-template
/*
* First paren is for closure, doesn't dirty up the name space
* Keeps stuff in the func there like, Vegas
* Plus otherwise Window (top-level object) gets really cluttered
*/
(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    SpriteLibrary.pacmanBall = function (ballProperties) {
        var renderingContext = ballProperties.renderingContext;
        var ballCenter = ballProperties.ballCenter;
        var ballRadius = ballProperties.ballRadius || 100;
        var isPowerball = ballProperties.isPowerball || false;
        var isEaten = ballProperties.isEaten || false;

        function fillWithColor(color){
            renderingContext.fillStyle = color;
            renderingContext.fill();
        }

        function strokeWithColor(color){
            renderingContext.strokeStyle = color;
            renderingContext.stroke();
        }

        function drawBall(){
            if (isEaten){
                return;
            }
            renderingContext.save();
            renderingContext.beginPath();
            var x = ballCenter.xPos;
            var y = ballCenter.yPos;
            if (isPowerball) {
                renderingContext.arc(x,y,2*ballRadius, 0, 2*Math.PI, true);
            } else {
                renderingContext.arc(x,y,ballRadius, 0, 2*Math.PI, true);
            }
            fillWithColor("white");
            renderingContext.closePath();
            renderingContext.restore();
        }

        drawBall();


    };
    
}());