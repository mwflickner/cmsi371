/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shape = class Shape {

    constructor(polygonMesh){
        this.polygonMesh = polygonMesh;
        this.children = [];
    }
    
    get polygonMesh(){
        return this.polygonMesh;
    }

    get children(){
        return this.children;
    }

    addChild(childShape){
        this.children.push(childShape);
    }

    translate(x, y, z){
        console.log("translate not yet supported");
    }

    rotate(){
        console.log("rotate not yet supported");
    }

};

var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
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
    },

    cube: function(x,y,z,l){
        var x = 0, y = 0, z = 0, l = 0.75;
        return {
            vertices: [
                [x, y, z],
                [x + l, y, z],
                [x, y + l , z],
                [x, y, z + l],
                [x + l, y + l, z],
                [x + l, y, z + l],
                [x, y + l, z + l],
                [x + l, y + l, z + l]
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
    },

    sphere: function(centerX, centerY, centerZ, radius){
        return {
            vertices: [
                
            ],

            indices: [

            ]
        };
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
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
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
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
    }

};
