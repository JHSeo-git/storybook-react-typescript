import React from 'react';

import { ReduxProps } from 'lib/redux';

export interface TaskProp {
  id?: string;
  title?: string;
  state?: string;
  updatedAt?: Date;
}

export interface Props {
  task: TaskProp;
  onArchiveTask: (id: string) => ReduxProps;
  onPinTask: (id: string) => ReduxProps;
}

const Task: React.FC<Props> = ({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}) => {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true}
          name="checked"
        />
        <span
          className="checkbox-custom"
          onClick={() => {
            id && onArchiveTask(id);
          }}
        />
      </label>
      <div className="title">
        <input
          type="text"
          value={title}
          readOnly={true}
          placeholder="Input title"
          style={{ textOverflow: 'ellipsis' }}
        />
      </div>

      <div className="actions" onClick={(event) => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          <a
            onClick={() => {
              id && onPinTask(id);
            }}
          >
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
};

export default Task;
