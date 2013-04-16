define([], function() {
    var clamp = function(i, min, max) {
        return Math.min(Math.max(i, min), max);
    };
    
    return {
        clamp: function() {
            if (this.x < 0 || this.x > CANVAS_WIDTH-this.width) {
                this.velocity[0] = this.velocity[0]*-1;
                this.x = clamp(this.x, 0, CANVAS_WIDTH-this.width);
            }
            else if (this.y < 0 || this.y > CANVAS_HEIGHT-this.height) {
                this.velocity[1] = this.velocity[1]*-1;
                this.y = clamp(this.y, 0, CANVAS_HEIGHT-this.height);
            }
        },
        draw: function(canvas) {
            canvas.fillStyle = this.color;
            canvas.fillRect(this.x, this.y, this.width, this.height);
        },
        isColliding: function(other) {
            return ! (
                   (this.x  + this.width   < other.x)
                || (this.y  + this.height  < other.y)
                || (other.x + other.width  < this.x)
                || (other.y + other.height < this.y)
            );
        },
    };
});