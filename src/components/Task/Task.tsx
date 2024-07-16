import React from 'react';

interface TaskProps {
  id: string;
  title: string;
  status: boolean;
  onChecked: (id: string) => void;
  onDelete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({id, title, status, onChecked, onDelete}) => {
  return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <input
            type="checkbox"
            checked={status}
            onChange={() => onChecked(id)}
            className="form-check-input me-2"
          />
          <span>{title}</span>
        </div>
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(id)}>Delete</button>
      </li>
    );
};

export default Task;