import React, {PropTypes} from 'react';
import objectAssign from 'object-assign';

class Verify extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.user;
        this._onSubmit = this._onSubmit.bind(this);
        this._previous = this._previous.bind(this);
        this._onChangeCode = this._onChangeCode.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.user)
    }

    _onSubmit(e) {
        e.preventDefault();
        this.props.updateUser(this.state);
    }

    _previous(e) {
        this.props.updateUser(objectAssign({}, this.state, {step: 2}));
    }

    _onChangeCode(e) {
        const code = e.target.value;
        this.setState({code});
    }

    render() {
        return (
            <form onSubmit={this._onSubmit} style={{display:(this.props.step==3?'block':'none')}}>
                <h2 class="fs-title">Verify</h2>
                <h3 class="fs-subtitle">Enter your verification code</h3>
                <input placeholder="Verification Code" value={this.state.code} onChange={this._onChangeCode} />
                <input type="button" name="previous" class="previous action-button" value="Previous" onClick={this._previous} />
                <input type="submit" name="next" class="next action-button" value="Next" />
            </form>
        );
    }
};

Verify.propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired
};

export default Verify;
