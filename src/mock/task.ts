import { TopicListDetail } from '@/components/Waterfall/interface';
import { sleep } from 'antd-mobile/es/utils/sleep';

export const getRandomImageUrl = (
  imageWidth?: number,
  imageHeight?: number
) => {
  const width = imageWidth || Math.floor(Math.random() * (900 - 300 + 1)) + 300;
  const height =
    imageHeight || Math.floor(Math.random() * (900 - 300 + 1)) + 300;
  return {
    width,
    height,
    topicId: Math.floor(Math.random() * 1000000) + '',
    imageUrl: `https://picsum.photos/${width}/${height}`,
  };
};

let count = 0;

// 模拟API请求
export const fetchMockApi = async (
  perPage = 20
): Promise<TopicListDetail[]> => {
  if (count >= 4) {
    return [];
  }
  console.log('fetchMockApi');
  const data: TopicListDetail[] = Array.from({ length: perPage }, () => {
    // 每次调用 getRandomImageUrl 获取宽度、高度和图片URL
    return getRandomImageUrl();
  });
  fetch('/test/taskv1');
  await sleep(2000);
  count++;
  return data;
};
