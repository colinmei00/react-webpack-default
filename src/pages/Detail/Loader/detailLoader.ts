import { sleep } from 'antd-mobile/es/utils/sleep';
import { LoaderFunctionArgs } from 'react-router-dom';

async function detailLoader({ params }: LoaderFunctionArgs) {
  /** 先鉴权，没问题后再并行加载数据 */
  // await loginLoader();
  console.log('可用传递给接口的参数，', params.detailId);
  await sleep(1000);
  return { list: [1, 2, 3] };
}

export default detailLoader;
