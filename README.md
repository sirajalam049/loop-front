# Loop-Front
Hello I'm LoopFront, and I am written to work with [Redux](https://redux.js.org) and [LoopBack](http://loopback.io/) like REST APIs. I manage action dispatcher for you and also manages api requests.

![What??](https://media1.giphy.com/media/1gUppOhe7f7WJquMzx/source.gif)

# Let's Chat

### What?? Why?
Coz it'll be fun :)

### Who exactly are you and what Exactly it is that you do?
I'm an [npm](https://www.npmjs.com/package/loop-front) package (written in [TS](https://www.typescriptlang.org) <3) that came into existence to reduce your work at redux level and make things easier for you at front end. I contains all the basic generic API request methods that loopback provide, I also dispatch [redux actions](https://redux.js.org/basics/actions#actions) on the basis of API request you made.

### Wait... I'm not getting it, give me some example that how you make things easier?
Ok. Say you have to make an API request to get the list of cities. What normal react+redux+loopback users do (also you, if you are normal :P ) is -
1. Create an Actions file have method to make the api request. e.g.

```javascript
// Considering you have api structure like loopback and have already setup the base api url.
    requestGetCitiesList(params){
        axios.request({
            url: 'cities',
            params
        })
    }
```

2. Then dispatch a function that call that api request method and then dispatch the data like 

```javascript

export const CITIES_LIST_RECEIVED = 'CITIES_LIST_RECEIVED';

// Considering you are using thunk
    const getCitiesList = (params) => dispatch => {
        requestGetCitiesList(params).then(res => dispatch({type: CITIES_LIST_RECEIVED, data: res.data}));
    }
```

3. Next you use your action constant in your reducer to update the redux-store with upcoing data like

```javascript
const Cities = (state = {}, action) => {
    switch(action.type){
        case CITIES_LIST_RECEIVED: return {...state, citiesList: action.data}
        default: return state;
    }
}
```
Now there are may APIs, you have to repeat all these steps for each API. Can you see any pattern here? Somthing repeatetive right? Now see how made it a lot easier for you.

1. When you are using me, all you have to create a class extending me and passing the name of the model in constructor. 

```javascript
    import LoopFront from "loop-front";

    export class City extends LoopFront {
        constructor() {
            super('cities');
        }
    }

    export CityObject = new City();
```

2. Boom!! All the loopback CRUD api methods and corresponsing redux action dispatcher are here. All you have to do is call them. For in this example

```javascript
    CityObject.getItems();
```

It will automatically dispatch action `CITIES_LIST_RECEIVED` and you can access it in your reducer like -

```javascript
const Cities = (state = {}, action) => {
    switch(action.type){
        case CityObject.Actions.LIST_RECEIVED: return {...state, citiesList: action.data}
        default: return state;
    }
}
```

### Well, that's cool! Is there anything more I need to know?
Yes. A lot. Below is the full documentation about me.
Happy Coding :)