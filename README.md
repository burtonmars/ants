# Ant Colony Self Organization

Using:
 - JavaScript
 - HTML/CSS

# Purpose

A simple web application that shows a visualization of different algorithms used to allow an ant cololy to self-organize. The point of
the excercise is to efficiently balance a colony without using an overarching knowledge of how many worker ants, builder ants, and soldier
ants there currently are. Instead, the natural tendency of ants to self organize using pheromone release and detection is mimicked by
creating pheromone buffers around each ant having them decide whether to change jobs based on their own unique knowledge of the world 
around them.

# How to Use the App

Enter the number of each type of ant that will start in the colony. The pheromone strength determines how big the pherimone cloud will be
around each ant. The political bias will affect how easily swayed the ants are to change jobs (left is more likely, right is less likely).

The algorithms are listed above the simulate button:
  - Randomize Decisions: At regular intervals each ant randomly decides to switch jobs or stay the same, based on no information collected
  - Add Memory: The ants keep track of how many of each other ant they pass and make a decision at regular intervals if they have "seen" 
  less of one type of ant relative to the others
  - Add Threshold: A similar algorithm to Add Memory, but the ants only change if there is a significantly number of one type of ant that t
  they have "seen"
  - Add Bias: This algorithm will allow political bias to be taken into account relative to the politival bias selected previously
  
  Click Simulate to start the animation.
  
  # How To Measure Success
  
 The goal of the simulation is to reach a balanced colony consisting of about 1/3 ants of each job (color). The ants will wander about, recognizing
 each other based on the pheromones clouds they pass through, and making decisions about whether they should change jobs or not. When a balance
 is reached, the equlibrium timer will stop. 
 
 To measure volitility in addition to stability, a second timer was added to measure time between equlibriums, as well as an enemy intruder.
 Click the colony to add an enemy (nearby ants will turn to soldiers and attack the intruder. Some die as indication by the death counter)
