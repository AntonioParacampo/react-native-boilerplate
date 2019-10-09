import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoadingIndicator } from '@ublocks-react-native/component';
import { Actions, Router, Reducer } from 'react-native-router-flux';

import AppMonitor from './AppMonitor';
import AppScenes from './AppScenes';

class AppNavigator extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      scenes: Actions.create(AppScenes()),
    };
  }

  onReducerCreate = (params) => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  };

  render() {
    const { isLoading } = this.props;
    const { scenes } = this.state;
    return (
      <AppMonitor>
        {(appState) => (
          <React.Fragment>
            {scenes && (
              <Router
                scenes={scenes}
                onExitApp={() => true}
                createReducer={this.onReducerCreate}
                sceneStyle={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  shadowColor: null,
                  shadowOffset: null,
                  shadowOpacity: null,
                  shadowRadius: null,
                }}
              />
            )}
            <LoadingIndicator open={isLoading} />
          </React.Fragment>
        )}
      </AppMonitor>
    );
  }
}

export default connect(
  (state) => ({
    isLoading: state.appState.isLoading,
  }),
  (dispatch) => ({
    dispatch,
  }),
)(AppNavigator);
