(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    SpriteLibrary.ghost = function (ghostProperties) {
        var renderingContext = ghostProperties.renderingContext;
        var ghostPosition = ghostProperties.ghostPosition;
        var ghostWidth = ghostProperties.ghostWidth;
        var eyeDirection = ghostProperties.eyeDirection;
        var isBlinking = ghostProperties.isBlinking || false;
        var ghostColor = ghostProperties.ghostColor;

        function fillWithColor(renderingContext, color){
            renderingContext.fillStyle = color;
            renderingContext.fill();
        }

        function drawPupil(eyePupilX, eyePupilY){
            function getPupilDirection(){
                if(eyeDirection == "left"){
                    return {x: -7/200*ghostWidth, y: 0};
                }
                if(eyeDirection == "right"){
                    return {x: 7/200*ghostWidth, y: 0};
                }
                if(eyeDirection == "up"){
                    return {x: 0, y: -8/200*ghostWidth};
                }
                if(eyeDirection == "down"){
                    return {x: 0, y: 8/200*ghostWidth};
                }
                return {x: 0, y: 0};
            }
            renderingContext.save();
            renderingContext.beginPath();
            var pupilDirection = getPupilDirection();
            renderingContext.arc(eyePupilX + pupilDirection.x, eyePupilY + pupilDirection.y, 7/200*ghostWidth, 0, Math.PI*2);
            fillWithColor(renderingContext, "black");
            renderingContext.closePath();
            renderingContext.restore();
        }

        function drawLeftEye(){
            var leftEyeCenterX = ghostPosition.xPos - 35/200*ghostWidth;
            var leftEyeCenterY = ghostPosition.yPos - 1/20*ghostWidth;
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.arc(leftEyeCenterX,leftEyeCenterY, 22/200*ghostWidth, 0, Math.PI*2);
            fillWithColor(renderingContext,"white");
            renderingContext.closePath();
            drawPupil(leftEyeCenterX, leftEyeCenterY);
            renderingContext.restore();
        }

        function drawRightEye(){
            var rightEyeCenterX = ghostPosition.xPos + 35/200*ghostWidth;
            var rightEyeCenterY = ghostPosition.yPos - 1/20*ghostWidth;
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.arc(rightEyeCenterX,rightEyeCenterY, 22/200*ghostWidth, 0, Math.PI*2);
            fillWithColor(renderingContext,"white");
            renderingContext.closePath();
            drawPupil(rightEyeCenterX, rightEyeCenterY);
            renderingContext.restore();
        }

        renderingContext.save();
        renderingContext.beginPath();

        //Draw the body
        renderingContext.arc(ghostPosition.xPos, ghostPosition.yPos, ghostWidth/2, 0, Math.PI, true);
        var cursorPos = {xPos: ghostPosition.xPos - ghostWidth/2, yPos: ghostPosition.yPos + ghostWidth/2}
        renderingContext.lineTo(cursorPos.xPos, cursorPos.yPos);
        var ghostBottomRadius = ghostWidth/8;
        for (var i = cursorPos.xPos + ghostBottomRadius; i < cursorPos.yPos; i = i+ghostBottomRadius*2){
            renderingContext.save();
            renderingContext.arc(i, cursorPos.yPos, ghostBottomRadius, 0, Math.PI, false);
            renderingContext.restore();
        }
        cursorPos.xPos = cursorPos.yPos;
        renderingContext.lineTo(cursorPos.xPos,cursorPos.yPos);
        cursorPos.yPos = 2/3*cursorPos.xPos
        renderingContext.lineTo(cursorPos.xPos,cursorPos.yPos);
        renderingContext.closePath();

        if (isBlinking) {
            alert("not supported yet");
        } else {
            fillWithColor(renderingContext, ghostColor);
            renderingContext.restore();
            drawRightEye();
            drawLeftEye();
            
            
        }

        renderingContext.restore();
    };
    
}());