import { useFetch } from '@/hooks/useFetch';
import styles from './index.module.css';
import styled from 'styled-components';

// Folder 데이터의 타입 정의
interface Owner {
  profileImageSource: string;
  name: string;
}

interface Folder {
  owner: Owner;
  name: string;
}

interface FolderDataResponse {
  folder: Folder;
}

const BASE_URL_FOLDER = 'https://bootcamp-api.codeit.kr/api/sample/folder';

function FolderData() {
  // useFetch 훅을 이용하여 데이터 가져오기
  const folderData = useFetch<FolderDataResponse>(BASE_URL_FOLDER);

  // styled-components를 사용하여 스타일링된 컴포넌트 생성
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 24.4rem;
    padding: 2rem 0 6rem;
    background-color: var(--light-blue);
  `;

  return (
    <Container>
      {folderData && (
        <div className={styles.folderInfo}>
          <img
            src={folderData.folder.owner.profileImageSource}
            className={styles.folderProfile}
            alt="프로필"
          />
          <span className={styles.ownerName}>
            {folderData.folder.owner.name}
          </span>
          <h1 className={styles.folderName}>{folderData.folder.name}</h1>
        </div>
      )}
    </Container>
  );
}

export default FolderData;
