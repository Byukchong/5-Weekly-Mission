import Image from 'next/image';
import styles from './index.module.css';
import searchIcon from '@/public/search.svg';

const SearchBar = () => {
  return (
    <div className={styles.SearchBar}>
      <input
        className={styles.SearchBarInput}
        type="search"
        placeholder="링크를 검색해 보세요."
      />
      <Image
        src={searchIcon}
        alt="검색 돋보기 아이콘"
        className={styles.SearchBarIcon}
      />
    </div>
  );
};

export default SearchBar;
