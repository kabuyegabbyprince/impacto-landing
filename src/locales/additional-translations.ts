import { useTranslation } from 'react-i18next';

export const useLocalTranslation = () => {
  const { t, i18n } = useTranslation();

  const customT = (key: string, defaultValue?: string) => {
    return t(key, defaultValue || key);
  };

  return {
    t: customT,
    i18n,
  };
};
