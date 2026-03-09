import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import TaskExpander from '../Tasks/TaskExpander';
import { ChevronRight } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
  isRequired: boolean;
  waitingOnOthers?: boolean;
  assignee?: string;
  subtext?: string;
  tooltipContent?: string;
}

interface TasksSectionProps {
  tasks: Task[];
  activeTaskId: string;
  currentFlowIndex: number;
  activeTaskTitle: string;
  ActiveComponent: React.ComponentType<any> | undefined;
  onTaskClick: (taskId: string) => void;
  onContinueClick: () => void;
  onPreviousClick: () => void;
  isFormReadOnly: boolean;
  continueButtonText: string;
  continueButtonDisabled: boolean;
  isTransitioning: boolean;
  onFormValidationChange?: (taskId: string, isValid: boolean) => void;
}

const TasksSection: React.FC<TasksSectionProps> = ({
  tasks,
  activeTaskId,
  currentFlowIndex,
  ActiveComponent,
  onTaskClick,
  onContinueClick,
  isFormReadOnly,
  continueButtonText,
  continueButtonDisabled,
  isTransitioning,
  onFormValidationChange,
}) => {
  const requiredTasks = tasks.filter(t => t.isRequired);
  const optionalTasks = tasks.filter(t => !t.isRequired);
  const completedCount = currentFlowIndex;

  const renderTaskSection = (sectionTasks: Task[], sectionTitle: string, isCompleted: boolean) => {
    if (sectionTasks.length === 0) return null;

    return (
      <div key={sectionTitle} className="space-y-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">{sectionTitle}</h3>
        <div className="space-y-3" style={{ overflowAnchor: 'none' }}>
          {sectionTasks.map((task, index) => {
            const taskIndex = tasks.findIndex(t => t.id === task.id);
            const taskCompleted = taskIndex < completedCount;
            const taskAccessible = taskCompleted || task.id === activeTaskId;
            const isExpanded = task.id === activeTaskId;

            return (
              <TaskExpander
                key={task.id}
                id={task.id}
                title={task.title}
                icon={task.icon}
                isExpanded={isExpanded}
                isCompleted={taskCompleted}
                isAccessible={taskAccessible}
                isRequired={task.isRequired}
                waitingOnOthers={task.waitingOnOthers || false}
                waitingStatus={task.waitingOnOthers ? 'waiting-to-start' : undefined}
                assignee={task.assignee}
                subtext={task.subtext}
                onToggle={onTaskClick}
                isTransitioning={isTransitioning}
                tooltipContent={task.tooltipContent}
              >
                <div className="space-y-4">
                  {task.waitingOnOthers && isExpanded && (
                    <div className="bg-fundtap-light border border-fundtap-secondary/30 rounded-lg px-4 py-3 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-fundtap-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-fundtap-primary text-xs font-bold">i</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-fundtap-primary mb-1">Sent to: John Smith (john@democompany.com)</p>
                          <p className="text-sm text-gray-700">
                            This step was sent on Jan 15, 2024. They'll need to provide the required information before you can proceed.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {ActiveComponent && isExpanded && (
                    <ActiveComponent
                      key={activeTaskId}
                      readOnly={isFormReadOnly || task.waitingOnOthers}
                      onValidationChange={(isValid: boolean) => onFormValidationChange?.(activeTaskId, isValid)}
                    />
                  )}

                  {isExpanded && task.waitingOnOthers && (
                    <div className="border-t border-fundtap-primary/10 pt-5 mt-6">
                      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
                        <div className="text-sm text-gray-600">
                          <p>Need to follow up? Send a reminder to John Smith.</p>
                        </div>
                        <button
                          onClick={() => {
                            // TODO: Implement actual reminder functionality
                            alert('Reminder sent to John Smith! They will receive an email notification.');
                          }}
                          className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-soft hover:shadow-soft-md bg-gradient-primary text-white hover:bg-gradient-primary hover:shadow-soft-lg active:scale-95 self-start sm:self-auto"
                        >
                          Send reminder
                          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}

                  {isExpanded && !isFormReadOnly && !task.waitingOnOthers && (
                    <div className="border-t border-fundtap-primary/10 pt-5 flex justify-end">
                      <button
                        onClick={onContinueClick}
                        disabled={continueButtonDisabled}
                        className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 shadow-soft hover:shadow-soft-md ${
                          continueButtonDisabled
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-primary text-white hover:bg-gradient-primary hover:shadow-soft-lg active:scale-95'
                        }`}
                      >
                        {continueButtonText}
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}
                </div>
              </TaskExpander>
            );
          })}
        </div>
      </div>
    );
  };

  const hasNoRequiredTasks = requiredTasks.length === 0;
  const hasNoTasksAtAll = tasks.length === 0;

  return (
    <div className="space-y-8" style={{ overflowAnchor: 'none' }}>
      {hasNoTasksAtAll ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">You're All Set</h3>
          <p className="text-gray-600">There are no steps to complete right now.</p>
        </div>
      ) : hasNoRequiredTasks ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">There Are No Required Steps Right Now</h3>
          <p className="text-gray-600">We'll notify you if anything else is needed.</p>
        </div>
      ) : (
        <>
          {renderTaskSection(requiredTasks, 'Required steps', false)}
          {renderTaskSection(optionalTasks, 'Waiting on others', false)}
        </>
      )}
    </div>
  );
};

export { TasksSection as default };
