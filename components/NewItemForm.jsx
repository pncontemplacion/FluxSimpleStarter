//NewItemForm.jsx
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppDispatcher from '../dispatcher/AppDispatcher';

class NewItemForm extends Component {
    createName(e) {

        //so we don't reload the page
        e.preventDefault();

        //create ID

        let id = guid();

        //this gets the value from the input
        let item_firstname = ReactDOM.findDOMNode(this.refs.item_firstname).value.trim();
        let item_lastname = ReactDOM.findDOMNode(this.refs.item_lastname).value.trim();

        //this removes the value from the input
        ReactDOM.findDOMNode(this.refs.item_firstname).value = '';
        ReactDOM.findDOMNode(this.refs.item_lastname).value = '';
        //This is where the magic happens,
        //nno need to shoot this action all the way to the root of your application to edit state.
        //AppDispatcher does this for you.
        AppDispatcher.dispatch({
            action: 'add-name',
            new_name: {
                id: id,
                firstname:item_firstname,
                lastname:item_lastname
            }

        });

    }

    render(){
        return <form onSubmit = {this.createName.bind(this) }>

            FirstName: <input type = "text" ref="item_firstname" /> &nbsp;
            LastName: <input type ="text" ref="item_lastname" /> &nbsp;
            <button className="btn-success">Add New Name</button>

            </form>;
    }
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export default NewItemForm;