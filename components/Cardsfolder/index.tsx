import { useFetch } from '@/hooks/useFetch';
import { formatDate, generateTimeText } from '../../hooks/date';
import thumbnail from '@/public/thumbnail.svg';
import styles from '@/components/Cardsfolder/index.module.css';
import starticon from '@/public/staricon.svg';
import moreoptionicon from '@/public/moreoptionicon.svg';
import { useState } from 'react';
import ModalFolder from '@/components/modal/ModalFolder';
import ModalDelete from '@/components/modal/ModalDelete';
import Image from 'next/image';

interface Link {
  id: string;
  url: string;
  image_source?: string; // 이미지 소스는 옵셔널
  title: string;
  created_at: Date;
  description: string;
}

function Cardsfolder({ url }: { url: string }) {
  // props를 비구조화 할당하여 사용
  const cardData = useFetch<{ data: Link[] }>(url);
  const [hoverStates, setHoverStates] = useState<boolean[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [popoverStates, setPopoverStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedCardDescription, setSelectedCardDescription] =
    useState<string>('');

  const handleMouseOver = (index: number) => {
    setHoverStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = true;
      return updatedStates;
    });
  };

  const handleMouseOut = (index: number) => {
    setHoverStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const handleClickButton = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDeleteClickButton = (linkDescription: string) => {
    setIsModalDeleteOpen(true);
    setSelectedCardDescription(linkDescription);
  };

  const handleOptionButtonClick = (linkId: string, linkDescription: string) => {
    setPopoverStates((prevState) => ({
      ...prevState,
      [linkId]: !prevState[linkId],
    }));
    setSelectedCardDescription(linkDescription);
  };

  const handleFavoriteButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
  };

  if (!cardData) {
    return null;
  }

  return (
    <div className={styles.card_grid_container}>
      {cardData.data.length ? (
        cardData.data.map((link, index) => (
          <div
            className={`${styles.card_container} ${
              hoverStates[index] ? styles.isHovering : ''
            }`}
            key={link.id}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={() => handleMouseOut(index)}
          >
            <a href={link.url}>
              <div className={styles.card}>
                <div className={styles.card_img_div}>
                  {link.image_source ? (
                    <img
                      src={link.image_source}
                      className={styles.card_img}
                      alt={link.title}
                    />
                  ) : (
                    <Image
                      width="320"
                      height="200"
                      src={thumbnail}
                      className={styles.card_img}
                      alt={link.title}
                    />
                  )}
                </div>
                <div className={styles.card_txt_div}>
                  <div className={styles.card_txt_div_top}>
                    <p className={styles.left_time_p}>
                      {generateTimeText(link.created_at)}
                    </p>
                  </div>
                  <div className={styles.card_txt_div_body}>
                    <p className={styles.card_txt_div_body}>
                      {link.description}
                    </p>
                  </div>
                  <div className={styles.card_txt_date}>
                    {formatDate(link.created_at)}
                  </div>
                </div>
              </div>
            </a>
            <button
              className={styles.card_moreoption_icon}
              onClick={() => handleOptionButtonClick(link.id, link.description)}
            >
              <Image src={moreoptionicon} alt="링크 게시물 옵션 버튼 아이콘 " />
            </button>
            {popoverStates[link.id] && (
              <div className={styles.popover}>
                <div className={styles.options}>
                  <button
                    onClick={() => handleDeleteClickButton(link.description)}
                  >
                    삭제하기
                  </button>
                </div>
                <div className={styles.options}>
                  <button onClick={handleClickButton}>폴더에 추가</button>
                </div>
              </div>
            )}
            <button
              className={styles.card_favorite_icon}
              onClick={handleFavoriteButtonClick}
            >
              <Image src={starticon} alt="즐겨찾기 별 아이콘" />
            </button>
          </div>
        ))
      ) : (
        <div className={styles.noLinkText}>
          <p>저장된 링크가 없습니다</p>
        </div>
      )}
      {isModalOpen && (
        <ModalFolder
          title={'폴더 추가'}
          folderName={''}
          buttonName={'추가하기'}
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
        />
      )}
      {isModalDeleteOpen && (
        <ModalDelete
          title={'링크 삭제'}
          DeleteName={selectedCardDescription}
          onClose={handleCloseDeleteModal}
          isModalOpen={isModalDeleteOpen}
        />
      )}
    </div>
  );
}

export default Cardsfolder;
