for (var i = 1; i <= 100; i++) {
    var out = '';
    if (i % 3 == 0) out = out + "Fizz";
    if (i % 5 == 0) out = out + "Buzz";
    if (out === '') out = '' + i;
    
    console.log(out);
}