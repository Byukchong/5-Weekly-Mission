import FolderData from '@/components/Folderdata';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import Cards from '@/components/Cards';
import styled from 'styled-components';
import Footer from '@/components/Footer';

const BASE_URL_FOLDER_SAMPLE =
  'https://bootcamp-api.codeit.kr/api/sample/folder';

/*테블릿 1124 이상 모바일 최소여백 32       테블릿 768~1199 모바일 375 ~767    */
const PageDisplay = styled.div`
  display: flex;
  row-gap: 4rem;
  padding: 4rem 0 10rem;
  flex-direction: column;
  margin: 0 auto;
  width: 106rem;

  @media (max-width: 1199px) {
    margin-left: min(3.2rem) max(auto);
    margin-right: min(3.2rem) max(auto);
  }

  @media (max-width: 1123px) {
    width: 70.4rem;

    @media (max-width: 767px) {
      width: 32.5rem;
    }
  }
`;

function SharedPage() {
  return (
    <>
      <Navigation />
      <FolderData />
      <PageDisplay>
        <SearchBar />
        <Cards url={BASE_URL_FOLDER_SAMPLE} />
      </PageDisplay>
      <Footer />
    </>
  );
}

export default SharedPage;
