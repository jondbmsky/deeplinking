export function tizenHandleDeeplinks(store, config) {
  // const deviceDeeplink = CoreVideoSdk.deeplink;
  // deviceDeeplink.onDeeplink(data => resolveDeeplink(store, data, config));

  const deviceDeeplink = {
    data:
    //  'https%3A%2F%2Ftv.clients.peacocktv.com%2F%3FdeeplinkData%3D%7B%22pvid%22%3A%22aaef02a4-5117-3d29-a237-a14e05f95860%22%2C%22action%22%3A%22PLAY%22%7D'
     'https%3A%2F%2Ftv.clients.peacocktv.com%2F%3FdeeplinkData%3D%7B%22pvid%22%3A%2202ed5e7f-5588-34e7-913d-3583e517123f%22%2C%22action%22%3A%22PLAY%22%7D',
  };

  return resolveDeeplink(store, deviceDeeplink.data, config);
}
