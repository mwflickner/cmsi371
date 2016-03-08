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

    var redGhost = function (renderingContext){
        SpriteLibrary.ghost({
            renderingContext: renderingContext,
            eyeDirection: "down",
            canBeEaten: false,
            ghostColor: "red",
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

    var heart = function (renderingContext){
        SpriteLibrary.heart({
            renderingContext: renderingContext,
            howBroken: 0
        });
    }

    // Then, we have "easing functions" that determine how
    // intermediate frames are computed.
    var canvasCenterHeight = canvas.height/2;
    var canvasCenterWidth = canvas.width/2;
    var canvasRightEdge = canvas.width;
    var canvasBottomEdge = canvas.height;

    var heartHeight = canvasCenterHeight - 100;
    
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

                {
                    frame: 110,
                    tx: canvasRightEdge + 100,
                    ty: canvasCenterHeight,
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 165,
                    tx: canvasCenterWidth,
                    ty: canvasCenterHeight,
                    isFacingLeft: false,
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 210,
                    tx: canvasRightEdge + 100,
                    ty: canvasCenterHeight
                }
            ]
        },

        {
            draw: orangeGhost,
            keyframes: [
                {
                    frame: 90,
                    tx: -50,
                    ty: canvasCenterHeight,
                    ghostMood: "happy",
                    eyeDirection: "right",
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 165,
                    tx: canvas.width/2 - 150,
                    ty: canvasCenterHeight,
                    ghostMood: "meh",
                    eyeDirection: "right",
                    ease: KeyframeTweener.quadEaseInAndOut
                },

                {
                    frame: 210,
                    tx: canvasRightEdge - 175,
                    ty: canvasCenterHeight,
                    ghostMood: "sad",
                    eyeDirection: "right",
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 220,
                    tx: canvasRightEdge - 150,
                    ty: canvasCenterHeight,
                    ghostMood: "sad",
                    eyeDirection: "down",
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 240,
                    tx: canvasRightEdge - 150,
                    ty: canvasCenterHeight,
                    ghostMood: "sad",
                    eyeDirection: "left",
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 330,
                    tx: -100,
                    ty: canvasCenterHeight
                }
            ]
        },

        {
            draw: heart,
            keyframes: [
                {
                    frame: 90,
                    tx: -40,
                    ty: heartHeight,
                    howBroken: 0
                },

                {
                    frame: 165,
                    tx: canvas.width/2 - 140,
                    ty: heartHeight,
                    howBroken: 0,
                    ease: KeyframeTweener.quadEaseInAndOut
                },

                {
                    frame: 210,
                    tx: canvasRightEdge - 165,
                    ty: heartHeight,
                    howBroken: 1
                },

                {
                    frame: 220,
                    tx: canvasRightEdge - 140,
                    ty: heartHeight,
                    howBroken: 2
                },

                {
                    frame: 240,
                    tx: canvasRightEdge - 140,
                    ty: heartHeight,
                    howBroken: 2,
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 330,
                    tx: -90,
                    ty: heartHeight,
                    howBroken: 3
                }
            ]
        },

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

        // #1 Left-most ball
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                },

                {
                    frame: 8,
                    tx: canvas.width/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                }
            ]
        },

        // #2
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: canvasRightEdge/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                },

                {
                    frame: 16,
                    tx: canvas.width/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: canvasRightEdge/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: canvasRightEdge/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                }
            ]
        },

        // #3
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: canvasRightEdge/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                },

                {
                    frame: 24,
                    tx: canvas.width/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: canvasRightEdge/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: canvasRightEdge/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                }
            ]
        },

        // #4
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: canvasRightEdge/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                },

                {
                    frame: 32,
                    tx: canvas.width/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: canvasRightEdge/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: canvasRightEdge/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                }
            ]
        },

        // #5
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: 5*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                },

                {
                    frame: 40,
                    tx: 5*canvas.width/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: 5*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: 5*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                }
            ]
        },

        // #6 Center ball
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: canvas.width/2,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                },

                {
                    frame: 48,
                    tx: canvas.width/2,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: canvas.width/2,
                    ty: canvasCenterHeight,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: canvasRightEdge/2,
                    ty: canvasCenterHeight
                }
            ]
        },

        // #7
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: 7*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                },

                {
                    frame: 56,
                    tx: 7*canvas.width/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: 7*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: 7*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                }
            ]
        },

        // #8
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: 2*canvasRightEdge/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                },

                {
                    frame: 64,
                    tx: 2*canvas.width/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: 2*canvasRightEdge/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: 2*canvasRightEdge/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                }
            ]
        },

        // #9
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: 3*canvasRightEdge/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                },

                {
                    frame: 72,
                    tx: 3*canvas.width/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: 3*canvasRightEdge/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: 3*canvasRightEdge/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                }
            ]
        },

        // #10
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: 5*canvasRightEdge/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                },

                {
                    frame: 80,
                    tx: 5*canvas.width/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: 5*canvasRightEdge/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: 5*canvasRightEdge/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                }
            ]
        },

        // #11 Right-most ball
        {
            draw: ball,
            keyframes: [
                {
                    frame: 0,
                    tx: 11*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                },

                {
                    frame: 88,
                    tx: 11*canvas.width/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
                },

                {
                    frame: 350,
                    tx: 11*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 450,
                    tx: 11*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5
                }
            ]
        }
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
