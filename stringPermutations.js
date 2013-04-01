function printPermutations(prefix, remaining) {
    if (remaining === '') {
        console.log(prefix);
        return;
    }
    
    for (var i = 0; i < remaining.length; i++) {
        printPermutations(prefix + remaining.charAt(i), remaining.substring(0, i) + remaining.substring(i + 1));
    }
}

printPermutations('', process.argv[2]);