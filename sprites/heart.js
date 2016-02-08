//From dondi/bazaar/canvas-template
/*
* First paren is for closure, doesn't dirty up the name space
* Keeps stuff in the func there like, Vegas
* Plus otherwise Window (top-level object) gets really cluttered
*/
(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    SpriteLibrary.heart = function (heartProperties){
        // Some code modified from Mozilla Canvas Tutorial

        var renderingContext = heartProperties.renderingContext;
        var howBroken = heartProperties.howBroken;

        function fillWithColor(color){
            renderingContext.fillStyle = color;
            renderingContext.fill();
        }

        function drawLeftHalfOfHeart(){
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.moveTo(0,0);
            if (howBroken != 1 && howBroken <= 5){
                renderingContext.bezierCurveTo(/*check*/-35,-18,-50,-40,-55,-57.5);
            }
            if (howBroken < 10){
                renderingContext.bezierCurveTo(-55,-57.5,-55,-95,-25,-95);
            }
            if (howBroken < 2){
                renderingContext.bezierCurveTo(-10,-95,0,-83,0,-80);
            } 
            fillWithColor("red");
            renderingContext.closePath();
            renderingContext.restore(); 
        }

        function drawRightHalfOfHeart(){
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.moveTo(0,0);
            if (howBroken != 4 && howBroken < 6){
                renderingContext.bezierCurveTo(35,-18,55,-40,55,-57.5);
            }
            if (howBroken != 5 && howBroken < 8){
                renderingContext.bezierCurveTo(55,-57.5,55,-95,25,-95);
            }
            if (howBroken != 7 && howBroken < 9){
               renderingContext.bezierCurveTo(10,-95,0,-83,0,-80); 
            }
            fillWithColor("red");
            renderingContext.closePath();
            renderingContext.restore();
        }

        drawLeftHalfOfHeart();
        drawRightHalfOfHeart();


    };
    
}());