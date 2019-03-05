# Loop-Front
Hello I'm LoopFront, and I am written to work with [Redux](https://redux.js.org) and [LoopBack](http://loopback.io/) like REST APIs. I manage action dispatcher for you and also manages api requests.

![What??](https://media1.giphy.com/media/1gUppOhe7f7WJquMzx/source.gif)

# Let's Chat

### What?? Why?
Coz it'll be fun :)

### Who exactly are you and what Exactly it is that you do?
I'm an [npm](https://www.npmjs.com/package/loop-front) package (written in [TS](https://www.typescriptlang.org) <3) that came into existence to reduce your work at redux level and make things easier for you at front end. I contains all the basic generic API request methods that loopback provide, I also dispatch [redux actions](https://redux.js.org/basics/actions#actions) on the basis of API request you made.

### Wait... I'm not getting it, give me some example that how you make things easier?
Ok. Say you have to make an API request to get the list of cities. What normal react+redux+loopback users do (also you, if you are normal :P ).

1. component.js

```javascript
import getCitiesList from actions.js
class ComponentName extends React.Component {
    componentDidMount(){
        this.props.getCitiesList();
    }

    render(){
        const {citiesList = []} = this.props;
        return (
            <div>
                // Here comes your list of cities 
            </div>
        )   
    }
}

const mapStateToProps = state => ({
    citiesList: state.Cities.citiesList
});

const mapDispatchToProps = dispatch => ({
    getCitiesList: () => dispatch(getCitiesList())
})
```
