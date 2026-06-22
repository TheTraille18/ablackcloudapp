import React from 'react';
import AppShowcasePage from './AppShowcasePage';
import TaskManagerApp from './TaskManagerApp';
import { appShowcases } from '../content/appShowcases';

export default function TaskManagerPage() {
  return (
    <AppShowcasePage slug="task-manager" content={appShowcases['task-manager']}>
      <TaskManagerApp user={localStorage.getItem('user') || 'guest'} embedded />
    </AppShowcasePage>
  );
}
