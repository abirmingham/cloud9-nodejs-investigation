/** Configuration **/
var CANVAS_WIDTH  = 1024;
var CANVAS_HEIGHT = 768;
var FPS           = 60;
var MAX_ENEMIES   = 500;

/** Main **/
require(['jquery', 'underscore', 'lib/player', 'lib/enemy'], function($, _, Player, Enemy) {
    var canvasEl = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>").css('border', '1px solid black').appendTo('body');
    var canvas = canvasEl.get(0).getContext('2d');
    
    var player  = new Player(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    var enemies = [];

    var update = function() {
        if (enemies.length < MAX_ENEMIES) {
            enemies.push(new Enemy(Math.random() * (CANVAS_WIDTH-50)), Math.random() * (CANVAS_HEIGHT-50));
        }
    
        player.update();

        for (var i = enemies.length - 1; i > 0; i--) {
            enemies[i].update(player);
            
            if (enemies[i].isColliding(player)) {
                enemies.splice(i, 1);
            }
        }
    }
    
    var draw = function() {
        canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        player.draw(canvas);

        _.each(enemies, function(e) {
            e.draw(canvas);
        });
    }
    
    setInterval(function() {
        update();
        draw();
    }, 1000/FPS);
});