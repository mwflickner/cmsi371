(function(){

    var parentShape = new Shape({
            vertices: new Shape(Shape.pyramid()).toRawTriangleArray(),
            //mode: gl.TRIANGLES,
            color: {r: 0.0, g: 1.0, b: 0.0},
            axis: { x: 1.0, y: 1.0, z: 1.0 }
    });

    var kid1 = new Shape({
                vertices: new Shape(Shape.icosahedron()).toRawLineArray(),
                //mode: gl.LINES,
                color: {r: 0.0, g: 0.0, b: 1.0},
                axis: { x: 1.0, y: 1.0, z: 1.0}
    });

    var kid2 = new Shape({
                vertices: new Shape(Shape.ramp()).toRawTriangleArray(),
                //mode: gl.TRIANGLES,
                color: {r: 0.0, g: 0.0, b:0.75},
                axis: { x:1.0, y:1.0, z:1.0}
    });

    var shape1kid = new Shape({
            vertices: new Shape(Shape.pyramid()).toRawTriangleArray(),
            //mode: gl.TRIANGLES,
            color: {r: 0.0, g: 1.0, b: 0.0},
            axis: { x: 1.0, y: 1.0, z: 1.0 },
            children: [
                    new Shape({
                        vertices: new Shape(Shape.icosahedron()).toRawLineArray(),
                        //mode: gl.LINES,
                        color: {r: 0.0, g: 0.0, b: 1.0},
                        axis: { x: 1.0, y: 1.0, z: 1.0}
                    })
            ]
    });

    var shapeTwins = new Shape({
            vertices: new Shape(Shape.pyramid()).toRawTriangleArray(),
            //mode: gl.TRIANGLES,
            color: {r: 0.0, g: 1.0, b: 0.0},
            axis: { x: 1.0, y: 1.0, z: 1.0 },
            children: [
                    new Shape({
                        vertices: new Shape(Shape.icosahedron()).toRawLineArray(),
                        //mode: gl.LINES,
                        color: {r: 0.0, g: 0.0, b: 1.0},
                        axis: { x: 1.0, y: 1.0, z: 1.0}
                    }),

                    new Shape({
                        vertices: new Shape(Shape.ramp()).toRawTriangleArray(),
                        //mode: gl.TRIANGLES,
                        color: {r: 0.0, g: 0.0, b:0.75},
                        axis: { x:1.0, y:1.0, z:1.0}
                    })
            ]
    });

    var shapeNestedKids = new Shape({
            vertices: new Shape(Shape.pyramid()).toRawTriangleArray(),
            //mode: gl.TRIANGLES,
            color: {r: 0.0, g: 1.0, b: 0.0},
            axis: { x: 1.0, y: 1.0, z: 1.0 },
            children: [
                    new Shape({
                        vertices: new Shape(Shape.icosahedron()).toRawLineArray(),
                        //mode: gl.LINES,
                        color: {r: 0.0, g: 0.0, b: 1.0},
                        axis: { x: 1.0, y: 1.0, z: 1.0},
                        children: [
                            new Shape({
                                vertices: new Shape(Shape.ramp()).toRawTriangleArray(),
                                //mode: gl.TRIANGLES,
                                color: {r: 0.0, g: 0.0, b:0.75},
                                axis: { x:1.0, y:1.0, z:1.0}
                            })
                        ]
                    })    
            ]
    });

    QUnit.test("No Kid Test", function(assert){
        assert.ok(parentShape.children.length === 0, "No kids");
        assert.ok(shape1kid.children.length === 1, "1 kid length test");
        assert.ok(shapeTwins.children.length === 2, "2 kid length test");
    });

    QUnit.test("One Kid Added Test", function(assert){
        parentShape.addChild(kid1);
        assert.deepEqual(parentShape, shape1kid, "Add 1 kid");
        parentShape.removeChild();
        assert.notDeepEqual(parentShape, shape1kid, "Got rid of kid :'( Didn't love him");
    });

    QUnit.test("Two Kids Added Test", function(assert){
        parentShape.addChild(kid1);
        parentShape.addChild(kid2);
        assert.deepEqual(parentShape, shapeTwins, "Twins!");
        parentShape.removeChild();
        assert.deepEqual(parentShape, shape1kid, "Not again :'(");
        parentShape.removeChild();
        assert.ok(parentShape.children.length === 0, "</3");
    });

    QUnit.test("Nested Kids Added Test", function(assert){
        parentShape.addChild(kid1);
        parentShape.children[0].addChild(kid2);
        assert.deepEqual(parentShape, shapeNestedKids, "Have nested kids");
        parentShape.removeChild();
        assert.ok(parentShape.children.length === 0, "Kids left/were pushed out of nest");
    });

}());
