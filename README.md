# Largest Sum Contiguous Subarray 
An API implemented using Apollo Server. It solves the Largest sum contiguous subarray problem.

## Description

The largest sum contiguous subarray is a problem solved using a dynamic programming method where the task is to find a contiguous subarray with the largest sum, given a list of n elements. The API is designed to solve such problem using Kadane's algorithm, the optimal solution for this problem in linear time.
## Getting started

### Dependencies

* To run locally you will need [node](https://nodejs.org/) installed globally on your machine. You can use either `npm` or [yarn](https://yarnpkg.com/) as package managers.
* To run the project image you will need [Docker](https://www.docker.com/) installed

### Installing and executing
#### Running local with node
1. Clone down this repository   
2. Run `npm install` inside the main folder install the project dependencies in `node modules`
3. Build and run the application with `npm run serve`

#### Running local with Docker
1. Clone down this repository 
2. On the main folder, run `docker-compose up`, this will build and run a docker image of the project using the dockerfile configurations.

#### Running local with Docker Hub image
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You may also run this project pulling the image from docker hub with `docker pull christiancantarino/maxsum`.After pulling the image, run it using the command: `docker run -p 8080:8080 christiancantarino/maxsum`

### Testing
To run the implemented tests, after installing the dependencies with `npm install`, run `npm test` on the main folder.

## GraphQL API
To see the GraphQL queries and run them on your own with Apollo Server:

`localhost:8080/graphql`
### Requesting MaxSum
  Send a requisition to `localhost:8080/graphql` with method `POST` using the following body example:
  ```
  "query": "mutation {
    maxsum(list: [-2, 3, 5, -1, 4, -5]) {
        sum
        positions
    }
}"
  ```
  
  Response example:
  ```
  {
    "data": {
        "maxsum": {
            "sum": 11,
            "positions": [
                2,
                3,
                4,
                5
            ]
        }
    }
}
  ```
## Project Structure:

```
├── src
│   └──app  
│   │   └──maxSum  
│   │   │   └──data.ts  \\Service containing Kadane's Largest sum contiguous subarray solution
│   │   │   └──resolver.ts  \\Apollo server resolver with maxSum mutation definition
│   │   │   └──response.ts  \\GraphQL ObjectType for response definition
│   │   └──schema.ts  \\GraphQL Schema Configurations
│   │   └──app.ts    \\Main server configuration file
│   └──index.ts    \\Main server file
└──test
│   └──integration
│   │    └──maxSumResolver.test.ts  \\Aplication's resolver integration test
│   └──unit
│   │    └──maxSum.test.ts  \\Kadane's algorithm unit test
├── docker-compose.yaml    \\Docker-compose configurations
├── Dockerfile    \\Dockerfile configurations
├── jest.config.ts  \\Jest configurations file
├── package.json    \\Project configurations    
├── tsconfig.json   \\Typescript specific configurations        
```
