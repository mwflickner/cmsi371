/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0];
    var renderingContext = canvas.getContext("2d");

    renderingContext.save();
    renderingContext.translate(250,250);
    var pacmanProperties = {
        renderingContext: renderingContext,
        isFacingLeft: false,
        mouthDegree: 1/3*Math.PI
    }
    SpriteLibrary.pacman({renderingContext: pacmanProperties});
    renderingContext.restore();

    renderingContext.save();
    renderingContext.translate(450,250);
    var ghostProperties = {
        renderingContext: renderingContext,
        eyeDirection: "left",
        canBeEaten: false,
        ghostColor: "orange",
        ghostMood: "happy",
        isEaten: false
    }
    SpriteLibrary.ghost({renderingContext: ghostProperties});
    renderingContext.restore();

    renderingContext.save();
    renderingContext.translate(450,150);
    var heartProperties = {
        renderingContext: renderingContext,
        howBroken: 0 // lol this is dark
    }
    SpriteLibrary.heart({
        renderingContext: heartProperties
    });


    // Set a little event handler to apply the filter.
    $("#apply-filter-button").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                Nanoshop.yellowEyes
            ),
            0, 0
        );
    });
}());
