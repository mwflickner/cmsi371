var Matrix = class Matrix {
    constructor(){
        this.matrix = [
                       [1,0,0,0],
                       [0,1,0,0],
                       [0,0,1,0],
                       [0,0,0,1]
                      ];
    }

    multiply(Matrix m){

    }

    scale(){
        x*sx, y*sy, z*sz

        (sx*x) + (0*y) + 0 --> sx  0  0
        (0*x) + (sy*y) + 0 --> 0  sy  0
    }

    translate(reloc){
        x + tx, y+ty, z + tz

        1*x + 0*x + tx --> 1  0  tx
        0*x + 1*y + ty --> 0  1  ty

       -2  0  0    1  0  5   x
        0 -2  0    0  1  2   y
        0  0  1    0  0  0   1
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