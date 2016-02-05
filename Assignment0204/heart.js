//From dondi/bazaar/canvas-template
/*
* First paren is for closure, doesn't dirty up the name space
* Keeps stuff in the func there like, Vegas
* Plus otherwise Window (top-level object) gets really cluttered
*/
(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    SpriteLibrary.heart = function (heartProperties) {
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
            renderingContext.moveTo(75,120);
            if (howBroken != 1 && howBroken <= 5){
                renderingContext.bezierCurveTo(40,102,20,80,20,62.5);
            }
            if (howBroken < 10){
                renderingContext.bezierCurveTo(20,62.5,20,25,50,25);
            }
            if (howBroken < 2){
                renderingContext.bezierCurveTo(70,25,75,37,75,40);
            } 
            fillWithColor("red");
            renderingContext.closePath();
            renderingContext.restore(); 

        }

        function drawRightHalfOfHeart(){
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.moveTo(75,120);
            if (howBroken != 4 && howBroken < 6){
                renderingContext.bezierCurveTo(110,102,130,80,130,62.5);
            }
            if (howBroken != 5 && howBroken < 8){
                renderingContext.bezierCurveTo(130,62.5,130,25,100,25);
            }
            if (howBroken != 7 && howBroken < 9){
               renderingContext.bezierCurveTo(85,25,75,37,75,40); 
            }
            fillWithColor("red");
            renderingContext.closePath();
            renderingContext.restore();
        }

        drawLeftHalfOfHeart();
        drawRightHalfOfHeart();


    };
    
}());