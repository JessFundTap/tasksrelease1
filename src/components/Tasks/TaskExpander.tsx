import React from 'react';
import { ChevronDown, Check, HelpCircle } from 'lucide-react';

interface TaskExpanderProps {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  isExpanded: boolean;
  isCompleted: boolean;
  isAccessible: boolean;
  isRequired: boolean;
  waitingOnOthers?: boolean;
  waitingStatus?: 'waiting-to-start' | 'in-progress' | 'under-review' | 'completed';
  assignee?: string;
  subtext?: string;
  onToggle: (taskId: string) => void;
  children: React.ReactNode;
  isTransitioning: boolean;
  tooltipContent?: string;
}

const TaskExpander: React.FC<TaskExpanderProps> = ({
  id,
  title,
  icon: Icon,
  isExpanded,
  isCompleted,
  isAccessible,
  isRequired,
  waitingOnOthers = false,
  waitingStatus,
  assignee,
  subtext,
  onToggle,
  children,
  isTransitioning,
  tooltipContent,
}) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState<number | 'auto'>(0);

  React.useEffect(() => {
    if (contentRef.current) {
      if (isExpanded) {
        const updateHeight = () => {
          if (innerRef.current) {
            const newHeight = innerRef.current.getBoundingClientRect().height;
            setContentHeight(Math.ceil(newHeight));
          }
        };

        updateHeight();

        const resizeObserver = new ResizeObserver(() => {
          updateHeight();
        });

        if (innerRef.current) {
          resizeObserver.observe(innerRef.current);
        }

        const mutationObserver = new MutationObserver(() => {
          requestAnimationFrame(updateHeight);
        });

        if (contentRef.current) {
          mutationObserver.observe(contentRef.current, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
          });
        }

        return () => {
          resizeObserver.disconnect();
          mutationObserver.disconnect();
        };
      } else {
        setContentHeight(0);
      }
    }
  }, [isExpanded, children]);

  const handleToggle = () => {
    onToggle(id);
  };

  return (
    <div
      id={`task-${id}`}
      ref={headerRef}
      style={{ overflowAnchor: 'none' }}
      className={`rounded-2xl overflow-hidden transition-all ${
        isTransitioning ? 'duration-500' : 'duration-400'
      } ${
        isExpanded
          ? 'bg-white shadow-soft-lg border border-fundtap-primary/20'
          : 'bg-white shadow-soft border border-fundtap-primary/10 hover:shadow-soft-md hover:border-fundtap-primary/20'
      }`}
    >
      <button
        onClick={handleToggle}
        disabled={isTransitioning}
        className={`w-full px-6 py-4 flex items-center gap-4 transition-all duration-200 group ${
          isTransitioning ? 'cursor-not-allowed' : 'hover-scale cursor-pointer'
        }`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isCompleted
              ? 'bg-gradient-secondary text-white'
              : isExpanded
                ? 'bg-gradient-primary text-white shadow-soft'
                : 'bg-gradient-subtle text-fundtap-primary group-hover:bg-gradient-hover'
          }`}
        >
          {isCompleted ? <Check size={18} /> : <Icon size={18} />}
        </div>

        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-semibold transition-colors text-gray-900">
              {title}
            </h4>
            {tooltipContent && (
              <span className="inline-block group relative flex-shrink-0">
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-help" />
                <div className="absolute left-0 bottom-full mb-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                  <p className="text-xs text-gray-700 leading-relaxed">{tooltipContent}</p>
                  <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
                </div>
              </span>
            )}
          </div>
          {(assignee || subtext) && (
            <p className="text-xs text-gray-500 mt-0.5">{assignee || subtext}</p>
          )}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {isCompleted && (
            <span className="text-xs font-semibold text-fundtap-secondary bg-fundtap-secondary/10 px-2.5 py-1 rounded-lg">Completed</span>
          )}
          {!isCompleted && isExpanded && !waitingOnOthers && (
            <span className="text-xs font-semibold text-fundtap-primary bg-fundtap-light px-2.5 py-1 rounded-lg">In progress</span>
          )}
          {!isCompleted && !isExpanded && !waitingOnOthers && (
            <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">Start</span>
          )}
          {waitingOnOthers && waitingStatus && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
              waitingStatus === 'waiting-to-start' ? 'text-orange-700 bg-orange-100' :
              waitingStatus === 'in-progress' ? 'text-fundtap-primary bg-fundtap-light' :
              waitingStatus === 'under-review' ? 'text-fundtap-primary bg-fundtap-secondary/20' :
              waitingStatus === 'completed' ? 'text-fundtap-secondary bg-fundtap-secondary/10' :
              'text-gray-700 bg-gray-100'
            }`}>
              {waitingStatus === 'waiting-to-start' ? 'Waiting to start' :
               waitingStatus === 'in-progress' ? 'In progress' :
               waitingStatus === 'under-review' ? 'Under review' :
               waitingStatus === 'completed' ? 'Completed' :
               'Start'}
            </span>
          )}
          <ChevronDown
            size={18}
            className={`text-fundtap-primary/40 transition-transform duration-300 group-hover:text-fundtap-primary/60 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      <div
        ref={contentRef}
        style={{
          height: contentHeight === 'auto' ? 'auto' : `${contentHeight}px`,
          transition: isTransitioning ? 'height 600ms cubic-bezier(0.4, 0, 0.2, 1)' : 'height 400ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        className="overflow-hidden origin-top"
      >
        <div ref={innerRef} className="border-t border-fundtap-primary/10 px-6 py-5 bg-gray-50/40">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TaskExpander;
