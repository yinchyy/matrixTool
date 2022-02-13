class matrix{
    constructor(x,y) {
        this.matrix = new Array(x);
        for (let i = 0; i < x; ++i){
            this.matrix[i] = new Int8Array(y);
            for (let j = 0; j < y; ++j){
                this.matrix[i][j] = 0; //i*x+j+i+1;
            }
        }
    }
    setValue(x, y, value) {
        let arr = Array.from(this.matrix[x]);
        arr[y] = value;
        this.matrix[x] = this.getTypedArrayWithOptimizedSize(...arr);
    }
    getValue(x, y) {
        return this.matrix[x][y];
    }
    transpose() {
        let arr = new Array();
        for (let i = 0; i < this.matrix[0].length; ++i){
            arr[i] = new Array();
            for (let j = 0; j < this.matrix.length; ++j){
                arr[i][j]=this.matrix[j][i];
            }
        }
        this.matrix.length = 0;
        for (let index in arr) {
            this.matrix[index] = this.getTypedArrayWithOptimizedSize(...arr[index]);
        }
    }
    displayMatrix() {
        console.table(this.matrix);
    }
    getTypedArrayWithOptimizedSize(...values) {
        try {
            let max = Math.max.apply(Math, values);
            let min = Math.min.apply(Math, values);
            if (min < -2147483648 || max > 2147483647){
                throw new Error("Number too big.");
            }else if (min < -32768 || max > 32767) {
                return Int32Array.from(values);
            } else if (min < -128 || max>127) {
                return Int16Array.from(values);
            } else {
                return Int8Array.from(values);
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
}