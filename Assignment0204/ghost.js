(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    SpriteLibrary.ghost = function (ghostProperties) {
        var renderingContext = ghostProperties.renderingContext;
        var isBlinking = ghostProperties.isBlinking || false;
        var color = ghostProperties.color;

        renderingContext.save();

        if (isBlinking) {
    
        } else {
            
        }

        renderingContext.restore();
    };
    
}());