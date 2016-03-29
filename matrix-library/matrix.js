var Matrix = class Matrix {
    constructor(x,y,z,tx,ty,tz){
        this.matrix = [
                       [x, 0, 0, tx || 0],
                       [0, y, 0, ty || 0],
                       [0, 0, z, tz || 0],
                       [0, 0, 0, 1]
                      ];
    }

    multiply(Matrix m){

    }

    get scale(sx, sy, sz){
        return new Matrix(sx,sy,sz);
        /*
        x*sx, y*sy, z*sz

        (sx*x) + (0*y) + 0 --> sx  0  0
        (0*x) + (sy*y) + 0 --> 0  sy  0
        */
    }

    get translate(tx, ty, tz){
        return new Matrix(1,1,1,tx,ty,tz);
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

    rotate(theta){


        x * cos theta - y* sin theta,
        x * sin theta - y* cos theta

        ((cos theta) * x) + ((-sin theta) * y) + 0
        ((sin theta) * x) + ((cos theta) * y) + 0

        cos theta   -sin theta   0
        sin theta   cos theta    0

    }

    equals(){
        
    }
}