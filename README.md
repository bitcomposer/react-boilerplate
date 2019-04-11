# Pulse Client - Please readme.

A modern replacement for the flex based Pulse client.

In the standardjs ideology of you have to pick something rather than arguing for ever over polarising sticking points, I have gone ahead and chosen a starting point and libraries for the Pulse project.  You may not agree with them but it will ease your javascript fatigue as I have taken that pain on your behalf.

I have used react-boilerplate as the base for the project as although react create app is nice and hides complexity, you would very quickly need to eject the project to have better control over the build settings and even the linter.  Once you factor in redux and saga boilerplate then react-boilerplate seemed like a better option.

Javascript is the way to go due to it's ubiquity.  Flow will add type checking so we have the main benefit of Typescript available anyway.

###Libraries

react
redux
redux-saga
immutable.js
reselect
prop-types
react-router-dom
flow

In my recent angular single page apps state has been the single biggest challenge facing these types of applications so the single source of truth offered by redux and the immutable paradigm are very attractive and it will be interesting to see if it ends up working as well as the hype suggests.  I have gone for sagas as it seems like a decent approach to handling the side effects of the actions such as API calls or websocket client side calls. Redux helps to stop the need for the anti pattern - 'prop drilling' so that is a nice tick on the plus side.

### UI Library
ReactStrap - Add extra UI component libraries if needed as React is nice and flexible like that.

### NPM Scripts
```
npm run start
npm run build
npm run lint
npm run test
npm run generate
npm run flow
etc
```

###Folder Structure
I have based the folder structure on the thoughts in this article:
[How to better organize your React applications?](https://medium.com/@alexmngn/how-to-better-organize-your-react-applications-2fd3ea1920f1)
The ```npm run generate``` command can scaffold the scenes, scene components and sub scenes as well as containers and components.  
I may do more work with this depending on how heavily it is used in the project as we are missing a service generator.