import { useState } from 'react';
import styles from '@/components/IdInput/index.module.css';

function IdInput() {
  const [value, setValue] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value == '') {
      setIsError(true);
      setErrorMsg('내용을 입력하세요.');
    } else {
      setIsError(false);
      setErrorMsg('');
    }
  };

  return (
    <>
      <div className={styles.input__wrapper}>
        <input
          type="text"
          placeholder="내용 입력"
          alt="아이디 인풋 폼"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${styles.input__form} ${
            isFocused ? styles.focused : ''
          } ${isError ? styles.error : ''}`}
        />
      </div>
      {isError && <p className={styles.error__msg}>{ErrorMsg}</p>}
    </>
  );
}

export default IdInput;
