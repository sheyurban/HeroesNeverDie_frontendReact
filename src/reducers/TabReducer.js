import * as tabActions from '../actions/TabActions';

const initialState = {
  activeTab: 'home',
};

function TabReducer(state = initialState, action) {
  console.log('Reducer: ' + action.type);
  switch (action.type) {
    case tabActions.ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.activeTab,
      };
    default:
      return state;
  }
}

export default TabReducer;
