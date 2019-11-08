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
        this.x += this.xspeed + random(-1, 1);
        this.y += this.yspeed + random(-1, 1);
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

    // checks counts of ants seen by each ant and decides whether the ant should change jobs
    // or remain the same color
    checkChangeJob(ants) {
        for (const a of ants) {
            a.color = weighDataCollected(a);
        }
    }

    weightDataCollected(a) {
        if (this.blueAntCount < this.redAntCount) {
            if (this.blueAntCount < this.greenAntCount) {
                return "blue";
            } else {
                return "green";
            }
        }
        if (this.redAntCount < this.greenAntCount) {
            return "red";
        } else {
            return "green";
        }
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