# 2021-fall-cs160-team-groot
CS-160 Project

## Setting up the developer environment

To run the program, you need the latest version of Java, Maven, MongoDB, and NodeJS.

For Windows, 
- Java can be installed here: https://java.com/en/download/windows_manual.jsp
- Maven can be installed here: https://maven.apache.org/download.cgi?Preferred=ftp%3A%2F%2Fmirror.reverse.net%2Fpub%2Fapache%2F
- MongoDB can be installed here: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
- NodeJS can be installed here: https://nodejs.org/en/download/

Next, download the source code

```
git clone https://github.com/julissatinajero/2021-fall-cs160-team-groot.git
```

The folder structure should look like this in your shell:
![image](https://user-images.githubusercontent.com/22268862/144146045-e8b9998d-5a18-4777-91ba-2381093b02af.png)

To start the frontend, cd into the react-frontend folder. Then, run "npm install" to download the necessary npm dependencies. Then, run "npm start" to launch the frontend on localhost:3000.

To start the backend, first you will need to launch MongoDB on your computer. Then, open a new shell and cd into the spring-backend folder. In the spring-backend folder, run the command "mvn:spring-boot run" which will install the necessary dependencies in your pom.xml file then runs the Java code.

Front-end Testing Description 
-----------------------------
Path to automated tests: 2021-fall-cs160-team-groot/react-frontend/src/testing/cypress/integration

searchPageTest.js 
- Test 1: Tests search functionality with both 'Diet' and 'Restrictions' filters along with a user text input. With these valid inputs, this test should successfully pass the test case
- Test 2: Tests search functionality by providing user input with mixed caps. Mixed caps should not affect the search functionality and should return a recipe name if user input can be found in Recipe database
- Test 3: Tests search functionality by providing invalid user input - a string consisting of only spaces. The search page should return an error mentioning that the recipe cannot be found
- Test 4: Tests search functionality by clicking on a certain category to search by but inputting text of a completely different category. It should return an error because of the dissimilar categories. 

signInTests.js
- Test 1: Tests sign in page by submitting both an empty username and password input. This should result in an unsuccessful sign in and an error message alert. 
- Test 2: Tests sign in page by submitting a valid username and password input, which should redirect the user to a different page 
- Test 3: Tests sign in page by submitting only the username input but a missing password input. This should result in an unsuccessful sign in and an error message alert.
- Test 4: Tests sign in page by submitting only the password input but a missing username input. This should result in an unsuccessful sign in and an error message alert.

## Backend Testing Description
Path to automated tests: 2021-fall-cs160-team-groot/spring-backend/Automated Testing.postman_collection.json

We tested the backend via manual testing and automated testing. For automated testing, we implemented one test for sign up, sign in, create recipe, get all recipes, and get all of user's uploaded recipes test. Each test checks if the api request returns status 200, which means the test was successful. The create recipe test required a JSON web token to authenticate so after the sign in test, we set the JSON web token returned as an environment variable. This way, the create recipe test was able to retrieve the JSON web token it needed.

In the manual testing, every API request was tested with at least two test cases. We did the tests by manually calling each API request using Postman without using the test scripts.
