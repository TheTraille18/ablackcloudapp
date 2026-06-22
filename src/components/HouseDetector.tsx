import React from 'react';
import AppShowcasePage from './AppShowcasePage';
import { appShowcases } from '../content/appShowcases';

export default function HouseDetector() {
  return <AppShowcasePage slug="house-detector" content={appShowcases['house-detector']} />;
}
