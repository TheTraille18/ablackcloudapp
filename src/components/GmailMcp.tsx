import React from 'react';
import AppShowcasePage from './AppShowcasePage';
import { appShowcases } from '../content/appShowcases';

export default function GmailMcp() {
  return <AppShowcasePage slug="gmail-mcp" content={appShowcases['gmail-mcp']} />;
}
