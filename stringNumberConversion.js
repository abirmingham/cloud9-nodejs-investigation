var ZERO_CHAR_CODE = '0'.charCodeAt(0);

function numberToString(number) {
    if (number === 0) return '0';

    var isNeg = number < 0;
    number = isNeg ? number * -1 : number;
    
    var buffer    = '';
    var remaining = number;
    
    while (remaining > 0) {
        var place = buffer.length + 1;
        var digit = remaining % 10;
        
        buffer    = String.fromCharCode(ZERO_CHAR_CODE + digit) + buffer;
        remaining = (remaining / 10) | 0;
    }
    
    return isNeg ? '-' + buffer : buffer;
}

function stringToNumber(string) {
    var isNeg = string.charAt(0) === '-' ? true : false;
    string = isNeg ? string.substring(1) : string;
    
    var num = 0;
    var place = 1;
    
    for (var i = string.length - 1; i >= 0; i--) {
        var charCode = string.charCodeAt(i);
        var digit    = charCode - ZERO_CHAR_CODE;
        
        num += digit * Math.pow(10, place++ - 1);
    }
    
    return isNeg ? num * -1 : num;
}

for (var i = -1001; i <= 1001; i++) {
    if (stringToNumber(numberToString(i)) !== stringToNumber(i+'')) throw "Assert A failed for: " + i;
    if (numberToString(stringToNumber(i+'')) !== numberToString(i)) throw "Assert B failed for: " + i;
    if (numberToString(i) !== i+'') throw "Assert C failed for: " + i;
    if (stringToNumber(i+'') !== i) throw "Assert D failed for: " + i;
}
console.log("Pass");