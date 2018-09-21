// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import WaitingRoom from '../../stories/screens/WaitingRoom';
import { toggleReady } from './actions';
export interface Props {
    navigation: any;
    isReady: boolean
}
export interface State { }
class WaitingRoomContainer extends React.Component<Props, State> {
    onBack(data) {
        if (data._from === 'CreateRoom') {
            this.props.navigation.navigate('Home'); // from Create Room
        } else {
            this.props.navigation.goBack(); // from Join Room
        }
    }
    onReady() {
        this.props.toggleReady();
    }
    render() {
        return <WaitingRoom
            navigation={this.props.navigation}
            onReady={this.onReady.bind(this)}
            onBack={this.onBack.bind(this)}
            isReady={this.props.isReady}
        />;
    }
}

const mapStateToProps = state => ({
	isReady: state.waitingRoomReducer.isReady
});

function bindAction(dispatch) {
    return {
        toggleReady: data => dispatch(toggleReady(data))
    }
};

export default connect(mapStateToProps, bindAction)(WaitingRoomContainer);