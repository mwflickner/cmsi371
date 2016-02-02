(function () {

    // To make something global within closure, make it a property of window
    window.SpriteLibrary = window.SpriteLibrary || { };

    SpriteLibrary.ghost = function (ghostProperties) {
        var renderingContext = ghostProperties.renderingContext;
        var ghostPosition = ghostProperties.ghostPosition;
        var ghostWidth = ghostProperties.ghostWidth;
        var eyeDirection = ghostProperties.eyeDirection;
        var canBeEaten = ghostProperties.canBeEaten || false;
        var ghostColor = ghostProperties.ghostColor;
        var ghostMood = ghostProperties.mood;

        function fillWithColor(color){
            renderingContext.fillStyle = color;
            renderingContext.fill();
        }

        function strokeWithColor(color){
            renderingContext.strokeStyle = color;
            renderingContext.stroke();
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
            //renderingContext.arc(eyePupilX + pupilDirection.x, eyePupilY + pupilDirection.y, 7/200*ghostWidth, 0, Math.PI*2);
            if (canBeEaten){
                renderingContext.fillStyle = "white";
                renderingContext.fillRect(eyePupilX - 14/200*ghostWidth, eyePupilY - 7/200*ghostWidth, 1/8*ghostWidth, 1/8*ghostWidth);
                //fillWithColor("white");
            } else {
                var pupilDirection = getPupilDirection();
                renderingContext.arc(eyePupilX + pupilDirection.x, eyePupilY + pupilDirection.y, 7/200*ghostWidth, 0, Math.PI*2);
                fillWithColor("blue");
            }
            renderingContext.closePath();
            renderingContext.restore();
        }

        function drawEye(isLeftEye){
            var eyeCenterY = ghostPosition.yPos - 1/20*ghostWidth;
            var eyeCenterX;
            if (isLeftEye){
                eyeCenterX = ghostPosition.xPos - 35/200*ghostWidth;
            } else {
                eyeCenterX = ghostPosition.xPos + 35/200*ghostWidth;
            }
            if (!canBeEaten){
                renderingContext.save();
                renderingContext.beginPath();
                renderingContext.arc(eyeCenterX,eyeCenterY, 22/200*ghostWidth, 0, Math.PI*2);
                fillWithColor("white");
                renderingContext.closePath();
                renderingContext.restore();
            }
            drawPupil(eyeCenterX, eyeCenterY);
        }

        function drawMouth() {
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.lineWidth = Math.floor(ghostWidth/100)*2
            if (canBeEaten){
                var mouthLeftX = ghostPosition.xPos - ghostWidth/3;
                var mouthRightX = ghostPosition.xPos + ghostWidth/3;
                var mouthTopY = ghostPosition.yPos + ghostWidth/4;
                var mouthBottomY = ghostPosition.yPos + ghostWidth/3;
                var mouthLength = mouthRightX - mouthLeftX;
                renderingContext.moveTo(mouthLeftX, mouthBottomY);
                var counter = 0;
                for (var x = mouthLeftX; x < mouthRightX + mouthLength/6; x = x + mouthLength/6){
                    var y = counter % 2 ? mouthTopY : mouthBottomY;
                    renderingContext.lineWidth = Math.floor(ghostWidth/100)*2
                    renderingContext.lineTo(x,y);
                    counter++;
                }
                strokeWithColor("white");
            } else {
                var mouthColor = "blue";
                if (ghostMood == "happy"){
                    renderingContext.arc(ghostPosition.xPos, ghostPosition.yPos, ghostWidth/3, 1/6*Math.PI, 5/6*Math.PI, false);
                    //renderingContext.lineCap = "round";
                    //strokeWithColor(mouthColor);
                } else if (ghostMood == "sad"){
                    var mouthCenterX = ghostPosition.xPos;
                    var mouthCenterY = ghostPosition.yPos + ghostWidth/2;
                    renderingContext.arc(mouthCenterX, mouthCenterY, ghostWidth/3, 6/5*Math.PI, 9/5*Math.PI, false);
                } else if (ghostMood == "meh"){
                    var mouthLeftX = ghostPosition.xPos - ghostWidth/3;
                    var mouthRightX = ghostPosition.xPos + ghostWidth/3;
                    var mouthY = ghostPosition.yPos + ghostWidth/4;
                    renderingContext.moveTo(mouthLeftX, mouthY);
                    renderingContext.lineTo(mouthRightX, mouthY);  
                } else if (ghostMood == "shocked"){
                    var mouthCenterY = ghostPosition.yPos + ghostWidth/3.5;
                    renderingContext.arc(ghostPosition.xPos, mouthCenterY, ghostWidth/10, 0, Math.PI*2);
                    fillWithColor(mouthColor);
                }
                renderingContext.lineCap = "round";
                strokeWithColor(mouthColor);
            }
            renderingContext.closePath();
            renderingContext.restore();
        }

        function drawBody(){
            renderingContext.save();
            renderingContext.beginPath();
            renderingContext.arc(ghostPosition.xPos, ghostPosition.yPos, ghostWidth/2, 0, Math.PI, true);
            var cursorPos = {xPos: ghostPosition.xPos - ghostWidth/2, yPos: ghostPosition.yPos + ghostWidth/2}
            renderingContext.lineTo(cursorPos.xPos, cursorPos.yPos);
            var ghostBottomRadius = ghostWidth/6;
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
            if (canBeEaten){
                fillWithColor("blue");
            } else {
                fillWithColor(ghostColor);
            }
            renderingContext.restore();
        }

        drawBody();
        drawEye(true);
        drawEye(false);
        drawMouth();
    };
    
}());