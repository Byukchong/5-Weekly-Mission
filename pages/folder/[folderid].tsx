import Navigation from '@/components/Navigation';
import styled from 'styled-components';
import Footer from '@/components/Footer';
import Addlink from '@/components/Addlink';
import Foldermenu from '@/components/Foldermenu';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

/*테블릿 1124 이상 모바일 최소여백 32       테블릿 768~1199 모바일 375 ~767    */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 페이지의 최소 높이를 화면의 높이로 설정 */
`;

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
const FooterWrapper = styled.footer`
  margin-top: auto; /* 페이지 컨텐츠 아래에 위치하도록 설정 */
`;

function FolderIdPage() {
  const router = useRouter();
  const folderId = useMemo(() => {
    const param = router.query.folderid;
    if (typeof param !== 'string') {
      return;
    }
    return param;
  }, [router.query]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/signin');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/signin');
      return;
    }
  }, []);

  return (
    <PageWrapper>
      <Navigation />
      <Addlink />
      <PageDisplay>
        <button onClick={handleLogout}>로그아웃</button>
        <Foldermenu selectedFolderId={folderId} />
      </PageDisplay>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </PageWrapper>
  );
}

export default FolderIdPage;
