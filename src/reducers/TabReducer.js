import * as tabActions from '../actions/TabActions';

const initialState = {
  activeTab: 'home',
  showProfilArea: false,
};

function TabReducer(state = initialState, action) {
  console.log('Reducer: ' + action.type);
  switch (action.type) {
    case tabActions.ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.activeTab,
      };
    case tabActions.SHOW_PROFIL_AREA:
      return {
        ...state,
        showProfilArea: true,
      };
    case tabActions.hideProfilArea:
      return {
        ...state,
        showProfilArea: false,
      };
    default:
      return state;
  }
}

export default TabReducer;
