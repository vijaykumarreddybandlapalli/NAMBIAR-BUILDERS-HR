import { createClient } from '@base44/sdk';
import { appParams } from '../lib/app-params';

const { appId, token, functionsVersion } = appParams;

const serverUrl = import.meta.env.VITE_BASE44_APP_BASE_URL;

// Prevent base44 from initializing if no backend
export const base44 = serverUrl
  ? createClient({
      appId,
      token,
      functionsVersion,
      serverUrl,
      requiresAuth: false,
    })
  : null;