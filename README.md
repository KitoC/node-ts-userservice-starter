# READ ME

For folder structure, we use the "Bulletproof node.js project architecture" demonstrated @ https://softwareontheroad.com/ideal-nodejs-project-structure/

Here is an example of the folder structure.

```
src
│   app.js          # App entry point
└───api             # Express route controllers for all the endpoints of the app
└───config          # Environment variables and configuration related stuff
└───jobs            # Jobs definitions for agenda.js
└───loaders         # Split the startup process into modules
└───db
    └───models      # Database models
    └───migrations  # Database migrations
└───services        # All the business logic is here
└───subscribers     # Event handlers for async task
└───types           # Type declaration files (d.ts) for Typescript

```

Services are created using a container pattern for dependency injection. Refer to Awilix for documentation.

## Useful links

Awilix (DI containter) - https://www.npmjs.com/package/awilix#usage
