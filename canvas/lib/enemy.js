define(['lib/sprite'], function(Sprite) {
    var intWithRandSign = function(int) {
        return (Math.random()*2 <= 1 ? -1 : 1) * int;
    };
    var scareFactor = 200;
    
    var Enemy = function(x, y) {
        var size  = 1 + Math.random()*2 | 0;
        var speed = 1 + Math.random()*2 | 0;
        this.color = "#000";
        this.width  = size;
        this.height = size;
        this.x = x;
        this.y = y;
        this.velocity = [speed * intWithRandSign(1), speed * intWithRandSign(1)];
    };

    Enemy.prototype = new Sprite();
    Enemy.prototype.update = function(player) {
        var collisionBoxX, collisionBoxY, collisionWidth, collisionHeight;
        
        if (this.velocity[0] > 0) {
            collisionBoxX   = this.x;
            collisionWidth  = this.width + this.velocity[0]*scareFactor;
        }
        else {
            collisionBoxX   = this.x + this.velocity[0]*scareFactor;
            collisionWidth  = Math.abs(this.x - collisionBoxX);
        }
        if (this.velocity[1] > 0) {
            collisionBoxY   = this.y;
            collisionHeight = this.height + this.velocity[1]*scareFactor;
        }
        else {
            collisionBoxY   = this.y + this.velocity[1]*scareFactor;
            collisionHeight = Math.abs(this.y - collisionBoxY);
        }
        
        var shouldRun = Sprite.prototype.isColliding.call({
                x:      collisionBoxX,
                y:      collisionBoxY,
                width:  collisionWidth,
                height: collisionHeight
        }, player);

        if (shouldRun) {
            this.velocity[0] = this.velocity[0] * -1;
            this.velocity[1] = this.velocity[1] * -1;
        }
        else {
            var r = Math.random()*500;
            if (r < 1) {
                for (var i = 0; i < 2; i++) {
                    this.velocity[i] = this.velocity[i] * intWithRandSign(1);
                }
            }
            else if (r < 5) {
                for (var i = 0; i < 2; i++) {
                    this.velocity[i] = this.velocity[i] + Math.random()*intWithRandSign(1);
                }
            }
        }
        for (var i = 0; i < 2; i++) {
            this.velocity[i] = Math.min(Math.max(this.velocity[i], -20), 20);
        }

        this.x += this.velocity[0];
        this.y += this.velocity[1];
        this.clamp();
    };
    return Enemy;
});