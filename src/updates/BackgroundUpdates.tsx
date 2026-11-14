import {useEffect} from 'react';
import {AppState} from 'react-native';
import * as Updates from 'expo-updates';

// ON_LOAD checks on launch without waiting; fetched updates activate on the next launch.
// Periodic checks also cover long-running controllers. Never reload a live remote session.
export function BackgroundUpdates() {
  useEffect(() => {
    if (__DEV__ || !Updates.isEnabled) return;
    let checking = false;
    let lastCheck = Date.now();
    const check = async () => {
      if (checking || AppState.currentState !== 'active' || Date.now() - lastCheck < 6 * 60 * 60 * 1000) return;
      checking = true; lastCheck = Date.now();
      try {const result = await Updates.checkForUpdateAsync(); if (result.isAvailable) await Updates.fetchUpdateAsync();}
      catch {/* Offline controllers keep their last working, signed bundle. */}
      finally {checking = false;}
    };
    const interval = setInterval(() => {void check();}, 60 * 1000);
    const subscription = AppState.addEventListener('change', state => {if (state === 'active') void check();});
    return () => {clearInterval(interval);subscription.remove();};
  }, []);
  return null;
}
