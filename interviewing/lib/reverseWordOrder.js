String.prototype.reverseWordOrderBigMem = function() {
    return this.split(' ').reverse().join(' ');
};

console.log("Mochas are delicious, don't you agree?".reverseWordOrderBigMem());

// reverseWordOrderLittleMem() canned because strings are immutable, and new memory must be allocated