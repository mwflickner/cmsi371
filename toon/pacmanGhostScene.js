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

    var leftGhost = function (renderingContext){
        SpriteLibrary.ghost({
            renderingContext: renderingContext,
            eyeDirection: "down",
            canBeEaten: false,
            ghostColor: "orange",
            mood: "happy",
            isEaten: false
        });
    }

    var rightGhost = function (renderingContext){
        SpriteLibrary.ghost({
            renderingContext: renderingContext,
            eyeDirection: "down",
            canBeEaten: false,
            ghostColor: "pink",
            mood: "happy",
            isEaten: false
        });
    }
        
    var fruit = function (renderingContext){
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
                },

                {
                    frame: 420,
                    tx: canvasRightEdge + 100,
                    ty: canvasCenterHeight
                },

                {
                    frame: 530,
                    tx: -100,
                    ty: canvasCenterHeight
                }
            ]
        },

        {
            draw: leftGhost,
            keyframes: [
                {
                    frame: 90,
                    tx: -50,
                    ty: canvasCenterHeight,
                    ghostColor: "orange",
                    ghostMood: "happy",
                    eyeDirection: "right",
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 165,
                    tx: canvas.width/2 - 170,
                    ty: canvasCenterHeight,
                    ghostColor: "orange",
                    ghostMood: "meh",
                    eyeDirection: "right",
                    ease: KeyframeTweener.sineEaseInAndOut
                },

                {
                    frame: 210,
                    tx: canvasRightEdge - 175,
                    ty: canvasCenterHeight,
                    ghostColor: "orange",
                    ghostMood: "sad",
                    eyeDirection: "right",
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 220,
                    tx: canvasRightEdge - 150,
                    ty: canvasCenterHeight,
                    ghostColor: "orange",
                    ghostMood: "sad",
                    eyeDirection: "down",
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 240,
                    tx: canvasRightEdge - 150,
                    ty: canvasCenterHeight,
                    ghostColor: "orange",
                    ghostMood: "sad",
                    eyeDirection: "left",
                    ease: KeyframeTweener.linear
                },

                {
                    frame: 330,
                    tx: -100,
                    ty: canvasCenterHeight,
                    ghostColor: "pink",
                    ghostMood: "happy",
                    eyeDirection: "right"
                },

                {
                    frame: 420,
                    tx: -120,
                    ty: canvasCenterHeight,
                    ghostColor: "pink",
                    ghostMood: "happy",
                    eyeDirection: "right"
                },

                {
                    frame: 440,
                    tx: canvas.width/8,
                    ty: canvasCenterHeight,
                    ghostColor: "pink",
                    ghostMood: "shocked",
                    eyeDirection: "right",
                    canBeEaten: false
                },

                {
                    frame: 468,
                    tx: canvas.width/4,
                    ty: canvasCenterHeight,
                    ghostColor: "pink",
                    ghostMood: "sad",
                    eyeDirection: "right",
                    canBeEaten: true
                },

                {
                    frame: 485,
                    tx: canvas.width/4 + 50,
                    ty: canvasCenterHeight,
                    ghostColor: "pink",
                    ghostMood: "happy",
                    eyeDirection: "right",
                    canBeEaten: false,
                    ghostIsEaten: true
                },

                {
                    frame: 520,
                    tx: canvas.width/4 + 50,
                    ty: canvasCenterHeight,
                    ghostColor: "pink",
                    ghostMood: "sad",
                    eyeDirection: "down",
                    canBeEaten: false,
                    ghostIsEaten: true
                },

                {
                    frame: 600,
                    tx: canvas.width/4 + 50,
                    ty: canvasCenterHeight,
                    ghostColor: "pink",
                    ghostMood: "sad",
                    eyeDirection: "down",
                    canBeEaten: false,
                    ghostIsEaten: true
                },

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
                    ease: KeyframeTweener.sineEaseInAndOut
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

        {
            draw: heart,
            keyframes: [
                {
                    frame: 90,
                    tx: -40,
                    ty: heartHeight,
                    howBroken: 0
                }
        },

        {
            draw: rightGhost,
            keyframes: [
                {
                    frame: 340,
                    tx: canvasRightEdge + 100,
                    ty: canvasCenterHeight,
                    ghostColor: "pink",
                    ghostMood: "happy",
                    eyeDirection: "left",
                    ease: KeyframeTweener.sineEaseInAndOut
                },

                {
                    frame: 370,
                    tx: 3*canvas.width/4,
                    ty: canvasCenterHeight,
                    ghostColor: "pink",
                    ghostMood: "happy",
                    eyeDirection: "right",
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 400,
                    tx: canvasRightEdge + 50,
                    ty: canvasCenterHeight,
                }
            ]
        },

        {
            draw: fruit,
            keyframes: [
                {
                    frame: 340,
                    tx: 3*canvas.width/4 + 50,
                    ty: canvasCenterHeight - 33,
                    fruitType: "cherry",
                    sx: 0.33,
                    sy: 0.33
                },

                {
                    frame: 370,
                    tx: 3*canvas.width/4 + 50,
                    ty: canvasCenterHeight - 33,
                    sx: 0.33,
                    sy: 0.33,
                    ease: KeyframeTweener.quadEaseOut
                },

                {
                    frame: 400,
                    tx: canvasRightEdge + 100,
                    ty: canvasCenterHeight - 33,
                    sx: 0.33,
                    sy: 0.33
                }
            ]
        },

        {
            draw: fruit,
            keyframes: [
                {
                    frame: 430,
                    tx: -50,
                    ty: canvasCenterHeight - 33,
                    fruitType: "cherry",
                    sx: 0.33,
                    sy: 0.33
                },

                {
                    frame: 476,
                    tx: canvas.width/4 + 60,
                    ty: canvasCenterHeight - 33,
                    sx: 0.33,
                    sy: 0.33,
                    ease: KeyframeTweener.quadEaseOut
                }
            ]
        },

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
                    frame: 410,
                    tx: canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 508,
                    tx: canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
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
                    frame: 410,
                    tx: canvasRightEdge/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 500,
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
                    frame: 410,
                    tx: canvasRightEdge/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 492,
                    tx: canvasRightEdge/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
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
                    frame: 410,
                    tx: canvasRightEdge/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 484,
                    tx: canvasRightEdge/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
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
                    frame: 410,
                    tx: 5*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 476,
                    tx: 5*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
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
                    frame: 410,
                    tx: canvas.width/2,
                    ty: canvasCenterHeight,
                    ballIsEaten: false,
                    isPowerball: true
                },

                {
                    frame: 468,
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
                    frame: 410,
                    tx: 7*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 460,
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
                    frame: 410,
                    tx: 2*canvasRightEdge/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 454,
                    tx: 2*canvasRightEdge/3,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
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
                    frame: 410,
                    tx: 3*canvasRightEdge/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 446,
                    tx: 3*canvasRightEdge/4,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
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
                    frame: 410,
                    tx: 5*canvasRightEdge/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 438,
                    tx: 5*canvasRightEdge/6,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
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
                    frame: 410,
                    tx: 11*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: false
                },

                {
                    frame: 430,
                    tx: 11*canvasRightEdge/12,
                    ty: canvasCenterHeight,
                    sx: 0.5,
                    sy: 0.5,
                    ballIsEaten: true
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
