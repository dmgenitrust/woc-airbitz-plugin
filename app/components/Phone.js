import React, {PropTypes} from 'react';
import countryCodes from '../setup/countryCodes';

const Phone = (props) => {
    return (
        <div>
            <h3 class="fs-subtitle">Enter your phone number:</h3>
            <select name="code" value={props.code} onChange={props.updateUserState}>
                {countryCodes.map(code=><option value={code.dial_code}>{code.dial_code} - {code.name}</option>)}
            </select>
            <input name="phone" placeholder="Phone Number" value={props.phone} onChange={props.updateUserState} />
        </div>
    );
};

Phone.propTypes = {
    phone: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    updateUserState: PropTypes.func.isRequired
};

export default Phone;
