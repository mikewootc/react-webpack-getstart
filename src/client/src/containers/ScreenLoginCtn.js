import { connect } from 'react-redux'
import ScreenLogin from '../components/ScreenLogin.jsx'
import { usernameChange, passwordChange } from '../actions/rootActions'
import * as select from '../actions/select.js';
console.log('ScreenLogin:', ScreenLogin);

function mapStateToProps (state, ownProps) {
    console.log('select:', select);
    return {
        username: select.getUsername(state),
        password: select.getPassword(state),
        //password: state.userInfo.password,
    };
}

function mapDispatchToProps(dispatch, myProps) {
    return {
        handleUsernameChange: (username) => {
            //console.log('map dispatch. username:', username);
            dispatch(usernameChange(username));
        },
        handlePasswordChange: (password) => {
            //console.log('map dispatch. password:', password);
            dispatch(passwordChange(password));
        },
    }
}

const ScreenLoginCtn = connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenLogin);

console.log('ScreenLoginCtn:', ScreenLoginCtn);

export default ScreenLoginCtn;

