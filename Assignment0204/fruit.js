//From dondi/bazaar/canvas-template
/*
* First paren is for closure, doesn't dirty up the name space
* Keeps stuff in the func there like, Vegas
* Plus otherwise Window (top-level object) gets really cluttered
*/
(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    var fruitImage = new Image();
    var fruitLoaded = false;
    fruitImage.addEventListener("load", function(){
        fruitLoaded = true;
    }, false);
    fruitImage.src = /* TODO fruitType+ */ "cherry.png";

    SpriteLibrary.fruit = function (fruitProperties) {
        var renderingContext = fruitProperties.renderingContext;
        var fruitType = fruitProperties.fruitType;
        var isEaten = fruitProperties.isEaten || false;

        function drawFruit(){
            if (isEaten || !fruitLoaded){
                return;
            }
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.drawImage(fruitImage, 0, 0);
            renderingContext.closePath();
            renderingContext.restore();
        }

        drawFruit();


    };
    
}());