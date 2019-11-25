class Enemy {

    constructor(ants) {
        this.x = floor(random(30, windowWidth - 60));
        this.y = floor(random(30, windowHeight - 60));
        this.img = loadImage("images/bee.png");
        this.ants = ants;
        this.buffer = 70;
        this.antsSeen = [];
        this.attackers = [];
        this.alerted = [];
        this.count = 0;
    }

    show() {
        image(this.img, this.x, this.y);
    }

    showBuffer() {
        fill(color(0, 205, 100, 8));
        //ellipse(this.x + this.img.width / 2, this.y + this.img.height / 2, this.buffer, this.buffer);
    }

    update() {
        this.x += random(-1.5, 1.5);
        this.y += random(-1.5, 1.5);
        for (const ant of this.ants) {
            if (((ant.x >= this.x + this.img.width / 2 - (this.buffer / 2)) &&
                    (ant.x <= this.x + this.img.width / 2 + (this.buffer / 2))) &&
                ((ant.y >= this.y + this.img.height / 2 - (this.buffer / 2)) &&
                    (ant.y <= this.y + this.img.height / 2 + (this.buffer / 2)))) {
                if (!this.antsSeen.includes(ant)) {
                    this.antsSeen.push(ant);
                }
            }
        }
        for (const ant of this.antsSeen) {
            if (!this.alerted.includes(ant)) {
                this.alerted.push(ant);
                if (ant.alert(this)) {
                    this.attackers.push(ant)
                }
            }
        }
        if (this.attackers.length > this.ants.length * .12) {
            enemies.splice(enemies.indexOf(this), 1);
        };
    }

}