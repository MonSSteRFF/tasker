import { useEffect, useState } from 'react';

const useMainPreload = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [lineStamp, setLineStamp] = useState<number>(0);

  useEffect(() => {
    const time = 20;

    const interval = setInterval(() => {
      setLineStamp((prev) => {
        const newStamp = prev + 100 / time;
        if (newStamp >= 100) {
          setIsShow(true);
          clearInterval(interval);
        }
        return newStamp;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return { isShow, lineStamp };
};

export default useMainPreload;
