import React, { useRef, useEffect } from 'react';
import { Check, Circle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  isCompleted?: boolean;
}

interface ProgressMenuProps {
  tasks: Task[];
  activeTaskId: string;
  currentFlowIndex: number;
  onTaskClick: (taskId: string) => void;
}

const ProgressMenu: React.FC<ProgressMenuProps> = ({
  tasks,
  activeTaskId,
  currentFlowIndex,
  onTaskClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTaskRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeTaskRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeTask = activeTaskRef.current;
      const containerWidth = container.clientWidth;
      const taskWidth = activeTask.clientWidth;
      const taskLeft = activeTask.offsetLeft;

      const scrollLeft = taskLeft - (containerWidth / 2) + (taskWidth / 2);
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth',
      });
    }
  }, [activeTaskId]);

  return (
    <div className="w-full bg-white border-b border-fundtap-primary/10 px-4 sm:px-6 lg:px-8 py-4 overflow-hidden">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-bold text-fundtap-primary uppercase tracking-wider">
          Progress
        </span>
        <span className="text-xs font-semibold text-gray-700">
          {currentFlowIndex + 1} of {tasks.length}
        </span>
      </div>

      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
      >
        {tasks.map((task, index) => {
          const isCompleted =
            task.isCompleted !== undefined
              ? task.isCompleted
              : index < currentFlowIndex;
          const isActive = task.id === activeTaskId;

          return (
            <button
              key={task.id}
              ref={isActive ? activeTaskRef : null}
              onClick={() => onTaskClick(task.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap text-xs font-semibold transition-all duration-200 flex-shrink-0 hover-scale ${
                isActive
                  ? 'bg-gradient-primary text-white shadow-soft-md'
                  : isCompleted
                    ? 'bg-fundtap-secondary/10 text-fundtap-secondary hover:bg-fundtap-secondary/20 border border-fundtap-secondary/20'
                    : 'bg-gray-100/60 text-gray-600 hover:bg-gradient-subtle border border-gray-200/50'
              }`}
            >
              <div className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0">
                {isCompleted ? (
                  <Check className="w-2 h-2" />
                ) : (
                  <Circle className="w-2 h-2" />
                )}
              </div>
              <span className="hidden sm:inline">{task.title}</span>
              <span className="sm:hidden text-xs">{index + 1}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-secondary transition-all duration-500 ease-out shadow-soft"
          style={{
            width: `${((currentFlowIndex + 1) / tasks.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressMenu;
