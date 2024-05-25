import { useFetch } from '../../hooks/useFetch';
import styles from './index.module.css';
import addfolderIcon from '@/public/addfolder.svg';
import deleteicon from '@/public/deleteicon.svg';
import changenameicon from '@/public/changenameicon.svg';
import shareicon from '@/public/shareicon.svg';
import { useMemo, useState, useEffect } from 'react';
import FolderCards from '@/components/FolderCards';
import ModalFolder from '@/components/modal/ModalFolder';
import ModalShare from '@/components/modal/ModalShare';
import ModalDelete from '@/components/modal/ModalDelete';
import SearchableBar from '@/components/SearchableBar';
import Image from 'next/image';
import S from './foldermenu.module.css';
import {
  BASE_URL_FOLDER,
  BASE_URL_ALL_FOLDER,
} from '@/constant/folder-constant';
import { CardData } from '@/types/folder-type';
import { useRouter } from 'next/router';

interface Card {
  id: string;
  url: string;
  title: string;
  description: string;
}
interface Folder {
  id: string | number;
  name: string;
}

interface FolderResponse {
  data: Folder[];
}

function Foldermenu({ selectedFolderId }: { selectedFolderId?: string }) {
  const router = useRouter();

  const foldersResponse = useFetch<FolderResponse>(BASE_URL_FOLDER);
  const folders = useMemo(() => foldersResponse?.data ?? [], [foldersResponse]);
  const selectedFolder = useMemo(() => {
    if (!folders || !selectedFolderId) return undefined;
    return folders.find(
      (folder) => folder.id.toString() === selectedFolderId.toString()
    );
  }, [folders, selectedFolderId]);

  const requestCardUrl = selectedFolderId
    ? `${BASE_URL_ALL_FOLDER}?folderId=${selectedFolderId}`
    : BASE_URL_ALL_FOLDER;

  const cardsResponse = useFetch<{ data: CardData[] }>(requestCardUrl);
  const cards = cardsResponse?.data ?? [];

  const [filteredLinks, setFilteredLinks] = useState<Card[]>([]);
  const [modalState, setModalState] = useState({
    addFolder: false,
    shareFolder: false,
    renameFolder: false,
    deleteFolder: false,
  });

  const handleModalOpen = (modalType: string) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalType]: true,
    }));
  };

  const handleModalClose = (modalType: string) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalType]: false,
    }));
  };

  const handleSearch = (filteredLinks: Card[]) => {
    setFilteredLinks(filteredLinks);
  };

  const handleOnClick = (selectedFolderId: string) => {
    if (selectedFolderId) {
      router.push(`/folder/${selectedFolderId}`, undefined, {
        shallow: true,
      });
      return;
    }

    router.push('/', undefined, { shallow: true });
  };

  return (
    <div>
      <SearchableBar links={filteredLinks} onSearch={handleSearch} />
      <div className={styles.buttonContainer}>
        <div className={S.folderListContainer}>
          <button
            className={`${styles.folderButtons} ${styles.allFolders} ${
              selectedFolderId ? '' : styles.active
            }`}
            onClick={() => handleOnClick('/')}
          >
            전체
          </button>
          {folders.map((folder) => (
            <button
              className={`${styles.folderButtons} ${
                selectedFolderId == folder.id.toString() ? styles.active : ''
              }`}
              key={folder.id}
              onClick={() => handleOnClick(folder.id.toString())}
            >
              {folder.name}
            </button>
          ))}
        </div>
        <button onClick={() => handleModalOpen('addFolder')}>
          <Image
            className={styles.addFolderIcon}
            src={addfolderIcon}
            alt="폴더 추가 아이콘"
          />
        </button>
      </div>
      <div className={S.folderMenuContainer}>
        <p className={styles.folderName}>
          {selectedFolder ? selectedFolder.name : '전체'}
        </p>
        {!selectedFolderId && (
          <div className={S.imageContainer}>
            <button onClick={() => handleModalOpen('shareFolder')}>
              <Image src={shareicon} alt="폴더 공유 아이콘" />
            </button>
            <button onClick={() => handleModalOpen('renameFolder')}>
              <Image src={changenameicon} alt="폴더 이름 변경 아이콘" />
            </button>
            <button onClick={() => handleModalOpen('deleteFolder')}>
              <Image src={deleteicon} alt="폴더 삭제 아이콘" />
            </button>
          </div>
        )}
      </div>
      <FolderCards cards={cards} />

      {modalState.addFolder && (
        <ModalFolder
          title={'폴더 추가'}
          folderName={''}
          onClose={() => handleModalClose('addFolder')}
          buttonName={'추가하기'}
          isModalOpen={modalState.addFolder}
        />
      )}
      {modalState.shareFolder && (
        <ModalShare
          title={'폴더 공유'}
          targetName={selectedFolder ? selectedFolder.name : '전체'}
          onClose={() => handleModalClose('shareFolder')}
          isModalOpen={modalState.shareFolder}
          currentFolderId={modalState.shareFolder}
        />
      )}
      {modalState.renameFolder && (
        <ModalFolder
          title={'폴더 이름 변경'}
          folderName={selectedFolder ? selectedFolder.name : '전체'}
          onClose={() => handleModalClose('renameFolder')}
          buttonName={'변경하기'}
          isModalOpen={modalState.renameFolder}
        />
      )}
      {modalState.deleteFolder && (
        <ModalDelete
          title={'폴더 삭제'}
          DeleteName={selectedFolder ? selectedFolder.name : '전체'}
          onClose={() => handleModalClose('deleteFolder')}
          isModalOpen={modalState.deleteFolder}
        />
      )}
    </div>
  );
}

export default Foldermenu;
