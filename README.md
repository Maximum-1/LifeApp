# Maximum 1™ Life App

## About This Application
*Duration: 2 Week Sprint*

**The Human Behavior Matrix**

The Human Behavior Matrix™ from Maximum 1™ is a self-guided emotional behavior system that works to alter problematic behaviors by resolving past trauma through self-reflection. This system is centered around working through individual problematic attitudes or behaviors in a paper form known as a "tree". Each "tree" is broken down into six major phases that contain their own groups of steps. As each step and phase is completed, the user identifies the attitude or behavior they want to change, explores subconscious actions and trauma that prompted the attitude or behavior, and add further self-reflection to refute and reframe the attitude or behavior into one that is more beneficial.

**The Maximum 1 Life App**

With the creation of the Maximum 1™ Life App, a user is able to create multiple trees, work through each tree in a linear fashion and at their own pace, and review a summary of important steps for each tree. Users can also search to more easily access specific trees.

## Screen Shots

![View of the Phases Page](/public/images/phases-page-view.png)
![View of a specific step](/public/images/step-view.png)
![View of search functionality](/public/images/search-functionality.png)


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Installation

1. Create a new database called `maximum_1`
    * The `database.sql` file contains the queries you will need to be able to set up the required tables for this application
2. Run `npm install`
3. Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    * While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
4. If Postgres is not already running, start it by entering `brew services start postgresql` into the terminal
5. Run `npm run server`
6. Run `npm run client`
7. Running the two previous commands will open a web browser with the application

## Usage

1. Login with your username and password or navigate to the Register page to set up an account with your username, password, and email address.
2. Users can access the "About" page or "Terms of Service" page whether or not the user is logged in. The "About" page provides additional information on Maximum 1™.
2. If it is your first time logging in to the application, you will see an introduction modal that tells you a bit more about Maximum 1™ and the Human Behavior Matrix™. Click "Got It" to disable the modal and view the Home page.
3. In the navigation bar, clicking the button labeled "Add Tree" will prompt a pop-up modal that will allow you to enter a name for your new tree. Once you have entered a tree name and clicked "Add Tree", the modal will disappear and you will see the tree added to the Home page.
4. Clicking on "View Tree" will take you the phases menu for the specific tree. *Note:* If this is your first time viewing the specific tree, you will be given the option to complete a survey. This survey prompts you to reflect on how powerful a particular attitude or behavior is at that time, and how long you are affected by the attitude or behavior. Because this is a linear process, you will need to start from the first step of the first phase. Steps will have a lock icon next to their name until the previous step has been completed.
5. Clicking on any available step will allow you to view a description of the step, optional sentence starters and hints if you need help, and a text box to enter your self-reflection.
6. Click on "Previous Step" if you need to reference the step before, and click "Next Step" once you have completed your self-reflection to move on to the next step.
7. Once you complete the final step of a tree, or if you click "View Summary" for a tree, you are taken to the Summary page. This displays your self-reflections for selected steps. Click the "Print" button to save the document as a PDF to your computer and print a copy of the summary.
8. Navigating to the "My Trees" page will allow you to search through all of your trees. This can be done by typing in a keyword, or by sorting based on completion.
9. Clicking "Delete" on any specific tree will remove that tree from the page.

## Built With

* React
* React Sagas
* Redux
* JavaScript
* React Bootstrap
* Sweet Alerts
* Node.js
* Express
* PostgreSQL
* Passport

## Acknowledgement
Thanks to [Prime Digital Academy](https://www.primeacademy.io) for providing the knowledge to create this application
Thanks to [Maximum 1™](https://www.iammaximum1.com) for providing the vision for this application
Thanks to [Adrian Niu](https://github.com/AdrianNiu), [Ashley Scott](https://github.com/aescott87), [Jordan Walker](https://jaden-reklaw.github.io/My_Developer_Site/), and [Mustafa Ibrahim](https://mustafaibrahim4.github.io/aboutMe/) for bringing this application to life



