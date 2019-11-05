const windowHeight = 400;
const windowWidth = 700;
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
	let myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('antFarm');
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

	//document.getElementById("simulate").addEventListener("click", simulate);
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