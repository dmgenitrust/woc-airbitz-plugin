import React, {PropTypes} from 'react';
import objectAssign from 'object-assign';
import Q from 'q';

class Offers extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.user;
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._previous = this._previous.bind(this);
        this._onChangeAmount = this._onChangeAmount.bind(this);
        this._discoveryInputs = this._discoveryInputs.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState(objectAssign({}, nextProps.user, {offers: this.state.offers}));
        if ((!this.state.offers.singleDeposit || this.state.amountCache != nextProps.user.amount) && nextProps.user.zip.length >= 5 && Number(nextProps.user.amount) > 0 && nextProps.step == 2 && this.state.step != 2)
            this._discoveryInputs(nextProps);
    }

    _onSubmit(e) {
        e.preventDefault();
        this.props.updateUser(objectAssign({}, {offerId: this.state.offerId || "", step: 3}));
    }

    _previous(e) {
        this.props.updateUser(objectAssign({}, {offerId: this.state.offerId || "", step: 1}));
    }

    _onChangeAmount(e) {
        const amount = e.target.value;
        this.setState({amount});
    }

    _discoveryInputs(nextProps) {
        postDiscoveryInputs(nextProps.user, (id, resp) => {
            this.props.updateUser({wocId: id, deviceCode: nextProps.user.deviceCode || 'airbitz-'+id});
            this.setState({offers: resp, amountCache: nextProps.user.amount});
        });
    }

    render() {
        return (
            <form onSubmit={this._onSubmit} style={{display:(this.props.step==2?'block':'none')}}>
                <h2 class="fs-title">Offers</h2>
                <h3 class="fs-subtitle">Select an offer</h3>
                <div id="offers">
                    {!this.state.offers.singleDeposit && <div className="loader">Loading...</div>}
                    {this.state.offers.singleDeposit && this.state.offers.singleDeposit.map(offer => {
                        return <div key={offer.id} className="offer">{offer.bankName} - {offer.amount.bits}</div>;
                    })}
                </div>
                <input type="button" name="previous" class="previous action-button" value="Previous" onClick={this._previous} />
                <input type="submit" name="next" class="next action-button" value="Next" />
            </form>
        );
    }
};

Offers.propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired
};

export default Offers;

function postDiscoveryInputs(state, cb){
    let cryptoAddress;
    Airbitz.core.createReceiveRequest(null, {
        success: ({address}) => {cryptoAddress = address}
    })
    var http = new XMLHttpRequest();
    var url = state.apiUrl + '/api/v1/discoveryInputs/';
    const data = {
        usdAmount: state.amount,
        cryptoAmount:'0',
        crypto:'BTC',
        zipCode: state.zip,
        cryptoAddress
    };
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status != 400) {
            const resp = JSON.parse(http.responseText);
            getOffers(state.apiUrl, resp.id, cb);
        }
    }
    http.send(getFormDataString(data));
}

function getOffers(apiUrl, id, cb){
    var http = new XMLHttpRequest();
    var url = apiUrl + '/api/v1/discoveryInputs/'+id+'/offers/';
    http.open("GET", url);
    http.onreadystatechange = () => {
        if (http.readyState == 4 && http.status != 400) {
            const resp = JSON.parse(http.responseText);
            cb(id, resp);
            // setTimeout(()=>{cb(id, resp);}, 5000);
        }
    }
    http.send();
}

function getFormDataString(obj){
    let str = "";
    for ( var key in obj ) {
        str += "&"+key+"="+obj[key];
    }
    return str.substring(1);
}
