import { useFetch } from '../../hooks/useFetch';
import styled from 'styled-components';
import styles from './index.module.css';
import addfolderIcon from '@/public/addfolder.svg';
import deleteicon from '@/public/deleteicon.svg';
import changenameicon from '@/public/changenameicon.svg';
import shareicon from '@/public/shareicon.svg';
import { useState } from 'react';
import Cardsfolder from '@/components/Cardsfolder';
import ModalFolder from '@/components/modal/ModalFolder';
import ModalShare from '@/components/modal/ModalShare';
import ModalDelete from '@/components/modal/ModalDelete';
import SearchableBar from '@/components/SearchableBar';
import Image from 'next/image';

const BASE_FOLDER_ID = 'all';

interface Link {
  id: string;
  url: string;
  title: string;
  description: string;
}
interface Folder {
  id: string;
  name: string;
}

interface FolderResponse {
  data: Folder[];
}

const BASE_URL_FOLDER = 'https://bootcamp-api.codeit.kr/api/users/1/folders';
const BASE_URL_ALL_FOLDER = 'https://bootcamp-api.codeit.kr/api/users/1/links';

const FolderListContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 0.8rem;
  position: relative;
  flex-wrap: wrap;
`;

const FolderMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.4rem;
  height: 3.2rem;
  margin-bottom: 2.4rem;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  height: 1.8rem;
`;

function Foldermenu() {
  const folderData = useFetch<FolderResponse>(BASE_URL_FOLDER);
  const [activeButton, setActiveButton] = useState('전체');
  const [url, setUrl] = useState(BASE_URL_ALL_FOLDER);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalShareOpen, setIsModalShareOpen] = useState(false);
  const [isModalRenameOpen, setIsModalRenameOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(
    BASE_FOLDER_ID
  );
  const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);

  function handleCloseModal() {
    setIsModalOpen(false);
  }
  function handleClickButton() {
    setIsModalOpen(true);
  }

  function handleCloseShareModal() {
    setIsModalShareOpen(false);
  }
  function handleClickShareButton() {
    setIsModalShareOpen(true);
  }

  function handleCloseRenameModal() {
    setIsModalRenameOpen(false);
  }
  function handleClickRenameButton() {
    setIsModalRenameOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsModalDeleteOpen(false);
  }
  function handleClickDeleteButton() {
    setIsModalDeleteOpen(true);
  }

  const handleSearch = (filteredLinks: Link[]) => {
    setFilteredLinks(filteredLinks);
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const folderId = e.currentTarget.id;
    const folderName = e.currentTarget.textContent || '';
    setActiveButton(folderName);
    setCurrentFolderId(folderId);

    if (folderId !== BASE_FOLDER_ID) {
      setUrl(`${BASE_URL_ALL_FOLDER}?folderId=${folderId}`);
    } else {
      setUrl(BASE_URL_ALL_FOLDER);
    }
  };

  return (
    <div>
      <SearchableBar links={filteredLinks} onSearch={handleSearch} />
      <div className={styles.buttonContainer}>
        <FolderListContainer>
          <button
            className={`${styles.folderButtons} ${styles.allFolders} ${
              currentFolderId == BASE_FOLDER_ID ? styles.active : ''
            }`}
            onClick={handleOnClick}
            id={BASE_FOLDER_ID}
          >
            전체
          </button>
          {folderData?.data &&
            folderData?.data.map((folderdata) => (
              <button
                className={`${styles.folderButtons} ${
                  currentFolderId == folderdata.id ? styles.active : ''
                }`}
                key={folderdata.id}
                onClick={handleOnClick}
                id={folderdata.id}
              >
                {folderdata.name}
              </button>
            ))}
        </FolderListContainer>
        <button onClick={handleClickButton}>
          <Image
            className={styles.addFolderIcon}
            src={addfolderIcon}
            alt="폴더 추가 아이콘"
          />
        </button>
      </div>
      <FolderMenuContainer>
        <p className={styles.folderName}>{activeButton}</p>
        {activeButton === '전체' && (
          <ImageContainer>
            <button onClick={handleClickShareButton}>
              <Image src={shareicon} alt="폴더 공유 아이콘" />
            </button>
            <button onClick={handleClickRenameButton}>
              <Image src={changenameicon} alt="폴더 이름 변경 아이콘" />
            </button>
            <button onClick={handleClickDeleteButton}>
              <Image src={deleteicon} alt="폴더 삭제 아이콘" />
            </button>
          </ImageContainer>
        )}
      </FolderMenuContainer>
      <Cardsfolder url={url} />

      {isModalOpen && (
        <ModalFolder
          title={'폴더 추가'}
          folderName={''}
          onClose={handleCloseModal}
          buttonName={'추가하기'}
          isModalOpen={isModalOpen}
        />
      )}
      {isModalShareOpen && (
        <ModalShare
          title={'폴더 공유'}
          targetName={activeButton}
          onClose={handleCloseShareModal}
          isModalOpen={isModalShareOpen}
          currentFolderId={currentFolderId}
        />
      )}
      {isModalRenameOpen && (
        <ModalFolder
          title={'폴더 이름 변경'}
          folderName={activeButton}
          onClose={handleCloseRenameModal}
          buttonName={'변경하기'}
          isModalOpen={isModalRenameOpen}
        />
      )}
      {isModalDeleteOpen && (
        <ModalDelete
          title={'폴더 삭제'}
          DeleteName={activeButton}
          onClose={handleCloseDeleteModal}
          isModalOpen={isModalDeleteOpen}
        />
      )}
    </div>
  );
}

export default Foldermenu;
