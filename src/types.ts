export interface Task {
  User: string;
  TaskName: string;
  Description?: string;
  DateCreated?: string;
  TaskRunTime?: string;
  TasKRunTime?: string;
  TaskStatus?: string;
}

export interface ProfileFormValues {
  user: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface TaskFormValues {
  taskName: string;
  taskDescription: string;
  taskRunTime: string;
  hour: string;
  minute: string;
  seconds: string;
}

export type AppStatus =
  | 'Live'
  | 'In Development'
  | 'In Progress'
  | 'Beta'
  | 'Planned'
  | 'POC'
  | 'Maintenance'
  | 'Deprecated';

export interface AppImage {
  imageNumber: string;
  url: string;
  title: string;
  width: string;
  path: string;
  badge?: string;
  group?: string;
  status: AppStatus;
  infoLine1: string;
  infoLine2: string;
  infoLine3: string;
  infoLine4: string;
}

export interface TileData {
  img: string;
  title: string;
  author: string;
  cols: number;
  featured: boolean;
}

export interface TaskManagerAppProps {
  user: string;
}
