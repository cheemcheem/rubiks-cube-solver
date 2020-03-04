## Rubiks Cube Solver ![Java CI](https://github.com/cheemcheem/rubiks-cube-solver/workflows/Java%20CI/badge.svg?branch=master)
*currently more like a visualiser than a solver*

#### What this aims to be
A web app that stores a rubiks cube and lets you manipulate the rubiks cube in the browser, or optionally click a button to solve it

#### What this currently is
A web app and rest endpoint. The rest endpoint stores a rubiks cube on your session and lets you make a single type of move on the rubiks cube via a rest call. The web app will also display the corners of the rubiks cube in the browser where the move will be executed upon refresh. 

#### How this works
1. User browses to home page
1. Page requests a rubiks cube is generated for this browser session, or retrieves the rubiks cube from the previous session
1. Page requests the generated rubiks cube and displays it to the user

#### Usage
1. `$ git clone https://github.com/cheemcheem/rubiks-cube-solver.git`
1. `$ cd rubiks-cube-solver`
1. `$ mvn spring-boot:run -Dspring-boot.run.profiles=dev`
1. `$ visit http://localhost:8080 and refresh the page to your heart's content`