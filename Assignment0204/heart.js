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
        var renderingContext = heartProperties.renderingContext;
        var heartCenter = heartProperties.heartCenter;
        var heartCenterHeight = heartProperties.heartCenterHeight;
        var howBroken = heartProperties.howBroken;

        function fillWithColor(color){
            renderingContext.fillStyle = color;
            renderingContext.fill();
        }

        function drawLeftHalfOfHeart(){
            renderingContext.save();
            renderingContext.beginPath();
            var x = heartCenter.xPos;
            var y = heartCenter.yPos;
            renderingContext.moveTo(75,40);
            renderingContext.bezierCurveTo(75,37,70,25,50,25);
            renderingContext.bezierCurveTo(20,25,20,62.5,20,62.5);
            renderingContext.bezierCurveTo(20,80,40,102,75,120);
            fillWithColor("red");
            renderingContext.closePath();
            renderingContext.restore(); 

        }

        function drawRightHalfOfHeart(){
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.moveTo(75,120);
            renderingContext.bezierCurveTo(110,102,130,80,130,62.5);
            renderingContext.bezierCurveTo(130,62.5,130,25,100,25);
            renderingContext.bezierCurveTo(85,25,75,37,75,40);
            fillWithColor("red");
            renderingContext.closePath();
            renderingContext.restore();
        }

        drawLeftHalfOfHeart();
        drawRightHalfOfHeart();


    };
    
}());