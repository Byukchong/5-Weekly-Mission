import React, { useState } from 'react';
import styles from './modalAddToFolder.module.css';
import closeIcon from '@/public/_close.svg';
import Image from 'next/image';

interface ModalAddToFolderProps {
  title: string;
  targetName: string;
  isModalOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

const ModalAddToFolder: React.FC<ModalAddToFolderProps> = ({
  title,
  targetName,
  isModalOpen,
  onClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(''); // 선택된 옵션을 상태로 관리합니다.

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleCloseModal = () => {
    onClose(false);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.modal__content__header}>{title}</div>

        <div className={styles.modal__content__body}>{targetName}</div>

        <div className={styles.option__container}>
          <button
            className={`${styles.options} ${
              selectedOption === '코딩팁' ? styles.selected : ''
            }`}
            onClick={() => handleOptionClick('코딩팁')}
          >
            <p>코딩팁</p> <span>7개 링크</span>
          </button>
          <button
            className={`${styles.options} ${
              selectedOption === '채용 사이트' ? styles.selected : ''
            }`}
            onClick={() => handleOptionClick('채용 사이트')}
          >
            <p>채용 사이트</p> <span>12개 링크</span>
          </button>
          <button
            className={`${styles.options} ${
              selectedOption === '유용한글' ? styles.selected : ''
            }`}
            onClick={() => handleOptionClick('유용한글')}
          >
            <p>유용한글</p> <span>30개 링크</span>
          </button>
          <button
            className={`${styles.options} ${
              selectedOption === '나만의 장소' ? styles.selected : ''
            }`}
            onClick={() => handleOptionClick('나만의 장소')}
          >
            <p>나만의 장소</p> <span>3개 링크</span>
          </button>
        </div>
        <button className={styles.action__button}>추가하기</button>

        <button className={styles.exit_button} onClick={handleCloseModal}>
          <Image src={closeIcon} alt="닫기버튼" />
        </button>
      </div>
    </div>
  );
};

export default ModalAddToFolder;
