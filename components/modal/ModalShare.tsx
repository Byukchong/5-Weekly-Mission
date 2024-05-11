import React from 'react';
import styles from './modalShare.module.css';
import closeIcon from '@/public/_close.svg';
import kakaoIcon from '@/public/Chat.svg';
import facebookIcon from '@/public/Telegram.svg';
import copylinkIcon from '@/public/More.svg';
import Image from 'next/image';

interface ModalShareProps {
  title: string;
  targetName: string;
  isModalOpen: boolean;
  onClose: (isOpen: boolean) => void;
  currentFolderId: any;
}

const ModalShare: React.FC<ModalShareProps> = ({
  title,
  targetName,
  isModalOpen,
  onClose,
  currentFolderId,
}) => {
  const handleCloseModal = () => {
    onClose(false);
  };

  const handleKakaoShare = () => {
    window.open(
      `https://www.kakaotalk.com?shared/${currentFolderId}`,
      '_blank'
    );
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com?shared/${currentFolderId}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/shared/${currentFolderId}`
    );
    alert('링크가 복사되었습니다.');
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.modal__content__header}>{title}</div>

        <div className={styles.modal__content__body}>{targetName}</div>

        <div className={styles.share__container}>
          <Image
            src={kakaoIcon}
            alt="카카오톡 공유"
            onClick={handleKakaoShare}
          />
          <Image
            src={facebookIcon}
            alt="페이스북 공유"
            onClick={handleFacebookShare}
          />
          <Image src={copylinkIcon} alt="링크 공유" onClick={handleCopyLink} />
        </div>

        <button className={styles.exit_button} onClick={handleCloseModal}>
          <Image src={closeIcon} alt="닫기버튼" />
        </button>
      </div>
    </div>
  );
};

export default ModalShare;
