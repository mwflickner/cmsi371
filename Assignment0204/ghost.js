(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    SpriteLibrary.ghost = function (ghostProperties) {
        var renderingContext = ghostProperties.renderingContext;
        var isBlinking = ghostProperties.isBlinking || false;
        var ghostColor = ghostProperties.ghostColor;

        function fillWithColor(renderingContext, color){
            renderingContext.fillStyle = color;
            renderingContext.fill()
        }

        function drawPupil(renderingContext, eyePupilX, eyePupilY){
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.arc(eyePupilX, eyePupilY, 7, 0, Math.PI*2);
            fillWithColor(renderingContext, "black");
            renderingContext.closePath();
            renderingContext.restore();
        }

        function drawLeftEye(renderingContext, pupilOffsetX, pupilOffsetY){
            var leftEyeCenterX = 165;
            var leftEyeCenterY = 190;
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.arc(leftEyeCenterX,leftEyeCenterY, 22, 0, Math.PI*2);
            fillWithColor(renderingContext,"white");
            renderingContext.closePath();
            drawPupil(renderingContext, leftEyeCenterX + pupilOffsetX, leftEyeCenterY + pupilOffsetY);
            renderingContext.restore();
        }

        function drawRightEye(renderingContext, pupilOffsetX, pupilOffsetY){
            var rightEyeCenterX = 235;
            var rightEyeCenterY = 190;
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.arc(rightEyeCenterX,rightEyeCenterY, 22, 0, Math.PI*2);
            fillWithColor(renderingContext,"white");
            renderingContext.closePath();
            drawPupil(renderingContext, rightEyeCenterX + pupilOffsetX, rightEyeCenterY + pupilOffsetY);
            renderingContext.restore();
        }

        renderingContext.save();
        renderingContext.beginPath();

        //Draw the body
        renderingContext.arc(200,200, 100, 0, Math.PI, true);
        renderingContext.lineTo(100, 300);
        for (var i = 125; i < 300; i = i+50){
            renderingContext.save();
            renderingContext.arc(i,300, 25, 0, Math.PI, false);
            renderingContext.restore();
        }
        renderingContext.lineTo(300,300);
        renderingContext.lineTo(300,200);

        renderingContext.closePath();
        //renderingContext.stroke();

        if (isBlinking) {
            alert("not supported yet");
        } else {
            fillWithColor(renderingContext, ghostColor);
            renderingContext.restore();
            drawRightEye(renderingContext, 8, 0);
            drawLeftEye(renderingContext, 8, 0);
            
            
        }
        //renderingContext.stroke();

        //Draw t

        renderingContext.restore();
    };
    
}());