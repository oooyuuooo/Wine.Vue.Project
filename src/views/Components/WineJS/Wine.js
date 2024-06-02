export function PriceFormat(price) {
  price = parseInt(price)
  return price.toLocaleString('zh-TW', {
    maximumFractionDigits: 0
  })
}

export function formatDate(dateTimeString) {
  const dateTime = new Date(dateTimeString)
  // 獲取日期部分（YYYY年MM月DD日）
  const formattedDate = `${dateTime.getFullYear()}年${(dateTime.getMonth() + 1)
    .toString()
    .padStart(2, '0')}月${dateTime.getDate().toString().padStart(2, '0')}日`

  return formattedDate
}

import { ref } from 'vue';

export const useSearchParams = () => {
  const searchParams = ref({
    Name: '',
    Year: '',
    Category: '',
    Origin: '',
    Capacity: '',
    Taste: ''
  });

  return { searchParams };
};