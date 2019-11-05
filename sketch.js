const windowHeight = 600;
const windowWidth = 600;
const speed = 4;
const totalAnts = 120;

let greAnt;
let redAnt;
let bluAnt;

let redAnts = [];
let bluAnts = [];
let greAnts = [];
let allAnts = [];

let numGreAnts = totalAnts/3;
let numRedAnts = totalAnts/3;
let numBluAnts = totalAnts/3;

function setup() {
	createCanvas(windowWidth, windowHeight);
	for (let i = 0; i < numGreAnts; i++) {
		greAnt = new Ant("green");
		greAnts.push(greAnt);
	}
	for (let i = 0; i < numRedAnts; i++) {
		redAnt = new Ant("red");
		redAnts.push(redAnt);
	}
	for (let i = 0; i < numBluAnts; i++) {
		bluAnt = new Ant("blue");
		bluAnts.push(bluAnt);
	}
	allAnts = (greAnts.concat(redAnts)).concat(bluAnts);

	//document.getElementById("simulate").addEventListener("click", simulate);
}

function draw() {
	background(51);
	for (const ant of allAnts) {
		ant.update();
		ant.show();
	}
}