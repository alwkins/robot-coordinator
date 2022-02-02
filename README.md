# Robot Coordinator

Next.js project simulating control of a robot fleet from a web page.

## Description

A fleet of cooking robots can be assigned tasks by operators, who must log in before viewing the robot dashboard. The approved operator list is as follows:

* **User:** Gordon Ramsay, **Password:** gordonramsay  
* **User:** Julia Child, **Password:** juliachild  
* **User:** Ratatouille, **Password:** ratatouille  

The project simulates robot completion of tasks, since there is no actual robot to report back its status. The following tasks are currently supported:

* **Task:** Fry Egg, **Duration:** 3 seconds  
* **Task:** Chop Onion, **Duration:** 6 seconds  
* **Task:** Cook Pasta, **Duration:** 9 seconds

### Features

#### Login with Username and Password
<img width="405" alt="Screen Shot 2022-01-31 at 8 34 15 PM" src="https://user-images.githubusercontent.com/75457552/151905183-f7912cce-e8eb-4847-a94b-789f9b70a10b.png">

#### Robot Status is Displayed to Logged-In Users
![Screen Shot 2022-01-31 at 8 35 24 PM](https://user-images.githubusercontent.com/75457552/151905182-b40d8da5-d8c8-4db5-af62-2eb13b490e88.png)

#### Robot Data Updates in Real-Time
The robot data displayed stays up to date, even when a task was started by another operator.
![Screen Shot 2022-01-31 at 8 35 29 PM](https://user-images.githubusercontent.com/75457552/151905180-9aee3013-8fe7-4261-9589-22a585b16a34.png)

## Technology Stack
* Next.js
* TypeScript
* Firebase Cloud Firestore

## Run

### View Deployment on Vercel

The deployed project can be viewed on the web at https://robot-coordinator.vercel.app/.

### Run Locally

This instructions are written for MacOS.

1. Clone repo to your location of choice on disk, e.g. `Documents` folder
2. Navigate in terminal to the root folder of the cloned repo, e.g. `Documents/robot-coordinator`
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start application
5. Navigate in web browser to `localhost:3000`

### Instructions for Operation

#### Login

1. Attempt to login with invalid credentials.
2. Alert will appear notifying you that login has failed.
3. Login with approved username and password combination.
4. Robot coordinator dashboard will appear with the first robot selected.

#### Robot Coordinator Dashboard

6. Select different robots on the left bar and observe that the robot display switches to show each robot.
7. Start a task by clicking one of the task buttons.
8. Observe that robot status updates to reflect that it is busy.
9. Wait until the task completes, robot status will return to available.

#### Robot Availability

11. Start a task and attempt to start another task while that task is still running.
12. Observe that an error appears and the original task will continue running to completion.

#### Multiple Operators

13. Leave the first web page open.
14. Open a second web browser window and connect.
15. Log in as a different user.
16. Configure screen so that you can see both pages at once.
17. Select the same robots in both the original page and the new page.
18. Start a task on one page and observe that the other page updates to match.

### Sequence Diagram

![robot-coordinator-task-flow](https://user-images.githubusercontent.com/75457552/152084939-54ae3969-933e-416a-bd37-e362655d5a5c.png)
