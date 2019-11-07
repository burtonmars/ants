class Ant {

    constructor(color, buff) {
        this.x =  floor(random(windowWidth));
        this.y = floor(random(windowHeight));
        this.xspeed = Math.random(0, 1) * (Math.round(Math.random()) * 2 -1);
        this.yspeed = Math.random(0, 1) * (Math.round(Math.random()) * 2 -1);
        this.color = color;
        this.size = 12;
        this.ferimoneBuffer = buff; // measured by the radius in pixels
        this.redAntCount = 0;
        this.blueAntCount = 0;
        this.greenAntCount = 0;
    }

    update() {
        if (this.x >= (width - this.size / 2) || this.x <= this.size / 2) {
            this.xspeed = -this.xspeed;
        }
        if (this.y >= (height - this.size / 2) || this.y <= this.size / 2) {
            this.yspeed = -this.yspeed;
        }
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    show() {
        switch(this.color) {
            case "g":
                fill(color(0, 255, 0));
                break;
            case "b":
                fill(color(0, 0, 255));
                break;
            case "r":
                fill(color(255, 0, 0));
                break;
        }
        ellipse(this.x, this.y, this.size, this.size-this.size / 1.8);
    }

    // checks current counts of all colors of ants seen and decides whether 
    // to change color and returns a color (same color if it decides not
    // to change)
    checkChangeJob() {
        // TODO: compare current this.antcount's, if current color has highest seen,
        // change to lowest, otherwise stay the same 
        return "green"; //STUB
    }

    // checks list of other ants to see if it overlaps any of their buffers
    // - if it does, check color and add some ammount to this.*antcount for that
    //   color (amt added should be proportional to both ants speed and the size
    //   of the buffer so that the length of the encounter * amt added equals one)
    countNearbyAnts(ants) {
        for (const a of ants) {
            // TODO: check if in buffer of ant a, check ant a's color and speed,
            // add appropriate amt to this.*antcount 
        }
    }
}