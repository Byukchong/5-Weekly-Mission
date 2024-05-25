import { useFetch } from '@/hooks/useFetch';
import { formatDate, generateTimeText } from '../../utils/date';
import thumbnail from '@/public/thumbnail.svg';
import styles from '@/components/FolderCards/index.module.css';
import starticon from '@/public/staricon.svg';
import moreoptionicon from '@/public/moreoptionicon.svg';
import { useState } from 'react';
import ModalFolder from '@/components/modal/ModalFolder';
import ModalDelete from '@/components/modal/ModalDelete';
import { CardData } from '@/types/folder-type';
import Image from 'next/image';
import Link from 'next/link';

// function FolderCards({ url }: { url: string }) {
function FolderCards({ cards: cardData }: { cards: CardData[] }) {
  // const card = useFetch<{ data: Link[] }>(url);
  // const cardData = card?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [popoverStates, setPopoverStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedCardDescription, setSelectedCardDescription] =
    useState<string>('');

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsModalDeleteOpen(false);
  };

  const handleClickButton = () => {
    setIsModalOpen((prev) => !prev);
    setIsModalDeleteOpen(false);
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

  return (
    <div className={styles.card_grid_container}>
      {!cardData.length ? (
        <div className={styles.noLinkText}>
          <p>저장된 링크가 없습니다</p>
        </div>
      ) : (
        cardData.map((link) => (
          <div className={styles.card_container} key={link.id}>
            <Link href={link.url}>
              <div className={styles.card}>
                <div className={styles.card_img_div}>
                  <Image
                    width="320"
                    height="200"
                    src={link.image_source ? link.image_source : thumbnail}
                    className={styles.card_img}
                    alt={link.title}
                  />
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
            </Link>
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
            <button className={styles.card_favorite_icon}>
              <Image src={starticon} alt="즐겨찾기 별 아이콘" />
            </button>
          </div>
        ))
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

export default FolderCards;
