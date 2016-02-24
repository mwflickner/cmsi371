/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas");

    // First, a selection of "drawing functions" from which we
    // can choose.  Their common trait: they all accept a single
    // renderingContext argument.
    var pacman = function (renderingContext){
        SpriteLibrary.pacman({
            renderingContext: renderingContext,
            isFacingLeft: false,
            mouthDegree: Math.PI/4
        });
    }

    var orangeGhost = function (renderingContext){
        SpriteLibrary.ghost({
            renderingContext: renderingContext,
            eyeDirection: "down",
            canBeEaten: false,
            ghostColor: "orange",
            mood: "happy",
            isEaten: false
        });
    }

    var pinkGhost = function (renderingContext){
        SpriteLibrary.ghost({
            renderingContext: renderingContext,
            eyeDirection: "down",
            canBeEaten: false,
            ghostColor: "pink",
            mood: "happy",
            isEaten: false
        });
    }
        
    var fruit1 = function (renderingContext){
        SpriteLibrary.fruit({
            renderingContext: renderingContext,
            fruitType: "cherry",
            isEaten: false
        });
    }

    var ball = function (renderingContext){
        SpriteLibrary.pacmanBall({
            renderingContext: renderingContext,
            isPowerball: false
        });
    }

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.
    var canvasCenterHeight = canvas.height/2;
    var canvasCenterWidth = canvas.width/2;
    var canvasRightEdge = canvas.width;
    var canvasBottomEdge = canvas.height;
    
    // Now, to actually define the animated sprites.  Each sprite
    // has a drawing function and an array of keyframes.
    var sprites = [
        {
            draw: pacman,
            keyframes: [
                {
                    frame: 0,
                    tx: -100,
                    ty: canvasCenterHeight,
                    ease: KeyframeTweener.linear
                },

                // The last keyframe does not need an easing function.
                {
                    frame: 80,
                    tx: canvasRightEdge + 100,
                    ty: canvasCenterHeight,
                    ease: KeyframeTweener.linear
                    //rotate: 60 // Keyframe.rotate uses degrees.
                },

                {
                    frame: 100,
                    tx: canvasRightEdge + 100,
                    ty: canvasCenterHeight,
                    isFacingLeft: true,
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 140,
                    tx: canvasCenterWidth,
                    ty: canvasCenterHeight,
                    isFacingLeft: false,
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 180,
                    tx: canvasRightEdge + 100,
                    ty: canvasCenterHeight
                }
            ]
        }

        // {
        //     draw: orangeGhost,
        //     keyframes: [
        //         {
        //             frame: 50,
        //             tx: 300,
        //             ty: canvasBottomEdge,
        //             //sx: 0.5,
        //             //sy: 0.5,
        //             ease: KeyframeTweener.quadEaseOut
        //         },

        //         {
        //             frame: 100,
        //             tx: 300,
        //             ty: 100,
        //             //sx: 3,
        //             //sy: 0.25,
        //             ease: KeyframeTweener.quadEaseOut
        //         },

        //         {
        //             frame: 150,
        //             tx: 400,
        //             ty: 100,
        //             //sx: 0.5,
        //             //sy: 0.5
        //         }
        //     ]
        // },

        // {
        //     draw: pinkGhost,
        //     keyframes: [
        //         {
        //             frame: 50,
        //             tx: 300,
        //             ty: canvasBottomEdge + 100,
        //             //sx: 0.5,
        //             //sy: 0.5,
        //             ease: KeyframeTweener.quadEaseOut
        //         },

        //         {
        //             frame: 100,
        //             tx: 300,
        //             ty: 200,
        //             //sx: 3,
        //             //sy: 0.25,
        //             ease: KeyframeTweener.quadEaseOut
        //         },

        //         {
        //             frame: 150,
        //             tx: 300,
        //             ty: 100,
        //             //sx: 0.5,
        //             //sy: 0.5
        //         }
        //     ]
        // },

        // {
        //     draw: fruit1,
        //     keyframes: [
        //         {
        //             frame: 50,
        //             tx: 300,
        //             ty: canvasBottomEdge + 100,
        //             sx: 0.25,
        //             sy: 0.25,
        //             ease: KeyframeTweener.quadEaseOut
        //         },

        //         {
        //             frame: 100,
        //             tx: 300,
        //             ty: 200,
        //             sx: 0.25,
        //             sy: 0.25,
        //             ease: KeyframeTweener.quadEaseOut
        //         },

        //         {
        //             frame: 150,
        //             tx: 300,
        //             ty: 100,
        //             sx: 0.25,
        //             sy: 0.25
        //         }
        //     ]
        // },

        // {
        //     draw: ball,
        //     keyframes: [
        //         {
        //             frame: 50,
        //             tx: 300,
        //             ty: canvasCenterHeight,
        //             ease: KeyframeTweener.quadEaseOut
        //         },

        //         {
        //             frame: 100,
        //             tx: 300,
        //             ty: canvasCenterHeight,
        //             ease: KeyframeTweener.quadEaseOut
        //         },

        //         {
        //             frame: 150,
        //             tx: 300,
        //             ty: canvasCenterHeight
        //         }
        //     ]
        // }
    ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites
    });
}());
