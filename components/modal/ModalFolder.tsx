import React from 'react';
import styles from './modalFolder.module.css';
import closeIcon from '@/public/_close.svg';
import Image from 'next/image';

interface ModalFolderProps {
  title: string;
  folderName: string;
  buttonName: string;
  onClose: (isOpen: boolean) => void;
  isModalOpen: boolean;
}

const ModalFolder: React.FC<ModalFolderProps> = ({
  title,
  folderName,
  buttonName,
  onClose,
  isModalOpen,
}) => {
  const handleCloseModal = () => {
    onClose(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.modal__content__header}>{title}</div>

        <div className={styles.modal__content__body}>
          <input placeholder="내용 입력" value={folderName} />
        </div>
        <button className={styles.actionButton}>{buttonName}</button>

        <button className={styles.exit_button} onClick={handleCloseModal}>
          <Image src={closeIcon} alt="닫기버튼" />
        </button>
      </div>
    </div>
  );
};

export default ModalFolder;
