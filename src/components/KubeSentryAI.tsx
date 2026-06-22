import React from 'react';
import AppShowcasePage from './AppShowcasePage';
import { appShowcases } from '../content/appShowcases';

export default function KubeSentryAI() {
  return <AppShowcasePage slug="kubesentry-ai" content={appShowcases['kubesentry-ai']} />;
}
