import React, { useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Building2, CreditCard, FileText, DollarSign, Briefcase, Users, ShieldCheck } from 'lucide-react';
import Navigation from '../components/Navigation/Navigation';
import TasksSection from '../components/TasksSection/TasksSection';
import AboutBusinessForm from '../components/Tasks/AboutBusinessForm';
import VerifyIDForm from '../components/Tasks/VerifyIDForm';
import RoleForm from '../components/Tasks/RoleForm';
import BusinessDetailsForm from '../components/Tasks/BusinessDetailsForm';
import BankDetailsForm from '../components/Tasks/BankDetailsForm';
import TrustDetailsForm from '../components/Tasks/TrustDetailsForm';
import ShareholdingCompanyDetailsForm from '../components/Tasks/ShareholdingCompanyDetailsForm';
import FinancialPositionForm from '../components/Tasks/FinancialPositionForm';
import AgreementsForm from '../components/Tasks/AgreementsForm';
import PersonalGuaranteeForm from '../components/Tasks/PersonalGuaranteeForm';
import IDVerificationWaitingTask from '../components/Tasks/IDVerificationWaitingTask';
import { useTaskVisibility } from '../contexts/TaskVisibilityContext';

/**
 * TasksPage - Central hub for all onboarding tasks
 * 
 * This page manages the task flow and displays individual task components.
 * 
 * To add a new task:
 * 1. Create a new component in src/components/Tasks/ (e.g., NewTaskForm.tsx)
 * 2. Import the component at the top of this file
 * 3. Add the task to the todoTasks array below with:
 *    - id: unique identifier
 *    - title: display name
 *    - description: brief description
 *    - icon: Lucide React icon
 *    - component: your task component
 * 
 * The task component should accept onNext, onPrevious, and optionally onSkip props.
 */
const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const { shouldShowTrustTask, getTrustName, shouldShowShareholdingCompanyTask, getShareholdingCompanyName, shouldShowVerifyIdentityTask, shouldShowPropertyDetailsTask, shouldShowAgreementsTask, shouldShowVerifyIdentityWaiting, shouldShowAgreementsWaiting } = useTaskVisibility();
  const [activeTaskId, setActiveTaskId] = React.useState('about-business');
  const [currentFlowTaskIndex, setCurrentFlowTaskIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [formValidationState, setFormValidationState] = React.useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    const taskIds = ['about-business', 'role', 'verify', 'company', 'financial', 'trust', 'shareholding-company', 'bank', 'agreements', 'id-verification-waiting', 'agreements-waiting'];
    taskIds.forEach(id => {
      initialState[id] = false;
    });
    return initialState;
  });

  const accountStatus: 'likely_eligible' | 'in_review' | 'active' = 'likely_eligible';

  /**
   * CRITICAL: DO NOT MODIFY THIS SCROLL LOGIC
   *
   * Custom smooth scroll implementation for accordion task transitions.
   * This provides a slow, elegant scroll animation when moving between tasks.
   *
   * Key requirements:
   * - Duration: 1000ms (1 second) for smooth, gentle scrolling
   * - Easing: cubic easing (easeInOutCubic) for natural acceleration/deceleration
   * - Positioning: Task header appears at 25% from top of viewport
   * - This ensures BOTH the completed task and new task are visible
   *
   * Why this matters:
   * - Users need visual continuity to understand task progression
   * - Seeing the completed task + new task builds confidence
   * - Slow, smooth animation feels premium and reduces cognitive load
   *
   * @param targetY - The Y coordinate to scroll to
   * @param duration - Duration of scroll animation in milliseconds (default: 800ms, actual usage: 1000ms)
   */
  const smoothScrollTo = (targetY: number, duration: number = 800) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const scroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  const allTasks = [
    {
      id: 'about-business',
      title: 'About Your Business',
      isRequired: true,
      icon: Briefcase,
      component: AboutBusinessForm,
    },
    {
      id: 'role',
      title: 'Your Role',
      isRequired: true,
      icon: Users,
      component: RoleForm,
    },
    {
      id: 'verify',
      title: 'Verify Identity',
      isRequired: true,
      icon: UserCheck,
      component: VerifyIDForm,
    },
    {
      id: 'company',
      title: 'People in the Business',
      isRequired: true,
      icon: Building2,
      component: BusinessDetailsForm,
    },
    {
      id: 'financial',
      title: 'Property Details',
      isRequired: true,
      icon: DollarSign,
      component: FinancialPositionForm,
      conditional: true,
    },
    {
      id: 'trust',
      title: 'Trust Details',
      isRequired: true,
      icon: FileText,
      component: TrustDetailsForm,
      conditional: true,
    },
    {
      id: 'shareholding-company',
      title: 'Supporting Company Details',
      isRequired: true,
      icon: Building2,
      component: ShareholdingCompanyDetailsForm,
      conditional: true,
    },
    {
      id: 'bank',
      title: 'Funding and Repayments',
      isRequired: true,
      icon: CreditCard,
      component: BankDetailsForm,
    },
    {
      id: 'agreements',
      title: 'What You Agree To',
      isRequired: true,
      icon: FileText,
      component: AgreementsForm,
      conditional: true,
    },
    {
      id: 'id-verification-waiting',
      title: 'Verify Identity',
      isRequired: false,
      waitingOnOthers: true,
      assignee: 'Director 1',
      icon: ShieldCheck,
      component: IDVerificationWaitingTask,
      conditional: true,
    },
    {
      id: 'agreements-waiting',
      title: 'What You Agree To',
      isRequired: false,
      waitingOnOthers: true,
      assignee: 'Director 1',
      icon: FileText,
      component: PersonalGuaranteeForm,
      conditional: true,
    }
  ];

  const todoTasks = useMemo(() => {
    const showTrust = shouldShowTrustTask();
    const trustName = getTrustName();
    const showShareholdingCompany = shouldShowShareholdingCompanyTask();
    const shareholdingCompanyName = getShareholdingCompanyName();
    const showVerifyIdentity = shouldShowVerifyIdentityTask();
    const showPropertyDetails = shouldShowPropertyDetailsTask();
    const showAgreements = shouldShowAgreementsTask();
    const showVerifyIdentityWaiting = shouldShowVerifyIdentityWaiting();
    const showAgreementsWaiting = shouldShowAgreementsWaiting();

    return allTasks.filter(task => {
      if (task.id === 'trust') {
        return showTrust;
      }
      if (task.id === 'shareholding-company') {
        return showShareholdingCompany;
      }
      if (task.id === 'verify') {
        return showVerifyIdentity;
      }
      if (task.id === 'financial') {
        return showPropertyDetails;
      }
      if (task.id === 'agreements') {
        return showAgreements;
      }
      if (task.id === 'id-verification-waiting') {
        return showVerifyIdentityWaiting;
      }
      if (task.id === 'agreements-waiting') {
        return showAgreementsWaiting;
      }
      return true;
    }).map(task => {
      if (task.id === 'trust' && trustName) {
        return {
          ...task,
          subtext: trustName
        };
      }
      if (task.id === 'shareholding-company' && shareholdingCompanyName) {
        return {
          ...task,
          subtext: shareholdingCompanyName
        };
      }
      return task;
    });
  }, [shouldShowTrustTask, getTrustName, shouldShowShareholdingCompanyTask, getShareholdingCompanyName, shouldShowVerifyIdentityTask, shouldShowPropertyDetailsTask, shouldShowAgreementsTask, shouldShowVerifyIdentityWaiting, shouldShowAgreementsWaiting]);


  /**
   * CRITICAL: DO NOT MODIFY THIS SCROLL BEHAVIOR
   *
   * Handles progression to the next task with smooth scrolling animation.
   *
   * Timing breakdown:
   * 1. State updates happen immediately (setIsTransitioning, setCurrentFlowTaskIndex, setActiveTaskId)
   * 2. 400ms delay before scroll calculation (allows accordion to start expanding)
   * 3. 1000ms smooth scroll animation (slow, elegant movement)
   * 4. 1200ms before clearing transition state (accounts for scroll duration)
   *
   * Scroll positioning:
   * - viewportHeight * 0.25 = Position header at 25% from top
   * - This shows the completed task above AND the new task opening below
   * - Creates visual continuity and user confidence in progression
   *
   * DO NOT change these timing values or positioning calculations.
   */
  const handleNextTask = async () => {
    const currentIndex = todoTasks.findIndex(task => task.id === activeTaskId);
    const newFlowIndex = currentIndex + 1;

    if (currentIndex < todoTasks.length - 1) {
      const nextTaskId = todoTasks[newFlowIndex].id;

      setIsTransitioning(true);
      setCurrentFlowTaskIndex(newFlowIndex);
      setActiveTaskId(nextTaskId);

      setTimeout(() => {
        const nextTaskHeader = document.getElementById(`task-${nextTaskId}`);
        if (nextTaskHeader) {
          const headerRect = nextTaskHeader.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollOffset = headerRect.top + window.scrollY - (viewportHeight * 0.25);

          smoothScrollTo(scrollOffset, 1000);
        }
        setTimeout(() => {
          setIsTransitioning(false);
        }, 1200);
      }, 400);

    } else {
      navigate('/', { state: { onboardingComplete: true } });
    }
  };

  const handlePreviousTask = () => {
    const currentIndex = todoTasks.findIndex(task => task.id === activeTaskId);
    if (currentIndex > 0) {
      setActiveTaskId(todoTasks[currentIndex - 1].id);
    }
  };

  const handleTaskClick = (taskId: string) => {
    if (isTransitioning) return;

    if (activeTaskId === taskId) {
      setActiveTaskId('');
    } else {
      setActiveTaskId(taskId);
      setTimeout(() => {
        const taskHeader = document.getElementById(`task-${taskId}`);
        if (taskHeader) {
          const headerRect = taskHeader.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollOffset = headerRect.top + window.scrollY - (viewportHeight * 0.25);

          smoothScrollTo(scrollOffset, 1000);
        }
      }, 400);
    }
  };

  const isFormReadOnly = (task: any) => {
    return todoTasks.findIndex(t => t.id === activeTaskId) < currentFlowTaskIndex;
  };

  const handleContinueClick = () => {
    const currentTask = todoTasks.find(task => task.id === activeTaskId);
    if (isFormReadOnly(currentTask)) return;

    const isValid = formValidationState[activeTaskId] === true;
    if (!isValid) return;

    handleNextTask();
  };

  const handleFormValidationChange = (taskId: string, isValid: boolean) => {
    setFormValidationState(prev => ({
      ...prev,
      [taskId]: isValid
    }));
  };

  const getContinueButtonText = () => {
    const currentTask = todoTasks.find(task => task.id === activeTaskId);
    if (isFormReadOnly(currentTask)) {
      return 'View';
    }
    return 'Continue';
  };

  const getContinueButtonClass = () => {
    const baseClass = "px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 shadow-soft hover:shadow-soft-md";

    const currentTask = todoTasks.find(task => task.id === activeTaskId);
    const isContinueButtonDisabled = isFormReadOnly(currentTask);

    if (isContinueButtonDisabled) {
      return `${baseClass} bg-gray-400 text-white opacity-75 cursor-not-allowed`;
    }

    return `${baseClass} bg-fundtap-primary text-white hover:bg-fundtap-primary-light`;
  };

  const activeTask = todoTasks.find(task => task.id === activeTaskId);
  const activeTaskTitle = activeTask?.title || '';
  const ActiveTaskIcon = activeTask?.icon;
  const ActiveComponent = todoTasks.find(task => task.id === activeTaskId)?.component;

  const getStatusMessage = () => {
    switch (accountStatus) {
      case 'likely_eligible':
        return 'Based on what we know so far, your business looks like a good fit. Complete these steps to confirm approval and start funding invoices.';
      case 'in_review':
        return 'Your application is under review. Completing the steps below can help speed things up.';
      case 'active':
        return 'Your account is set up. If new steps appear here in future, they\'ll be required to keep funding available.';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-2xl mx-auto px-4 py-6 sm:px-6" style={{ overflowAnchor: 'none' }}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finalise Your Setup</h1>
          <p className="text-gray-600 mb-4">Complete the required steps below to confirm access to funding. Your progress saves automatically. You can return at any time.</p>
        </div>
        <TasksSection
          tasks={todoTasks}
          activeTaskId={activeTaskId}
          currentFlowIndex={currentFlowTaskIndex}
          activeTaskTitle={activeTaskTitle}
          ActiveComponent={ActiveComponent}
          onTaskClick={handleTaskClick}
          onContinueClick={handleContinueClick}
          onPreviousClick={handlePreviousTask}
          isFormReadOnly={isFormReadOnly(
            todoTasks.find((task) => task.id === activeTaskId)
          )}
          continueButtonText={getContinueButtonText()}
          continueButtonDisabled={
            isFormReadOnly(todoTasks.find((task) => task.id === activeTaskId)) ||
            formValidationState[activeTaskId] !== true
          }
          isTransitioning={isTransitioning}
          onFormValidationChange={handleFormValidationChange}
        />
      </main>

      <footer className="max-w-2xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-gray-600 border-t border-fundtap-primary/10 mt-12">
        <a href="mailto:info@fundtap.co" className="hover:text-fundtap-primary transition-colors duration-200 font-medium">
          Need help? info@fundtap.co
        </a>
      </footer>
    </div>
  );
};

export default TasksPage;