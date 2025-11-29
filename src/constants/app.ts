import Constants from 'expo-constants';

const DEFAULT_DEV_PORT = 3000;

const getDebuggerHost = (): string | null => {
  const hostUri =
    Constants.expoConfig?.hostUri ?? Constants.manifest?.debuggerHost ?? null;

  if (!hostUri) {
    return null;
  }

  return hostUri.split(':')[0] ?? null;
};

const buildLocalNetworkUrl = (): string | null => {
  const host = getDebuggerHost();

  if (!host) {
    return null;
  }

  return `http://${host}:${DEFAULT_DEV_PORT}`;
};

const normalizeUrl = (url: string): string => {
  return url.replace(/\/+$/, '');
};

const resolveApiUrl = (): string => {
  const envOverride =
    process.env.EXPO_PUBLIC_API_URL ||
    Constants.expoConfig?.extra?.apiUrl ||
    null;

  let resolvedUrl: string;

  if (envOverride) {
    resolvedUrl = normalizeUrl(envOverride);
  } else if (__DEV__) {
    const localNetworkUrl = buildLocalNetworkUrl();

    if (localNetworkUrl) {
      resolvedUrl = normalizeUrl(localNetworkUrl);
    } else {
      resolvedUrl = 'http://localhost:3000';
    }
  } else {
    resolvedUrl = 'http://localhost:3000';
  }

  if (__DEV__) {
    console.log(`🌐 [API Config] Resolved API URL: ${resolvedUrl}`);
  }

  return resolvedUrl;
};

export const appConfig = {
  apiUrl: resolveApiUrl(),
  googleClientId:
    process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID ||
    Constants.expoConfig?.extra?.googleClientId ||
    '',
};

