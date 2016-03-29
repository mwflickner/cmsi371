(function(){
    window.Shape = window.Shape || {};

    Shape = function(properties){
        this.x = properties.x;
        this.y = properties.y; 
        this.z = properties.z;
        this.vertices = vertices;
        this.indices = indices;
    };

    Shape.icosahedron = function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606;
        var Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    };

    Shape.cube = function(x,y,z,l){
        var x = 0, y = 0, z = 0, l = 0.75;
        return {
            vertices: [
                [x, y, z],            // 0
                [x + l, y, z],        // 1
                [x, y + l , z],       // 2
                [x, y, z + l],        // 3
                [x + l, y + l, z],    // 4
                [x + l, y, z + l],    // 5
                [x, y + l, z + l],    // 6
                [x + l, y + l, z + l] // 7
            ],

            indices: [
                [2, 3, 0],
                [2, 0, 1],

                [6, 2, 1],
                [6, 1, 5],

                [3, 7, 4],
                [3, 4, 0],

                [7, 6, 5],
                [7, 5, 4],

                [6, 7, 3],
                [6, 3, 2],

                [1, 0, 4],
                [1, 4, 5]
            ]
        };
    };

    sphere = function(){
        var latitudeBands = 10;
        var longitudeBands = 10;
        var radius = 2;

        var vertexPositionData = [];
        var colors = [];
        var indexData = [];

        for (var latNumber=0; latNumber <= latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber=0; longNumber <= longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);

                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;

                colors = [[1.0, 1.0, 0.3, 1.0]];
                vertexPositionData.push(radius * x);
                vertexPositionData.push(radius * y);
                vertexPositionData.push(radius * z);

                var first = (latNumber * (longitudeBands + 1)) + longNumber;
                var second = first + longitudeBands + 1;
                indexData.push(first);
                indexData.push(second);
                indexData.push(first + 1);

                indexData.push(second);
                indexData.push(second + 1);
                indexData.push(first + 1);
            }
        }

        return {
            vertices: vertexPositionData,
            indices: indexData
        };
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    Shape.prototype.toRawTriangleArray = function (indexedVertices) {
        var result = [];

        for (var i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    Shape.prototype.toRawLineArray = function (indexedVertices) {
        var result = [];

        for (var i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }
        return result;
    };
}());
