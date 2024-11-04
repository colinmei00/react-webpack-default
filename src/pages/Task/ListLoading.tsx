import { Skeleton } from 'antd-mobile';

function ListLoading() {
  return (
    <div>
      <Skeleton.Title animated />
      <Skeleton.Paragraph lineCount={5} animated />
    </div>
  );
}

export default ListLoading;
