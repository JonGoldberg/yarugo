const CURRENT_PLAY_KEY = "yarugo-current-20220226";
const HISTORY_KEY = "yarugo-history-20220226";

export function getCurrentPlay(): CurrentPlayState {
  return JSON.parse(window.localStorage.getItem(CURRENT_PLAY_KEY));
}

export function setCurrentPlay(value: CurrentPlayState) {
  window.localStorage.setItem(CURRENT_PLAY_KEY, JSON.stringify(value));
}

export function getHistory(): ResultHistory {
  return JSON.parse(window.localStorage.getItem(HISTORY_KEY));
}

export function addToHistory(newState: CurrentPlayState) {
  const history = getHistory() || {};
  history[newState.puzzleDateString] = newState.activeWords;
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
