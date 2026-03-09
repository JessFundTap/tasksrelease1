import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

const TasksNotification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTasksPage = location.pathname === '/tasks';

  return (
    <button
      onClick={() => navigate('/tasks')}
      className={`relative p-2.5 rounded-full transition-all duration-200 ${
        isTasksPage
          ? 'bg-fundtap-primary/10 text-fundtap-primary'
          : 'text-gray-600 hover:bg-gray-50 hover:text-fundtap-primary'
      }`}
      title="Tasks"
    >
      <CheckSquare size={20} />
      <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-fundtap-secondary rounded-full"></span>
    </button>
  );
};

export default TasksNotification;
