import { useState } from 'react';

const USD_TO_RWF_RATE = 1420;

export const useCurrencyStore = () => {
  const [activeCurrency, setActiveCurrency] = useState<'RWF' | 'USD'>('RWF');

  const convertToRWF = (amount: number, fromCurrency: 'USD' | 'RWF' = 'USD') => {
    if (fromCurrency === 'USD') {
      return Math.round(amount * USD_TO_RWF_RATE);
    }
    return amount;
  };

  const formatAmount = (amountInRWF: number, targetCurrency: 'USD' | 'RWF' = 'USD') => {
    if (targetCurrency === 'USD') {
      const usdVal = amountInRWF / USD_TO_RWF_RATE;
      return `$${usdVal.toFixed(0)}`;
    }
    return `${amountInRWF.toLocaleString()} RWF`;
  };

  return {
    activeCurrency,
    setActiveCurrency,
    convertToRWF,
    formatAmount,
    USD_TO_RWF_RATE,
  };
};
