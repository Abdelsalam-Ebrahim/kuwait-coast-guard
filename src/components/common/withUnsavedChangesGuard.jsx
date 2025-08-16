import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const useUnsavedChanges = (initialData = null, enabled = true) => {
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const initialDataRef = useRef(JSON.stringify(initialData));

  // Update initial data reference when prop changes
  useEffect(() => {
    initialDataRef.current = JSON.stringify(initialData);
    setHasChanges(false);
  }, [initialData]);

  // Check for changes
  const checkForChanges = useCallback((currentData) => {
    if (!enabled) return false;
    
    const currentState = JSON.stringify(currentData);
    const hasDataChanged = currentState !== initialDataRef.current;
    setHasChanges(hasDataChanged);
    return hasDataChanged;
  }, [enabled]);

  // Handle navigation attempts
  const handleNavigationAttempt = useCallback((navigationFn) => {
    if (hasChanges && enabled) {
      setPendingNavigation(() => navigationFn);
      setShowConfirmationModal(true);
    } else {
      navigationFn();
    }
  }, [hasChanges, enabled]);

  // Save changes
  const saveChanges = useCallback((currentData) => {
    initialDataRef.current = JSON.stringify(currentData);
    setHasChanges(false);
  }, []);

  // Confirmation modal handlers
  const handleConfirmSave = useCallback((saveCallback) => {
    if (saveCallback) {
      saveCallback();
    }
    if (pendingNavigation) {
      pendingNavigation();
    }
    setShowConfirmationModal(false);
    setPendingNavigation(null);
  }, [pendingNavigation]);

  const handleConfirmDiscard = useCallback(() => {
    setHasChanges(false);
    if (pendingNavigation) {
      pendingNavigation();
    }
    setShowConfirmationModal(false);
    setPendingNavigation(null);
  }, [pendingNavigation]);

  const handleConfirmCancel = useCallback(() => {
    setShowConfirmationModal(false);
    setPendingNavigation(null);
  }, []);

  // Reset changes
  const resetChanges = useCallback(() => {
    setHasChanges(false);
    setShowConfirmationModal(false);
    setPendingNavigation(null);
  }, []);

  return {
    hasChanges,
    showConfirmationModal,
    checkForChanges,
    handleNavigationAttempt,
    saveChanges,
    handleConfirmSave,
    handleConfirmDiscard,
    handleConfirmCancel,
    resetChanges,
    setShowConfirmationModal
  };
};

/**
 * Higher-order component to handle unsaved changes detection for routing
 * @param {React.Component} WrappedComponent - The component to wrap
 * @returns {React.Component} - Enhanced component with unsaved changes detection
 */
const withUnsavedChangesGuard = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const {
      hasChanges,
      handleNavigationAttempt,
      resetChanges
    } = useUnsavedChanges();

    useEffect(() => {
      const handleBeforeUnload = (event) => {
        if (hasChanges) {
          event.preventDefault();
          event.returnValue = '';
          return '';
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [hasChanges]);

    // Reset changes when component unmounts
    useEffect(() => {
      return () => {
        resetChanges();
      };
    }, [resetChanges]);

    // Create navigation interceptor
    const interceptedNavigate = (to, options = {}) => {
      const navigationFn = () => navigate(to, options);
      handleNavigationAttempt(navigationFn);
    };

    return (
      <WrappedComponent
        {...props}
        navigate={interceptedNavigate}
        onNavigationAttempt={handleNavigationAttempt}
      />
    );
  };
};

export default withUnsavedChangesGuard;

// Export the hook separately for direct use in components
export { useUnsavedChanges };
