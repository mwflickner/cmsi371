(function(){
    window.Shape = window.Shape || {};

    Shape = function(properties) {
        this.x = properties.x;
        this.y = properties.y; 
        this.z = properties.z;
        this.vertices = properties.vertices || [];
        this.indices = properties.indices || [];
        this.children = properties.children || [];
        this.color = properties.color || {r:0.0,g:0.0,b:0.0};
        this.colors = properties.colors || null;
        this.mode = properties.mode;
        this.axis = properties.axis || {x:0.0, y:0.0, z:0.0};
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

    Shape.cube = function () {
        return {
            vertices: [
                [ 0.5, 0.5, 0.5 ],
                [ 0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, 0.5 ],
                [ 0.5, -0.5, 0.5 ],
                [ 0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, 0.5 ]
            ],

            indices: [
                [ 0, 1, 3 ],
                [ 2, 3, 1 ],
                [ 0, 3, 4 ],
                [ 7, 4, 3 ],
                [ 0, 4, 1 ],
                [ 5, 1, 4 ],
                [ 1, 5, 6 ],
                [ 2, 1, 6 ],
                [ 2, 7, 3 ],
                [ 6, 7, 2 ],
                [ 4, 7, 6 ],
                [ 5, 4, 6 ]
            ]
        };
    };

    Shape.pyramid = function(){
        return {
            vertices: [
                [-0.5, -0.5, -0.5],
                [-0.5, -0.5, 0.5],
                [0.5, -0.5, 0.5],
                [0.5, -0.5, -0.5],
                [0.0, 0.5, 0.0]
            ],

            indices: [
                [0,1,2],
                [0,2,3],
                [0,4,1],
                [0,4,3],
                [3,4,2],
                [2,4,1]
            ]
        }
    };

    Shape.ramp = function() {
        return {
            vertices: [
                [-0.5, -0.5, -0.5], // 0
                [-0.5, -0.5, 0.5],  // 1
                [-0.5, 0.5, 0.5],   // 2
                [-0.5, 0.5, -0.5],  // 3
                [0.5, 0.5, 0.5],    // 4
                [0.5, 0.5, -0.5]    // 5
            ],

            indices: [
                [0,3,5],
                [1,2,4],

                [0,1,2],
                [2,3,0],

                [2,3,5],
                [5,4,2],

                [0,5,1],
                [1,4,5]
            ]
        }
    }

    Shape.sphere = function () {
        var vertices = [],
            indices = [],
            radius = 1,
            latitude = 15, 
            longitude = 15;

        for (var i = 0; i < latitude + 1; i += 1) {
            var theta = (i * Math.PI) / latitude;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var j = 0; j < longitude + 1; j += 1) {
                var phi = (j * 2 * Math.PI) / longitude;
                var x = radius * Math.cos(phi) * sinTheta;
                var y = radius * cosTheta;
                var z = radius * Math.sin(phi) * sinTheta;

                vertices.push([x, y, z]);
            }
        }

        for (var i = 0; i < latitude; i += 1) {

            for (var j = 0; j < longitude; j += 1) {
                var top = (i * (longitude + 1)) + j;
                var bottom = top + longitude + 1;

                indices.push([top, bottom, top + 1]);
                indices.push([bottom, bottom + 1, top + 1]);
            }
        }


        return {
            vertices: vertices,
            indices: indices
        };
    };

    Shape.prototype.addChild = function (childShape) {
        this.children.push(childShape);
    };

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    Shape.prototype.toRawTriangleArray = function () {
        var result = [];

        for (var i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    this.vertices[
                        this.indices[i][j]
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
    Shape.prototype.toRawLineArray = function () {
        var result = [];

        for (var i = 0, maxi = this.indices.length; i < maxi; i += 1) {
            for (var j = 0, maxj = this.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    this.vertices[
                        this.indices[i][j]
                    ],

                    this.vertices[
                        this.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }
        return result;
    };
}());
