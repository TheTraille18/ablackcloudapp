import React from 'react';
import AppShowcasePage from './AppShowcasePage';
import { appShowcases } from '../content/appShowcases';

export default function GroceryMcp() {
  return <AppShowcasePage slug="grocery-mcp" content={appShowcases['grocery-mcp']} />;
}
