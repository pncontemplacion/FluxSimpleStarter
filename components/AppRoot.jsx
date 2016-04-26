//AppRoot.jsx
// AppRoot.jsx
import React, {Component} from 'react';
import ListStore from '../stores/ListStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

//Sub components
import NewItemForm from './NewItemForm';

// Method to retrieve state from Stores
let getListState = () => {
    return {
        nameinfo: ListStore.getNames()
    };
}

class AppRoot extends Component {

    // Method to setState based upon Store changes
    _onChange() {
        this.setState(getListState());
    }

    constructor(props) {
        super(props);
        this.state = getListState();
    }

    // Add change listeners to stores
    componentDidMount() {
        ListStore.addChangeListener(this._onChange.bind(this));
    }

    // Remove change listeners from stores
    componentWillUnmount() {
        ListStore.removeChangeListener(this._onChange.bind(this));
    }

    removeName(e){

        let id = e.target.dataset.id;

        AppDispatcher.dispatch({
            action: 'remove-name',
            id: id
        });

    }

    render(){

        let _this = this;
        let nameinfo = ListStore.getNames();
        let nameHtml = nameinfo.map(( listName ) => {
            return <li key={ listName.id }>
                <button onClick={ _this.removeName } data-id={ listName.id } className="btn-danger">x</button> &nbsp;
                { listName.firstname } &nbsp; {listName.lastname}

            </li>;
        });

        return <div>
            <br />
            <hr />
            <h4 className="text-danger text-center">ECMAScript 6 Demonstration Using React with Flux</h4>
            <h5 className="text-center">Name List</h5>
            <NewItemForm />
            <hr />
            <ul>
                { nameHtml }
            </ul>
               <h5 className="label label-success">Total count: {nameHtml.length}</h5>

        </div>;
    }

}

export default AppRoot;