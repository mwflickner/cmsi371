/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl; // The WebGL context.

    // This variable stores 3D model information.
    var objectsToDraw;

    // The shader program to use.
    var shaderProgram;

    // Utility variable indicating whether some fatal has occurred.
    var abort = false;

    // Important state variables.
    var animationActive = false;
    var currentRotation = 0.0;
    var currentInterval;
    var vertexPosition;
    var vertexColor;

    // An individual "draw object" function.
    var drawObject;

    // The big "draw scene" function.
    var drawScene;

    // State and function for performing animation.
    var previousTimestamp;
    var advanceScene;

    // Reusable loop variables.
    var i;
    var maxi;
    var j;
    var maxj;

    /*
     * This code does not really belong here: it should live
     * in a separate library of matrix and transformation
     * functions.  It is here only to show you how matrices
     * can be used with GLSL.
     *
     * Based on the original glRotate reference:
     *     http://www.opengl.org/sdk/docs/man/xhtml/glRotate.xml
     */
    var getRotationMatrix = function (angle, x, y, z) {
        // In production code, this function should be associated
        // with a matrix object with associated functions.
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z));
        var s = Math.sin(angle * Math.PI / 180.0);
        var c = Math.cos(angle * Math.PI / 180.0);
        var oneMinusC = 1.0 - c;

        // We can't calculate this until we have normalized
        // the axis vector of rotation.
        var x2; // "2" for "squared."
        var y2;
        var z2;
        var xy;
        var yz;
        var xz;
        var xs;
        var ys;
        var zs;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        // *Now* we can calculate the other terms.
        x2 = x * x;
        y2 = y * y;
        z2 = z * z;
        xy = x * y;
        yz = y * z;
        xz = x * z;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        // GL expects its matrices in column major order.
        return [
            (x2 * oneMinusC) + c,
            (xy * oneMinusC) + zs,
            (xz * oneMinusC) - ys,
            0.0,

            (xy * oneMinusC) - zs,
            (y2 * oneMinusC) + c,
            (yz * oneMinusC) + xs,
            0.0,

            (xz * oneMinusC) + ys,
            (yz * oneMinusC) - xs,
            (z2 * oneMinusC) + c,
            0.0,

            0.0,
            0.0,
            0.0,
            1.0
        ];
    };

    /*
     * This is another function that really should reside in a
     * separate library.  But, because the creation of that library
     * is part of the student course work, we leave it here for
     * later refactoring and adaptation by students.
     */
    var getOrthoMatrix = function (left, right, bottom, top, zNear, zFar) {
        var width = right - left;
        var height = top - bottom;
        var depth = zFar - zNear;

        return [
            2.0 / width,
            0.0,
            0.0,
            0.0,

            0.0,
            2.0 / height,
            0.0,
            0.0,

            0.0,
            0.0,
            -2.0 / depth,
            0.0,

            -(right + left) / width,
            -(top + bottom) / height,
            -(zFar + zNear) / depth,
            1.0
        ];
    };

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.  Note how each object may come with a
    // rotation axis now.
    objectsToDraw = [

        new Shape({
            vertices: new Shape(Shape.pyramid()).toRawTriangleArray(),
            mode: gl.TRIANGLES,
            color: {r: 0.0, g: 1.0, b: 0.0},
            axis: { x: 1.0, y: 1.0, z: 1.0 },
            scale: {x:4.0, y:1.0, z:4.0},
            children: [
                    new Shape({
                        vertices: new Shape(Shape.icosahedron()).toRawLineArray(),
                        mode: gl.LINES,
                        color: {r: 0.0, g: 0.0, b: 1.0},
                        axis: { x: 1.0, y: 1.0, z: 1.0}
                    }),

                    new Shape({
                        vertices: new Shape(Shape.ramp()).toRawTriangleArray(),
                        mode: gl.TRIANGLES,
                        color: {r: 0.0, g: 0.0, b:0.75},
                        axis: { x:1.0, y:1.0, z:1.0},
                        scale: {x:4.0, y:2.0, z:2.0}
                    })
            ]
        })

        // new Shape({
        //     vertices: new Shape(Shape.sphere()).toRawLineArray(),
        //     mode: gl.LINES,
        //     color: {r: 0.0, g: 0.0, b:0.75},
        //     axis: { x:1.0, y:1.0, z:1.0}
        // }),

        // new Shape({
        //     vertices: new Shape(Shape.ramp()).toRawTriangleArray(),
        //     mode: gl.TRIANGLES,
        //     colors: [].concat(
        //         [ 1.0, 0.0, 0.0 ],
        //         [ 1.0, 0.0, 0.0 ],
        //         [ 1.0, 0.0, 0.0 ],
        //         [ 1.0, 0.0, 0.0 ],
        //         [ 1.0, 0.0, 0.0 ],
        //         [ 1.0, 0.0, 0.0 ],

        //         [ 0.0, 1.0, 0.0 ],
        //         [ 0.0, 1.0, 0.0 ],
        //         [ 0.0, 1.0, 0.0 ],
        //         [ 0.0, 1.0, 0.0 ],
        //         [ 0.0, 1.0, 0.0 ],
        //         [ 0.0, 1.0, 0.0 ],

        //         [ 0.0, 0.0, 1.0 ],
        //         [ 0.0, 0.0, 1.0 ],
        //         [ 0.0, 0.0, 1.0 ],
        //         [ 0.0, 0.0, 1.0 ],
        //         [ 0.0, 0.0, 1.0 ],
        //         [ 0.0, 0.0, 1.0 ],

        //         [ 1.0, 1.0, 0.0 ],
        //         [ 1.0, 1.0, 0.0 ],
        //         [ 1.0, 1.0, 0.0 ],
        //         [ 1.0, 1.0, 0.0 ],
        //         [ 1.0, 1.0, 0.0 ],
        //         [ 1.0, 1.0, 0.0 ]
        //     ),
        //     axis: { x:1.0, y:1.0, z:1.0}
        // })
    ];

    var verticesPasser = function(objectsToDraw){
        // Pass the vertices to WebGL.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            objectsToDraw[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].vertices);

            if (!objectsToDraw[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                objectsToDraw[i].colors = [];
                for (j = 0, maxj = objectsToDraw[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i].colors = objectsToDraw[i].colors.concat(
                        objectsToDraw[i].color.r,
                        objectsToDraw[i].color.g,
                        objectsToDraw[i].color.b
                    );
                }
            }
            objectsToDraw[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i].colors);

            if (objectsToDraw[i].children.length != 0) {
                verticesPasser(objectsToDraw[i].children);
            }
        }
    },

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);

    // Finally, we come to the typical setup for transformation matrices:
    // model-view and projection, managed separately.
    var modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    var projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    var rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    var translationMatrix = gl.getUniformLocation(shaderProgram, "translationMatrix");
    var scaleMatrix = gl.getUniformLocation(shaderProgram, "scaleMatrix");
    var orthoMatrix = gl.getUniformLocation(shaderProgram, "orthogonalMatrix");
    //var instanceMatrix = gl.getUniformLocation(shaderProgram, "instanceMatrix");

     // Initialize projection matrix
    gl.uniformMatrix4fv(projectionMatrix, 
        gl.FALSE,
        //left, right, bottom, top, near, far
        new Float32Array(Matrix.getFrutsumMatrix(-20, 2, -2, 2, 20, 2000).getTransposeForConsumption().elements)
    );

    // Initialize scale matrix
    gl.uniformMatrix4fv(scaleMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix.getScaleMatrix(0.5, 0.5, 0.5).getTransposeForConsumption().elements)
    );

    // Initialize translation matrix
    gl.uniformMatrix4fv(translationMatrix, 
        gl.FALSE, 
        new Float32Array(Matrix.getTranslationMatrix(0, 0, 0).getTransposeForConsumption().elements)
    );


    /*
     * Displays an individual object, including a transformation that now varies
     * for each object drawn.
     */
    drawObject = function (object) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        // Set up the model-view matrix, if an axis is included.  If not, we
        // specify the identity matrix.
        gl.uniformMatrix4fv(modelViewMatrix, gl.FALSE, new Float32Array(object.axis ?
                Matrix.getRotationMatrix(currentRotation, object.axis.x, object.axis.y, object.axis.z).elements :
                new Matrix().elements
            ));

        var instanceMatrix = new Matrix();
        instanceMatrix = instanceMatrix.multiply(
                                            Matrix.getTranslationMatrix(
                                                object.translation.x || 0,
                                                object.translation.y || 0,
                                                object.translation.z || 0
                                            )
                                        )
                                        .multiply(
                                            Matrix.getScaleMatrix(
                                                object.scale.x || 1,
                                                object.scale.y || 1,
                                                object.scale.z || 1
                                            )
                                        )
                                        .multiply(
                                                Matrix.getRotationMatrix(
                                                    object.rotation.angle || 0,
                                                    object.rotation.x || 1,
                                                    object.rotation.y || 0,
                                                    object.rotation.z || 0
                                                )
                                        );
        // Set up instance 
        gl.uniformMatrix4fv(gl.getUniformLocation(shaderProgram, "projectionMatrix"),
                gl.FALSE,
                new Float32Array(instanceMatrix.getTransposeForConsumption().elements)
            );



        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        if (object.children.length != 0){
            for(i = 0; i < object.children.length; i++){
                drawObject(object.children[i]);
            }
        }
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniformMatrix4fv(
            rotationMatrix,
            gl.FALSE,
            new Float32Array(Matrix.getRotationMatrix(
                currentRotation, 
                0, 1, 0
            ).getTransposeForConsumption().elements)
        );

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // Because our canvas element will not change size (in this program),
    // we can set up the projection matrix once, and leave it at that.
    // Note how this finally allows us to "see" a greater coordinate range.
    // We keep the vertical range fixed, but change the horizontal range
    // according to the aspect ratio of the canvas.  We can also expand
    // the z range now.
    gl.uniformMatrix4fv(projectionMatrix, gl.FALSE, new Float32Array(Matrix.getOrthoMatrix(
        -2 * (canvas.width / canvas.height),
        2 * (canvas.width / canvas.height),
        -2,
        2,
        -10,
        10
    ).elements));

    verticesPasser(objectsToDraw);
    // Animation initialization/support.
    previousTimestamp = null;
    advanceScene = function (timestamp) {
        // Check if the user has turned things off.
        if (!animationActive) {
            return;
        }

        // Initialize the timestamp.
        if (!previousTimestamp) {
            previousTimestamp = timestamp;
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // Check if it's time to advance.
        var progress = timestamp - previousTimestamp;
        if (progress < 30) {
            // Do nothing if it's too soon.
            window.requestAnimationFrame(advanceScene);
            return;
        }

        // All clear.
        currentRotation += 0.033 * progress;
        drawScene();
        if (currentRotation >= 360.0) {
            currentRotation -= 360.0;
        }

        // Request the next frame.
        previousTimestamp = timestamp;
        window.requestAnimationFrame(advanceScene);
    };

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        animationActive = !animationActive;
        if (animationActive) {
            previousTimestamp = null;
            window.requestAnimationFrame(advanceScene);
        }
    });

}(document.getElementById("matrices-webgl")));
