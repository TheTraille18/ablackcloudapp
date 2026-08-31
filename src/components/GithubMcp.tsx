import React from 'react';
import AppShowcasePage from './AppShowcasePage';
import { appShowcases } from '../content/appShowcases';

export default function GithubMcp() {
  return <AppShowcasePage slug="github-mcp" content={appShowcases['github-mcp']} />;
}
