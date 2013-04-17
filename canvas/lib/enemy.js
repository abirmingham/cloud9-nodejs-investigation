define(['underscore', 'lib/sprite'], function(_, Sprite) {    
    var intWithRandSign = function(int) {
        return (Math.random()*2 <= 1 ? -1 : 1) * int;
    };
    
    var SCARE_FACTOR = 200;
    var UPDATE       = {};
    var DRAW         = {};
    
    UPDATE.ALIVE = function(player) {
        if (this.isColliding(player)) {
            this.state = 'DYING';
        }
        else {
            var collisionBoxX, collisionBoxY, collisionWidth, collisionHeight;
            
            if (this.velocity[0] > 0) {
                collisionBoxX   = this.x;
                collisionWidth  = this.width + this.velocity[0]*SCARE_FACTOR;
            }
            else {
                collisionBoxX   = this.x + this.velocity[0]*SCARE_FACTOR;
                collisionWidth  = Math.abs(this.x - collisionBoxX);
            }
            if (this.velocity[1] > 0) {
                collisionBoxY   = this.y;
                collisionHeight = this.height + this.velocity[1]*SCARE_FACTOR;
            }
            else {
                collisionBoxY   = this.y + this.velocity[1]*SCARE_FACTOR;
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
        }
    };
    DRAW.ALIVE = Sprite.prototype.drawAsRectangle;
    
    var DYING_LENGTH = 50;
    UPDATE.DYING = function(player) {
        // width = width + velocity + beginning random multiplier
        this.width = this.width + Math.pow(2 + Math.random(), 2 - (this.dyingCounter/(DYING_LENGTH)));
        this.dyingCounter++;
        if (this.dyingCounter > DYING_LENGTH) this.markedForGarbageCollection = true;
    };
    DRAW.DYING = function(canvas) {
        canvas.save();
        
        if (! this.dyingColors) {
            this.dyingColors = _.inject(
                'r g b'.split(' '),
                function(memo, i) { memo[i] = Math.round(Math.random()*120); return memo; },
                {}
            );
        }

        var radius = this.width;
        var opacity = 1 - this.dyingCounter/DYING_LENGTH;
        var dyingGradient = canvas.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius);
        var gradStr = "rgba("+this.dyingColors.r+", "+this.dyingColors.g+", "+this.dyingColors.b+", ";
        
        dyingGradient.addColorStop(0,   gradStr + opacity + ")");
        dyingGradient.addColorStop(0.25, gradStr + opacity + ")");
        dyingGradient.addColorStop(1,   gradStr + "0)");
        
        canvas.globalCompositeOperation = "lighter";
        canvas.beginPath();
        canvas.fillStyle = dyingGradient;
        canvas.arc(this.x, this.y, radius, Math.PI*2, false);
        canvas.fill();
        canvas.restore();
    };
    
    var Enemy = function(x, y) {
        var size          = 1 + Math.random()*2 | 0;
        var speed         = 1 + Math.random()*2 | 0;
        this.color        = "#000";
        this.x            = x;
        this.y            = y;
        this.width        = size;
        this.height       = size;
        this.velocity     = [speed * intWithRandSign(1), speed * intWithRandSign(1)];
        this.state        = 'ALIVE';
        this.dyingCounter = 0;
        this.markedForGarbageCollection = false;
    };

    Enemy.prototype = new Sprite();
    Enemy.prototype.update = function(player) {
        UPDATE[this.state].call(this, player);
        this.clamp();
    };
    Enemy.prototype.draw = function(canvas) {
        DRAW[this.state].call(this, canvas);
    };
    return Enemy;
});