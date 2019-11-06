const windowHeight = 400;
const windowWidth = 700;
const speed = 4;

let totalAnts;
let greAnt, redAnt, bluAnt;

let redAnts = [];
let bluAnts = [];
let greAnts = [];
let allAnts = [];

totalAnts = 180;
let numGreAnts = totalAnts/3;
let numRedAnts = totalAnts/3;
let numBluAnts = totalAnts/3;

let buffer;

function setup() {
	let myCanvas = createCanvas(windowWidth, windowHeight);
	myCanvas.parent('antFarm');
	let input1 = createInput();
	let input2 = createInput();
	let input3 = createInput();
	input1.parent("input1");
	input2.parent("input2");
	input3.parent("input3");
	// interval = setInterval(updateNumberAnts, 5000);
	for (let i = 0; i < numGreAnts; i++) {
		greAnt = new Ant("green", buffer);
		greAnts.push(greAnt);
	}
	for (let i = 0; i < numRedAnts; i++) {
		redAnt = new Ant("red", buffer);
		redAnts.push(redAnt);
	}
	for (let i = 0; i < numBluAnts; i++) {
		bluAnt = new Ant("blue", buffer);
		bluAnts.push(bluAnt);
	}
	allAnts = (greAnts.concat(redAnts)).concat(bluAnts);

	let simulate = createButton("simulate");
	simulate.parent('simul');
	simulate.mousePressed(draw);

}

function draw() {
	background(51);
	for (const ant of allAnts) {
		let otherAnts = allAnts.slice();
		otherAnts.splice(allAnts[allAnts.indexOf(ant)], 1);
		ant.update();
		ant.show();
		ant.countNearbyAnts(otherAnts);
	}
}