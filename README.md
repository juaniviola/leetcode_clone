# Leetcode Clone

## Description

Online Judge Compiler is Leetcode tiny version. The app is divided in **Frontend ide**, **judge api** and **problem api**.

## Setup

> api

Default port: 5050

The api is using firebase store as database, to store test cases and evaluator of each problem.

Base structure

```javascript
{
  "problems": {
    "name_problem_1": {
      "extension_language": [ /* ONLY C++ and Javascript are available (as cpp and js) */
        "simple test case",
        "evaluator code",
        "correct answer",
        "complete test case"
      ],
    }
  },
  "statements": {
    "name_problem_1": {
      "title": "Name Problem 1",
      "hints": [],
      "input": "simple test case",
      "statement": "html description problem",
      "templates": [
        "solution file empty for cpp",
        "solution file empty for js"
      ],
    }
  }
}
```

Include Service Account Key in /api/modules as "online-compiler.json"

> judge

Default port: 3080

Judge api needs docker installed

Create .env file with the following keys

```sh
PROBLEM_API='your_api_url'
JUDGE_PATH='your_path_to_store_the_code_of_users'
```

> Client

Export Firebase SDK app in /online-compiler/config.js

Default port: 3000

## Install & Run

Valid for each application

```sh
yarn
yarn dev
```

## Preview

![pic1](/pictures/login.PNG)
![pic2](/pictures/problemList.PNG)
![pic3](/pictures/problem.png)
![pic4](/pictures/screenshot.png)
