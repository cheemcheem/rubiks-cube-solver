## Rubiks Cube Solver ![latest version](https://github.com/cheemcheem/rubiks-cube-solver/workflows/CD/badge.svg) ![latest release](https://github.com/cheemcheem/rubiks-cube-solver/workflows/Release/badge.svg)
*currently more like a visualiser than a solver*

#### What this aims to be
A web app that stores a rubiks cube and lets you manipulate the rubiks cube in the browser, or optionally click a button to solve it

#### What this currently is
A web app and rest endpoint. The rest endpoint stores a rubiks cube on your session and lets you make moves on the rubiks cube via a rest call. The web app displays the rubiks cube in the browser where moves can be executed, the cube can be reset, or the cube can be shuffled. 

#### How this works
1. User browses to home page
1. Page requests to generate a rubiks cube for this browser session, or retrieves the rubiks cube from the previous session
1. Page requests the generated rubiks cube and displays it to the user
1. When clicking a button, the appropriate move/shuffle/reset request will be sent and then the new cube will be retrieved and displayed.

#### Usage
1. `$ git clone https://github.com/cheemcheem/rubiks-cube-solver.git`
1. `$ cd rubiks-cube-solver`
1. `$ mvn spring-boot:run`
1. `$ visit http://localhost:8080`
