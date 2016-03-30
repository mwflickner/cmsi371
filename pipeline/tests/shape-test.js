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

    var shape2kids = new Shape({
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

    QUnit.test("No Kid Test", function(assert){
        assert.ok(parentShape.children === null, "No kids");
        assert.ok(shape1kid.children.length === 1, "1 kid length test");
        assert.ok(shape2kids.children.length === 2, "2 kid length test");
        assert.deepEqual(parentShape.addChild(kid1), shape1kid, "Add 1 deepEqual");
    });

}());
