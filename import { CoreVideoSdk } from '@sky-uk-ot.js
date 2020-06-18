import { CoreVideoSdk } from '@sky-uk-ott/core-video-sdk-js';
import { setIsDeeplinking } from '@sky-uk-ott/atlas-tv-targeted-devices';
import URL from 'url-parse';

import { handleDeeplinkPlayout, handleDeeplinkSeriesId } from '../handlers/handle-content-id-deeplink';
import { handleServiceKeyDeeplink } from '../handlers/handle-service-key-deeplink';

function resolveDeeplink(store, data, config) {
  if (!data) {
    return Promise.resolve(false);
  }

  store.dispatch(setIsDeeplinking(true));
  const url = new URL(decodeURIComponent(data), true);
  try {
    const deeplinkData1 = JSON.parse(url.query.deeplinkData);
    const deeplinkData = { pvid: 'cb3c6096-5db7-37e3-bc7f-aa6532221d5d', action: 'PLAY'}
    const contentId = deeplinkData.contentId || deeplinkData.pvid;
    const seriesId = deeplinkData.seriesId || deeplinkData.providerSeriesId;
    const serviceKey = deeplinkData.serviceKey;

    if (contentId) {
      return handleDeeplinkPlayout(store, deeplinkData);
    } else if (seriesId) {
      return handleDeeplinkSeriesId(store, seriesId, null, config);
    } else if (serviceKey) {
      return handleServiceKeyDeeplink(store, serviceKey, null, config);
    }
  } catch (error) {
    // eslint-disable-line no-empty
  }

  return Promise.resolve(false);
}

export function tizenHandleDeeplinks(store, config) {
  //const deviceDeeplink = CoreVideoSdk.deeplink;

  // deviceDeeplink.onDeeplink(data => resolveDeeplink(store, data, config));

    // const deviceDeeplink = CoreVideoSdk.deeplink;
  // deviceDeeplink.onDeeplink(data => resolveDeeplink(store, data, config));

  const deviceDeeplink = {
    data:
    'https%3A%2F%2Ftv.clients.peacocktv.com%2F%3FdeeplinkData%3D%7B%22pvid%22%3A%22aaef02a4-5117-3d29-a237-a14e05f95860%22%2C%22action%22%3A%22PLAY%22%7D'
    // 'https%3A%2F%2Ftv.clients.peacocktv.com%2F%3FdeeplinkData%3D%7B%22pvid%22%3A%227139020787662392112%22%2C%22action%22%3A%22PDP%22%7D',
  };

  return resolveDeeplink(store, deviceDeeplink.data, config);
}
