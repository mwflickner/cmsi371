(function(){
    var identity = new Matrix();
    var identityElements =  [
                         1,0,0,0,
                         0,1,0,0,
                         0,0,1,0,
                         0,0,0,1
                        ];

    var m2Elements = [
                      1,1,1,1,
                      1,1,1,1,
                      1,1,1,1,
                      1,1,1,1
                    ];

    var m2 = new Matrix(
                    1, 1, 1, 1,
                    1, 1, 1, 1,
                    1, 1, 1, 1,
                    1, 1, 1, 1
                );

    var m2timesm2 = new Matrix(
                        4,4,4,4,
                        4,4,4,4,
                        4,4,4,4,
                        4,4,4,4
                    );

    var translate111 = new Matrix(
                        1,0,0,1,
                        0,1,0,1,
                        0,0,1,1,
                        0,0,0,1
                    );
    var scalar222 = new Matrix(
                    2,0,0,0,
                    0,2,0,0,
                    0,0,2,0,
                    0,0,0,1
                );

    QUnit.test("Creation Test", function(assert){
        assert.ok(16 === identity.dimension(), "Dimension!");
        assert.deepEqual(identity,identity,"Identity DeepEqual");
        assert.deepEqual(m2.elements, m2Elements, "General DeepEqual");
    });

    QUnit.test("Equals Test", function(assert){
        assert.ok(identity.equals(new Matrix()), "Identity Equality");
        assert.ok(m2.equals(m2), "Self Equality");
        assert.notOk(identity.equals(m2), "Not the same matrices");
        assert.notDeepEqual(identity, m2, "Not the same deepEqual");
    });

    QUnit.test("Multiply Test", function(assert){
        assert.deepEqual(
            identity.multiply(identity).elements,
            identity.elements,
            "I x I = I elements deep equal"
        );
        assert.deepEqual(identity.multiply(identity), identity, "I x I = I DeepEqual");
        assert.notDeepEqual(identity.multiply(m2), identity, "I x M != I DeepEqual");
        assert.deepEqual(identity.multiply(m2), m2, "I x M = M DeepEqual");
        assert.deepEqual(m2.multiply(m2), m2timesm2, "M x M = 2*M DeepEqual");
    });

    QUnit.test("Get Translation Test", function(assert){
        assert.deepEqual(
            Matrix.getTranslationMatrix(1,1,1),
            translate111,
            "getTranslate(1,1,1) = translate111"
        );
    });

    QUnit.test("Get Scalar Test", function(assert){
        assert.deepEqual(
            Matrix.getScaleMatrix(2,2,2),
            scalar222,
            "getScale(2,2,2) = scalar222"
        );
    });

    // QUnit.test("Get Rotation Test", function(assert){

    // });

    // QUnit.test("Get OrthoProjection Test", function(assert){

    // });

    // QUnit.test("Get Frutsum Test", function(assert){

    // });


}());