(function(){
    window.Matrix = window.Matrix || {};

}());
var Matrix = class Matrix {
    constructor(){
        this.elements = arguments.length ?
            [].slice.call(arguments) :
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1];
    }

    multiply(Matrix m){

    }

    get scaleMatrix(sx, sy, sz){
        return new Matrix(
                sx, 0, 0, 0,
                0, sy, 0, 0,
                0, 0, sz, 0,
                0, 0, 0, 1
            );
    }

    get translationMatrix(tx, ty, tz){
        return new Matrix(
                1, 0, 0, tx,
                0, 1, 0, ty,
                0, 0, 1, tz,
                0, 0, 0, 1
            );

        /*
        x + tx, y+ty, z + tz

        1*x + 0*x + tx --> 1  0  tx
        0*x + 1*y + ty --> 0  1  ty

       -2  0  0    1  0  5   x
        0 -2  0    0  1  2   y
        0  0  1    0  0  0   1

            \       /
             \     /
            -2  0 -10  |  x     -2x - 10
             0 -2  -4  |  y  =  -2y - 4
             0  0   1  |  1         1

        */
    } 

    get transpose(){

    }

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

    equals(matrix){
        
    }
}