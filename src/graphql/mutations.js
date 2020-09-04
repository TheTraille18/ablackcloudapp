/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $User: String!
    $TaskName: String!
    $TaskRunTime: String!
    $Description: String!
  ) {
    createTask(
      User: $User
      TaskName: $TaskName
      TaskRunTime: $TaskRunTime
      Description: $Description
    ) {
      User
      TaskName
      Description
      DateCreated
      TaskRunTime
      TaskStatus
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask($User: String!, $TaskName: String!) {
    deleteTask(User: $User, TaskName: $TaskName) {
      User
      TaskName
      Description
      DateCreated
      TaskRunTime
      TaskStatus
    }
  }
`;
export const updateTaskStatus = /* GraphQL */ `
  mutation UpdateTaskStatus($User: String!, $TaskName: String!) {
    updateTaskStatus(User: $User, TaskName: $TaskName) {
      User
      TaskName
      Description
      DateCreated
      TaskRunTime
      TaskStatus
    }
  }
`;
