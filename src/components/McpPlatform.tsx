import React from 'react';
import AppShowcasePage from './AppShowcasePage';
import { appShowcases } from '../content/appShowcases';

export default function McpPlatform() {
  return <AppShowcasePage slug="mcp-platform" content={appShowcases['mcp-platform']} />;
}
