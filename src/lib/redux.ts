import { createStore } from 'redux';

// The actions are the "names" of the changes that can happen to the store
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK',
};

export interface ReduxProps {
  type: string;
  id: string;
}

// The action creators bundle actions with the data required to execute them
export const archiveTask = (id: string): ReduxProps => ({
  type: actions.ARCHIVE_TASK,
  id,
});
export const pinTask = (id: string): ReduxProps => ({
  type: actions.PIN_TASK,
  id,
});

// All our reducers simply change the state of a single task.
function taskStateReducer(taskState: string) {
  return (state: any, action: ReduxProps) => {
    return {
      ...state,
      tasks: state.tasks.map((task: any) =>
        task.id === action.id ? { ...task, state: taskState } : task
      ),
    };
  };
}

// The reducer describes how the contents of the store change for each action
export const reducer = (state: any, action: ReduxProps): any => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer('TASK_ARCHIVED')(state, action);
    case actions.PIN_TASK:
      return taskStateReducer('TASK_PINNED')(state, action);
    default:
      return state;
  }
};

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

// We export the constructed redux store
export default createStore(reducer, { tasks: defaultTasks });
