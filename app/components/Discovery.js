import React, {PropTypes} from 'react';
import objectAssign from 'object-assign';

class Discovery extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.user;
        this._onSubmit = this._onSubmit.bind(this);
        this._onChangeAmount = this._onChangeAmount.bind(this);
        this._onChangeZip = this._onChangeZip.bind(this);
        this._onChangePhone = this._onChangePhone.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.user)
    }

    _onSubmit(e) {
        e.preventDefault();
        this.props.updateUser(objectAssign({}, this.state, {step: 2})); 
    }

    _onChangeAmount(e) {
        const amount = e.target.value;
        this.setState({amount});
    }

    _onChangeZip(e) {
        const zip = e.target.value;
        this.setState({zip});
    }

    _onChangePhone(e) {
        const phone = e.target.value;
        this.setState({phone});
    }

    render() {
        return (
            <form onSubmit={this._onSubmit}>
                <h2 class="fs-title">Discovery</h2>
                <h3 class="fs-subtitle">We just need a little info</h3>
                <input id="phone" placeholder="Phone #" value={this.state.phone} onChange={this._onChangePhone} />
                <input id="amount" placeholder="USD Amount" value={this.state.amount} onChange={this._onChangeAmount} />
                <input id="zip" placeholder="Zip Code" value={this.state.zip} onChange={this._onChangeZip} />
                <input type="submit" name="next" class="next action-button" value="Next" />
            </form>
        );
    }
};

Discovery.propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired
};

export default Discovery;
