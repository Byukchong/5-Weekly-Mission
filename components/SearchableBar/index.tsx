import React, { useState } from 'react';
import styles from './index.module.css';
import searchIcon from '@/public/search.svg';
import Image from 'next/image';

interface Link {
  id: string;
  url: string;
  title: string;
  description: string;
  // 필요한 경우 다른 속성들도 추가할 수 있습니다.
}

const SearchableBar = ({
  links,
  onSearch,
}: {
  links: Link[];
  onSearch: (filteredLinks: Link[]) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const filteredLinks = links.filter(
      (link) =>
        link.url.includes(searchTerm) ||
        link.title.includes(searchTerm) ||
        link.description.includes(searchTerm)
    );
    onSearch(filteredLinks);
  };

  return (
    <div className={styles.SearchBar}>
      <input
        className={styles.SearchBarInput}
        type="search"
        placeholder="링크를 검색해 보세요."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>
        <Image
          src={searchIcon}
          alt="검색 돋보기 아이콘"
          className={styles.SearchBarIcon}
        />
      </button>
    </div>
  );
};

export default SearchableBar;
