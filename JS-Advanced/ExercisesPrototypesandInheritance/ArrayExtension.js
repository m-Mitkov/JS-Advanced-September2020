(function () {
    Array.prototype.last = function(){
        if (this.length > 1) {
            return this[this.length - 1];
        } else {
            throw new Error('Array is empty');
        }
    };

    Array.prototype.skip = function(n) {
        let newArr = [];

        for (let index = n; index <= this.length; index++) {
            newArr.push(this[index]);
        }
        return newArr;
    }

    Array.prototype.take = function(n){
        let newaArr = [];

        if (n < this.length) {
            for (let index = 0; index < n; index++) {
                newaArr.push(this[index]);
            }
            return newaArr;
        }
        return newaArr = [...this];
    }

    Array.prototype.sum = function(){
        let sum = 0;
        this.forEach(x => sum += x);
        return sum;
    }

    Array.prototype.average = function(){
        return this.sum() / this.length;
    }
}());

