import React from 'react';
import styles from '@styles/ChatSummaryRight.module.scss';
export default function ButtonTool() {
  return (
    <div className={styles.functionList}>
      <div className={styles.functionItem}>
        <p>Settings</p>
      </div>

      <div className={styles.functionItem}>
        <p>Leave the chat</p>
      </div>
    </div>
  );
}
