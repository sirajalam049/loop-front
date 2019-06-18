import LoopFront, { TAction } from "./LoopFront";
import { createStore, Reducer } from "redux";


// const Store = createStore({
//     App: {} 
// });

class Test extends LoopFront {
    constructor() {
        super('users');
    }
}

function main() {
    LoopFront.init('http://staging.mithyalabs.com:8334/api', { log: true });
    (new Test()).requestPatchItem('12345', { name: 'Siraj' });
}


main();