//From dondi/bazaar/canvas-template
/*
* First paren is for closure, doesn't dirty up the name space
* Keeps stuff in the func there like, Vegas
* Plus otherwise Window (top-level object) gets really cluttered
*/
(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    var myFruitImages = new Array();

    var strawberryImage = new Image();
    var strawberryLoaded = false;
    strawberryImage.addEventListener("load", function(){
        myFruitImages["strawberry"] = strawberryImage;
        strawberryLoaded = true;
    }, false);
    strawberryImage.src = "../sprites/strawberry.png";


    var cherryImage = new Image();
    var cherryLoaded = false;
    cherryImage.addEventListener("load", function(){
        myFruitImages["cherry"] = cherryImage;
        cherryLoaded = true;
    }, false);
    cherryImage.src = "../sprites/cherry1.png";


    SpriteLibrary.fruit = function (fruitProperties){
        var tweenable = fruitProperties.renderingContext;
        var renderingContext = tweenable.renderingContext;
        var fruitType = tweenable.fruitType || "cherry";
        var isEaten = tweenable.fruitIsEaten || false;

        function drawFruit(){
            var noDraw = isEaten || !cherryLoaded || !strawberryLoaded
            if (noDraw){
                return;
            }
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.drawImage(myFruitImages[fruitType], 0, 0);
            renderingContext.closePath();
            renderingContext.restore();
        }
        
        drawFruit();
    };
    
}());
