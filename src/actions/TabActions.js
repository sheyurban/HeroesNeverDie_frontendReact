// export const ACTIVE_TAB_HOME = 'ACTIVE_TAB_HOME';
// export const ACTIVE_TAB_GROUP = 'ACTIVE_TAB_GROUP';
// export const ACTIVE_TAB_GUIDES = 'ACTIVE_TAB_GUIDES';
// export const ACTIVE_TAB_DISCUSS = 'ACTIVE_TAB_DISCUSS';
export const ACTIVE_TAB_ERROR = 'ACTIVE_TAB_ERROR';
export const ACTIVE_TAB = 'ACTIVE_TAB';

export function getSwitchActiveTabSuccess(tab) {
  return {
    type: ACTIVE_TAB,
    activeTab: tab,
  };
}

export function getSwitchActiveTabError(error) {
  return {
    type: ACTIVE_TAB_ERROR,
    error: error,
  };
}

export function switchTab(tab) {
  console.log('Switching tab');

  return (dispatch) => {
    const action = getSwitchActiveTabSuccess(tab);
    dispatch(action);
  };
}
