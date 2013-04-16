define([], function() {
    var Particle = function(x, y, radiusFactor) {
        this.speed = {
            x: -2.5 + Math.random()*5,
            y: -2.5 + Math.random()*5
        };
        this.x      = x;
        this.y      = y;
        this.radius = 10 + Math.random()*20*(radiusFactor||1);
        this.life   = 20 + Math.random()*10;
        this.remaining_life = this.life;
        this.r = Math.round(Math.random()*255);
        this.g = Math.round(Math.random()*255);
        this.b = Math.round(Math.random()*255);
    }
    Particle.prototype.draw = function(canvas) {
        canvas.beginPath();
        this.opacity = Math.round(this.remaining_life/this.life*100)/100;
        var gradient = canvas.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        var gradStr = "rgba("+this.r+", "+this.g+", "+this.b+", ";
        gradient.addColorStop(0,   gradStr + this.opacity + ")");
        gradient.addColorStop(0.5, gradStr + this.opacity + ")");
        gradient.addColorStop(1,   gradStr + "0)");
        canvas.fillStyle = gradient;
        canvas.arc(this.x, this.y, this.radius, Math.PI*2, false);
        canvas.fill();
        this.remaining_life--;
        this.radius--;
        this.x += this.speed.x;
        this.y += this.speed.y;
    };
    Particle.prototype.isDead = function() {
        return this.remaining_life <= 0 || this.radius <= 0;
    };
    return Particle;
});