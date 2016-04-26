/**
 * Created by Paul on 4/25/2016.
 */
//AppDispatcher.js
import {Dispatcher} from 'flux';
let AppDispatcher = new Dispatcher();

import ListStore from '../stores/ListStore';

//Register callback with AppDispatcher
AppDispatcher.register((payload) => {
    let action = payload.action;
    let new_name = payload.new_name;
    let id = payload.id;

    switch(action) {
        //Respond to add-name action
            case 'add-name':
            ListStore.addName(new_name);
            break;

        //Respond to remove-name action
            case 'remove-name':
            ListStore.removeName(id);
            break;

        default:
            return true;
    }

    //If action was responded to, emit change event
    ListStore.emitChange();

    return true;
});

export default AppDispatcher;
