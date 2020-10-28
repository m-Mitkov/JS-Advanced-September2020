(function () {
    let result;

    String.prototype.ensureStart = function(str) {
        if (!this.startsWith(str)) {
            result = str + this;
        }
        return result;
    };

    String.prototype.EnsureEnd = function(str){
        if (!this.endsWith(str)) {
            result = this + str;
        }
        return result;
    };

    String.prototype.isEmpty = () => this.length != 0;

})();

let myString = 'asas';
// myString = myString.isEmpty();
console.log(myString.isEmpty());