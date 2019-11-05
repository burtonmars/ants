const minAntSpeed = 260;
const maxAntSpeed = 290;
const ferimoneBuffer = 20;

class Ant {

    constructor(color) {
        this.x = windowWidth / 2;
        this.y = windowHeight / 2;
        this.xspeed = Math.random(minAntSpeed, maxAntSpeed) * (Math.round(Math.random()) * 2 -1);
        this.yspeed = Math.random(minAntSpeed, maxAntSpeed) * (Math.round(Math.random()) * 2 -1);
        this.color = color;
        this.size = 12;
    }

    update() {
        if (this.x >= (width - this.size / 2) || this.x <= 0) {
            this.xspeed = -this.xspeed;
        }
        if (this.y >= (height - this.size / 2) || this.y <= 0) {
            this.yspeed = -this.yspeed;
        }
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    show() {
        switch(this.color) {
            case "green":
                fill(color(0, 255, 0));
                break;
            case "blue":
                fill(color(0, 0, 255));
                break;
            case "red":
                fill(color(255, 0, 0));
                break;
        }
        ellipse(this.x, this.y, this.size, this.size-this.size / 1.8);
    }

    changeJob() {

    }
}