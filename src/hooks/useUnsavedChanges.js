import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to handle unsaved changes detection and confirmation modal
 * @param {any} initialData - The initial data to track changes against
 * @param {boolean} enabled - Whether to enable unsaved changes detection
 * @returns {object} - Object containing state and handlers for unsaved changes
 */
const useUnsavedChanges = (initialData = null, enabled = true) => {
  const [currentData, setCurrentData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const initialDataRef = useRef(JSON.stringify(initialData));

  // Update current data and initial reference when prop changes
  useEffect(() => {
    setCurrentData(initialData);
    initialDataRef.current = JSON.stringify(initialData);
    setHasChanges(false);
  }, [JSON.stringify(initialData)]); // Use JSON.stringify to avoid infinite re-renders

  // Check for changes whenever currentData changes
  useEffect(() => {
    if (!enabled) return;
    
    const currentState = JSON.stringify(currentData);
    const hasDataChanged = currentState !== initialDataRef.current;
    setHasChanges(hasDataChanged);
  }, [currentData, enabled]);

  // Update current data
  const updateData = useCallback((newData) => {
    setCurrentData(newData);
  }, []);

  // Handle save changes
  const saveChanges = useCallback((onSave) => {
    if (onSave) {
      onSave(currentData);
    }
    initialDataRef.current = JSON.stringify(currentData);
    setHasChanges(false);
  }, [currentData]);

  // Handle navigation attempts
  const handleNavigationAttempt = useCallback((navigationFn) => {
    if (hasChanges && enabled) {
      setPendingNavigation(() => navigationFn);
      setShowConfirmationModal(true);
    } else {
      navigationFn();
    }
  }, [hasChanges, enabled]);

  // Confirmation modal handlers
  const handleConfirmSave = useCallback((onSave) => {
    saveChanges(onSave);
    if (pendingNavigation) {
      pendingNavigation();
    }
    setShowConfirmationModal(false);
    setPendingNavigation(null);
  }, [saveChanges, pendingNavigation]);

  const handleConfirmDiscard = useCallback(() => {
    setCurrentData(JSON.parse(initialDataRef.current));
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
    // Don't clear the navigation handler here - keep it for future navigation attempts
  }, []);

  // Reset changes
  const resetChanges = useCallback(() => {
    setCurrentData(JSON.parse(initialDataRef.current));
    setHasChanges(false);
    setShowConfirmationModal(false);
    setPendingNavigation(null);
  }, []);

  // Get changes data for preview
  const getChangesData = useCallback((compareFunction) => {
    if (!compareFunction) return null;
    
    const originalData = JSON.parse(initialDataRef.current);
    return compareFunction(originalData, currentData);
  }, [currentData]);

  // Expose navigation check to parent component
  const exposeNavigationHandler = useCallback((onNavigateAway) => {
    if (onNavigateAway) {
      onNavigateAway(handleNavigationAttempt);
    }
  }, [handleNavigationAttempt]);

  // Clear navigation handler
  const clearNavigationHandler = useCallback((onNavigateAway) => {
    if (onNavigateAway) {
      onNavigateAway(null);
    }
  }, []);

  return {
    currentData,
    hasChanges,
    showConfirmationModal,
    updateData,
    saveChanges,
    handleNavigationAttempt,
    handleConfirmSave,
    handleConfirmDiscard,
    handleConfirmCancel,
    resetChanges,
    getChangesData,
    exposeNavigationHandler,
    clearNavigationHandler,
    setShowConfirmationModal
  };
};

export default useUnsavedChanges;
