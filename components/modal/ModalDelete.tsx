import React from 'react';
import closeIcon from '@/public/_close.svg';
import styles from './modalDelete.module.css';
import Image from 'next/image';

interface ModalDeleteProps {
  title: string;
  DeleteName: string;
  onClose: (isOpen: boolean) => void;
  isModalOpen: boolean;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  title,
  DeleteName,
  onClose,
  isModalOpen,
}) => {
  const handleCloseModal = () => {
    onClose(false);
  };

  return (
    <div className={`${styles.modal} ${isModalOpen ? styles.show : ''}`}>
      <div className={styles.modal__content}>
        <div className={styles.modal__content__header}>{title}</div>

        <div className={styles.modal__content__body}>{DeleteName}</div>
        <button className={styles.delete__action__button}>삭제하기</button>

        <button className={styles.exit_button} onClick={handleCloseModal}>
          <Image src={closeIcon} alt="닫기버튼" />
        </button>
      </div>
    </div>
  );
};

export default ModalDelete;
