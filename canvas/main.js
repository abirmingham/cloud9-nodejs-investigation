/** Configuration **/
var CANVAS_WIDTH  = 1024;
var CANVAS_HEIGHT = 768;
var FPS           = 60;
var MAX_ENEMIES   = 10000;

requirejs.config({
    paths: {
        jquery:     'http://code.jquery.com/jquery-1.9.1',
        underscore: 'http://underscorejs.org/underscore',
        keyboardjs: 'http://raw.github.com/RobertWHurst/KeyboardJS/master/keyboard',
    },
    shim: {
        underscore: {
            exports: '_',
        },
    },
});

/** Main **/
require(['jquery', 'underscore', 'lib/player', 'lib/enemy'], function($, _, Player, Enemy) {
    var canvasEl = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>").css('border', '1px solid black').appendTo('body');
    var canvas   = canvasEl.get(0).getContext('2d');
    
    var tally    = 0;
    var tallyEl  = $('<div>')
        .css('font-size', '20px')
        .css('font-style', 'italic')
        .css('position', 'absolute')
        .css('left', CANVAS_WIDTH + 20 + 'px')
        .css('top', '20px')
        .text('0 kills')
        .appendTo('body');
    
    var player  = new Player(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    var enemies = [];

    var update = function() {
        if (enemies.length < MAX_ENEMIES) {
            enemies.push(new Enemy(Math.random() * (CANVAS_WIDTH-50), Math.random() * (CANVAS_HEIGHT-50)));
        }
    
        player.update();

        for (var i = enemies.length - 1; i > 0; i--) {
            enemies[i].update(player);

            if (enemies[i].markedForGarbageCollection) {
                enemies.splice(i, 1);
                tallyEl.text(++tally + ' kills');
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