import React from 'react';
import AppShowcasePage from './AppShowcasePage';
import { appShowcases } from '../content/appShowcases';

export default function RagSystem() {
  return <AppShowcasePage slug="rag-system" content={appShowcases['rag-system']} />;
}
