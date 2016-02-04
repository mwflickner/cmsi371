//From dondi/bazaar/canvas-template
/*
* First paren is for closure, doesn't dirty up the name space
* Keeps stuff in the func there like, Vegas
* Plus otherwise Window (top-level object) gets really cluttered
*/
(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    SpriteLibrary.fruit = function (fruitProperties) {
        var renderingContext = fruitProperties.renderingContext;
        var fruitType = fruitProperties.fruitType;
        var isEaten = fruitProperties.isEaten || false;

        function drawFruit(){
            if (isEaten){
                return;
            }
            renderingContext.save();
            renderingContext.beginPath();
            var fruitImage = new Image();
            fruitImage.addEventListener("load", function(){
                renderingContext.drawImage(fruitImage,0,0);
            }, false);
            fruitImage.src = fruitType+".png";
            renderingContext.closePath();
            renderingContext.restore();
        }

        drawFruit();


    };
    
}());