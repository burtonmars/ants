class Enemy {

    constructor() {
        this.x = floor(random(30, windowWidth - 60));
        this.y = floor(random(30, windowHeight - 60));
        this.img = loadImage("beetle_med.png");
        this.rot = PI / 180 * random(-90, 90);
    }

    show() {
        image(this.img, this.x, this.y)
    }

    update() {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    }

}