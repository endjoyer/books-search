'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../redux/actions';
import styles from './ErrorModal.module.css';

const ErrorModal = () => {
  const error = useSelector((state: { error: any }) => state.error);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearError());
  };

  if (!error) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2>Error</h2>
        <p>{error}</p>
        <button className={styles.close} onClick={handleClose}>
          ✖
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
