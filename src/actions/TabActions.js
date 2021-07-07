export const ACTIVE_TAB = 'ACTIVE_TAB';

export function getSwitchActiveTabSuccess(tab) {
  return {
    type: ACTIVE_TAB,
    activeTab: tab,
  };
}

export function switchTab(tab) {
  console.log('Switching tab');

  return (dispatch) => {
    const action = getSwitchActiveTabSuccess(tab);
    dispatch(action);
  };
}

//////////////////////////////////////////////////////

export const SHOW_PROFIL_AREA = 'SHOW_PROFIL_AREA';
export const HIDE_PROFIL_AREA = 'HIDE_PROFIL_AREA';

export function showProfilArea() {
  return {
    type: SHOW_PROFIL_AREA,
  };
}

export function hideProfilArea() {
  return {
    type: HIDE_PROFIL_AREA,
  };
}
