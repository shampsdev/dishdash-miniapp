import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  init as initSDK,
  mainButton
} from '@telegram-apps/sdk-react';

export async function init(): Promise<void> {
  initSDK();

  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error('ERR_NOT_SUPPORTED');
  }

  try {
    const mountPromises: Promise<unknown>[] = [];

    backButton.mount();
    mainButton.mount();

    if (miniApp.mount.isAvailable()) {
      try {
        const promise = miniApp.mount();
        mountPromises.push(promise);
        await promise;
        if (miniApp.ready.isAvailable()) miniApp.ready();
        if (miniApp.bindCssVars.isAvailable()) miniApp.bindCssVars();
      } catch (err) {
        console.error('MiniApp mount failed:', err);
      }
    }

    try {
      await themeParams.mount();
      if (themeParams.bindCssVars.isAvailable()) themeParams.bindCssVars();
    } catch (err) {
      console.error('ThemeParams mount failed:', err);
    }

    if (viewport.mount.isAvailable()) {
      try {
        const promise = viewport.mount();
        mountPromises.push(promise);
        await promise;
        if (viewport.bindCssVars.isAvailable()) viewport.bindCssVars();
      } catch (err) {
        console.error('Viewport mount failed:', err);
      }
    }

    // if (themeParams.mount.isAvailable()) {
    // }

    await Promise.all(mountPromises);

    initData.restore();

    if (viewport.expand.isAvailable()) {
      try {
        viewport.expand();
      } catch (err) {
        console.error('Viewport expand failed:', err);
      }
    }
  } catch (error) {
    console.error('Initialization failed:', error);
    throw new Error('ERR_INIT_FAILED');
  }
}
