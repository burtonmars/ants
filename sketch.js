const windowHeight = 400;
const windowWidth = 700;
const speed = 4;
const totalAnts = 120;

let greAnt, redAnt, bluAnt;

let redAnts = [];
let bluAnts = [];
let greAnts = [];
let allAnts = [];

let numGreAnts = totalAnts/3;
let numRedAnts = totalAnts/3;
let numBluAnts = totalAnts/3;

function setup() {
	let myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('antFarm');
	let input1 = createInput();
	let input2 = createInput();
	let input3 = createInput();
	input1.parent();
	input2.parent();
	input3.parent();
	interval = setInterval(updateNumberAnts, 5000);
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

	let simulate = createButton("simulate");
	simulate.parent('simul');
	simulate.mousePressed(draw);

	textAlign(CENTER);
}

function updateNumberAnts() {
	blueAntsCounter.html("Blue Ants: ");
	greenAntsCounter.html("Green Ants: ");
	redAntsCounter.html("Red Ants: ");
}

function draw() {
	background(51);
	for (const ant of allAnts) {
		ant.update();
		ant.show();
	}
}