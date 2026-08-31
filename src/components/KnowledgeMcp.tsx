import React from 'react';
import AppShowcasePage from './AppShowcasePage';
import { appShowcases } from '../content/appShowcases';

export default function KnowledgeMcp() {
  return <AppShowcasePage slug="knowledge-mcp" content={appShowcases['knowledge-mcp']} />;
}
