import facebook from '@/public/facebook.svg';
import twitter from '@/public/twitter.svg';
import youtube from '@/public/youtube.svg';
import instagram from '@/public/instagram.svg';
import styles from '@/components/Footer/index.module.css';
import Image from 'next/image';

interface SnsList {
  id: string;
  link: string;
  img: string;
  height: string;
  width: string;
  alt: string;
}

const snsLists: SnsList[] = [
  {
    id: '페이스북',
    link: 'https://facebook.com/',
    img: facebook,
    height: '20',
    width: '20',
    alt: '페이스북 아이콘',
  },
  {
    id: '트위터',
    link: 'https://twitter.com/',
    img: twitter,
    height: '20',
    width: '20',
    alt: '트위터 아이콘',
  },
  {
    id: '유튜브',
    link: 'https://youtube.com/',
    img: youtube,
    height: '20',
    width: '20',
    alt: '유튜브 아이콘',
  },
  {
    id: '인스타그램',
    link: 'https://instagram.com/',
    img: instagram,
    height: '20',
    width: '20',
    alt: '인스타그램 아이콘',
  },
];

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <span className={styles.footer_codeit}>©codeit - 2024</span>
        <div className={styles.footer_center_div}>
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </div>
        <div className={styles.footer_icon_div}>
          {snsLists.map((snsList) => (
            <a
              href={snsList.link}
              target="_blank"
              rel="noopener noreferrer"
              key={snsList.id}
            >
              <Image
                src={snsList.img}
                height={Number(snsList.height)}
                width={Number(snsList.width)}
                alt={snsList.alt}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
