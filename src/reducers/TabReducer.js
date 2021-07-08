import * as tabActions from '../actions/TabActions';
import * as authActions from '../actions/AuthenticationActions';

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
        activeTab: 'profil',
      };
    case tabActions.HIDE_PROFIL_AREA:
      return {
        ...state,
        showProfilArea: false,
        activeTab: 'home',
      };
    case authActions.AUTHENTICATION_LOGOUT:
      return {
        ...state,
        showProfilArea: false,
        activeTab: 'home',
      };
    default:
      return state;
  }
}

export default TabReducer;
