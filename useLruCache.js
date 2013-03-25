var cache = new LruCache(5);

for (var i = 0; i <= 12; i++) {
    console.log("...cache.get(" + i + ")", cache.get(i));
}

console.log("\n...cache.get(12)", cache.get(12));