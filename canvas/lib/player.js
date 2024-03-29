define(['underscore', 'keyboardjs', 'lib/sprite', 'lib/particle'], function(_, KeyboardJS, Sprite, Particle) {
    var keys = {};
    
    _.each('a w s d space up down left right'.split(' '), function(letter) {
        KeyboardJS.on(letter, function() { keys[letter] = true; }, function() { keys[letter] = false });
    });
    
    var Player = function(x, y) {
        this.color = "#FFF";
        this.velocity = [0, 0];
        this.width = 33;
        this.height = 33;
        this.x = x;
        this.y = y;
        this.particles = [];
        for (var i = 0; i < 100; i++) {
            this.particles.push(new Particle(x + this.width/2, y + this.width/2));
        }
    };

    Player.prototype = new Sprite();
    Player.prototype.update = function() {
        if (keys['a'] || keys['left']) {
            this.x -= 3;
            this.velocity[0] -= 0.15;
        }
        if (keys['d'] || keys['right']) {
            this.x += 3;
            this.velocity[0] += 0.15;
        }
        if (keys['w'] || keys['up']) {
            this.y -= 3;
            this.velocity[1] -= 0.15;
        }
        if (keys['s'] || keys['down']) {
            this.y += 3;
            this.velocity[1] += 0.15;
        }
        if (keys['space']) {
            for (var i = 0; i < 2; i++) {
                if (this.velocity[i] != 0) this.velocity[i] = this.velocity[i] * 0.8;
            }
        }
        this.x += this.velocity[0];
        this.y += this.velocity[1];
        this.clamp();
    };
    Player.prototype.draw = function(canvas) {
        this.drawAsRectangle(canvas);
        
        // Draw particles
        canvas.save();
        canvas.globalCompositeOperation = "lighter";
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].draw(canvas);
            if (this.particles[i].isDead()) {
                this.particles[i] = new Particle(this.x + this.width/2, this.y + this.height/2);
            }
        }
        canvas.restore();
    };

    return Player;
});