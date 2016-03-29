(function(){
    window.Matrix = window.Matrix || {};

    Matrix = function(){
        this.elements = arguments.length ?
            [].slice.call(arguments) :
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1];
    };

    Matrix.prototype.dimension = function (){
        return this.elements.length
    };

    var multiplicationAllowed = function(a,b){
        return a.dimension() === b.dimension();
    };

    Matrix.multiply = function(matrix){
        var a = this;
        var b = matrix;

        if (!multiplicationAllowed(a,b)){
            throw "Multiplication operation not allowed. Different dimensions";
        } else {
            /*
                0   1   2   3     
                4   5   6   7
                8   9   10  11
                12  13  14  15
            */

            return new Matrix(
                    a[0]*b[0] + a[1]*b[4] + a[2]*b[8] + a[3]*b[12],
                    a[0]*b[1] + a[1]*b[5] + a[2]*b[9] + a[3]*b[13],
                    a[0]*b[2] + a[1]*b[6] + a[2]*b[10]+ a[3]*b[14],
                    a[0]*b[3] + a[1]*b[7] + a[2]*b[11]+ a[3]*b[15],

                    a[4]*b[0] + a[5]*b[4] + a[6]*b[8] + a[7]*b[12],
                    a[4]*b[1] + a[5]*b[5] + a[6]*b[9] + a[7]*b[13],
                    a[4]*b[2] + a[5]*b[6] + a[6]*b[10]+ a[7]*b[14],
                    a[4]*b[3] + a[5]*b[7] + a[6]*b[11]+ a[7]*b[15],

                    a[8]*b[0] + a[9]*b[4] + a[9]*b[8] + a[10]*b[12],
                    a[8]*b[1] + a[9]*b[5] + a[9]*b[9] + a[10]*b[13],
                    a[8]*b[2] + a[9]*b[6] + a[9]*b[10]+ a[10]*b[14],
                    a[8]*b[3] + a[9]*b[7] + a[9]*b[11]+ a[10]*b[15],

                    a[12]*b[0] + a[13]*b[4] + a[14]*b[8] + a[15]*b[12],
                    a[12]*b[1] + a[13]*b[5] + a[14]*b[9] + a[15]*b[13],
                    a[12]*b[2] + a[13]*b[6] + a[14]*b[10]+ a[15]*b[14],
                    a[12]*b[3] + a[13]*b[7] + a[14]*b[11]+ a[15]*b[15]
                );
        }

    }

    Matrix.getTranslationMatrix = function(tx,ty,tz){
        return new Matrix(
                1,0,0,tx,
                0,1,0,ty,
                0,0,1,tz,
                0,0,0,1
            );
    };

    Matrix.getScaleMatrix = function(sx,sy,sz){
        return new Matrix(
                sx,0,0,0
                0,sy,0,0
                0,0,0,sz
            );
    };


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