import { useState } from 'react';
import styles from '@/components/PasswordInput/index.module.css';
import eyeOnIcon from '@/public/eye-on.svg';
import eyeOffIcon from '@/public/eye-off.svg';
import Image from 'next/image';

function PasswordInput() {
  const [value, setValue] = useState<string>('');
  const [isEyeOn, setIsEyeOn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const toggleEyeButton = () => {
    setIsEyeOn(!isEyeOn);
  };

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
          type={isEyeOn ? 'password' : 'text'}
          placeholder="내용 입력"
          alt="인풋 폼"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${styles.input__form} ${
            isFocused ? styles.focused : ''
          } ${isError ? styles.error : ''}`}
        />
        <button
          type="button"
          className={styles.eye__button}
          onClick={toggleEyeButton}
        >
          <Image
            src={!isEyeOn ? eyeOnIcon : eyeOffIcon}
            alt="eye-on-off-button"
          />
        </button>
      </div>
      {isError && <p className={styles.error__msg}>{ErrorMsg}</p>}
    </>
  );
}

export default PasswordInput;
