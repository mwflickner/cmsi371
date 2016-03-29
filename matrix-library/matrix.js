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

    get rotationMatrix(angle, x, y, z){
        // In production code, this function should be associated
        // with a matrix object with associated functions.
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z));
        var s = Math.sin(angle * Math.PI / 180.0);
        var c = Math.cos(angle * Math.PI / 180.0);
        var oneMinusC = 1.0 - c;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        // Now we can calculate the other terms.
        // "2" for "squared."
        var x2 = x * x;
        var y2 = y * y;
        var z2 = z * z;
        var xy = x * y;
        var yz = y * z;
        var xz = x * z;
        var xs = x * s;
        var ys = y * s;
        var zs = z * s;

        // GL expects its matrices in column major order.
        return Matrix(
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
        );
    }

    equals(){
        
    }
}