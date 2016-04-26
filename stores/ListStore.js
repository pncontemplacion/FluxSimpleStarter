/**
 * Created by Paul on 4/25/2016.
 */
// ListStore.js
import {EventEmitter} from 'events';
import _ from 'lodash';

let ListStore = _.extend({}, EventEmitter.prototype, {

    // Mock default data
    nameinfo: [
        {
            lastname: 'Chu',
            firstname: 'Kim',
            id: 0
        },
        {
            lastname: 'Contemplacion',
            firstname: 'Paul',
            id: 1
        }
    ],


    //Get all names
    getNames(){
        return this.nameinfo;
    },

    //Add name
    addName(new_name) {
        this.nameinfo.unshift(new_name); // add new item to the beginning of the array
    },

    //Remove name
    removeName(name_id) {
        let nameinfo = this.nameinfo;

        _.remove(nameinfo, (name) => {
            return name_id == name.id;
        });
        this.nameinfo = nameinfo;
    },

    //Emit Change event
    emitChange() {
        this.emit('change');
    },

    //Add change listener
    addChangeListener(callback) {
        this.on('change', callback);
    },

    //Remove change listener
    removeChangeListener(callback) {
        this.removeChangeListener('change',callback)
    }
});

export default ListStore;