import React from 'react';
import initialState from '../setup/initialState';
import objectAssign from 'object-assign';
import Phone from './Phone';

export default class App extends React.Component {
    constructor() {
        super();
        this._updateUser = this._updateUser.bind(this);
        this._updateUserState = this._updateUserState.bind(this);
        this._getUser = this._getUser.bind(this);
        this._router = this._router.bind(this);
        this.state = objectAssign({}, initialState, {user:this._getUser()});
    }

    _updateUser(e) {
        e.preventDefault();
        console.log(this.state.user);
        Airbitz.core.writeData('userInfo', JSON.stringify(this.state.user));
    }

    _updateUserState(e) {
        const newVal = {};
        newVal[e.target.name] = e.target.value;
        const newObj = objectAssign({}, initialState.user, this._getUser(), newVal);
        this.setState({user:newObj});
    }

    _getUser() {
        const userStr = Airbitz.core.readData('userInfo');
        if (userStr)
            return JSON.parse(userStr);
        else{
            Airbitz.core.writeData('userInfo', JSON.stringify(initialState.user));
            return initialState.user;
        }
    }

    _router(){
        return this.state.routes.map(route=>{
            switch (route) {
                case 'phone':
                    return <Phone key='phone' phone={this.state.user.phone} updateUserState={this._updateUserState} />;
                default:
                    return null;
            }
        })
    }

    render() {
        return (
            <div id="forms">
                <ul id="progressbar">
                    <li className={this.state.step>=1?'active':''}>Discovery</li>
                    <li className={this.state.step>=2?'active':''}>Offers</li>
                    <li className={this.state.step>=3?'active':''}>Verify</li>
                </ul>
                <form onSubmit={this._updateUser}>
                    {this._router()}
                    <input type="button" name="previous" class="previous action-button" value="Previous" onClick={this._previous} />
                    <input type="submit" name="next" class="next action-button" value="Next" />
                </form>
            </div>
        );
    }
}
