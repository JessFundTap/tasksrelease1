import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
}

interface TasksMenuProps {
  onTaskClick?: (taskId: string) => void;
  tasks?: Task[];
  currentFlowIndex?: number;
}

const TasksMenu: React.FC<TasksMenuProps> = ({ onTaskClick, tasks, currentFlowIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // If no tasks provided, render a simple link to tasks page
  if (!tasks || !onTaskClick) {
    return (
      <button
        onClick={() => navigate('/tasks')}
        className="p-2 text-gray-600 hover:text-fundtap-primary bg-gradient-subtle hover:bg-gradient-hover rounded-xl transition-all duration-200 flex items-center gap-1 border border-fundtap-primary/10"
      >
        <div className="relative">
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-fundtap-secondary rounded-full"></span>
          <span className="text-xs font-medium">Tasks</span>
        </div>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-fundtap-primary bg-gradient-subtle hover:bg-gradient-hover rounded-xl transition-all duration-200 flex items-center gap-1 border border-fundtap-primary/10"
      >
        <div className="relative">
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-fundtap-secondary rounded-full"></span>
          <span className="text-xs font-medium">Tasks</span>
        </div>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft-lg z-50 border border-fundtap-primary/5 overflow-hidden">
          <div className="py-2">
            {tasks.map((task) => {
              const Icon = task.icon;
              return (
                <button
                  key={task.id}
                  onClick={() => {
                    onTaskClick(task.id);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 transition-all hover:bg-gradient-subtle text-gray-700 hover:text-fundtap-primary"
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium line-clamp-1">{task.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksMenu;