import { useRecoilState, useRecoilValue } from 'recoil';
import ReactGridLayout from 'react-grid-layout';
import { Grid, GridWidth, GridPage } from './atoms/GridState';

function GridFixedAsset() {
  const [layout, setLayout] = useRecoilState(Grid);
  const page = useRecoilValue(GridPage);
  const gridWidth = useRecoilValue(GridWidth);

  const ClickItem = e => {
    const key = e.target.id;
    const clickItem = layout.find(item => item.i === key);
    console.log(clickItem);
  };

  const generateDOM = () => {
    return layout.map(val => {
      if (val.page === page || val.page === 100 || page === 0) {
        return (
          <div
            key={val.i}
            id={val.i}
            data-grid={val}
            style={{ backgroundColor: 'wheat' }}
            onClick={ClickItem}
          >
            {val.name}
          </div>
        );
      } else {
        return <></>;
      }
    });
  };

  const ItemCallback = (
    cbLayout,
    oldItem,
    newItem,
    placeholder,
    e,
    element
  ) => {
    const newLayout = layout.filter(item => item !== oldItem);
    const _oldItem = layout.find(item => item.i === oldItem.i);
    newItem.name = _oldItem.name;

    if (newItem.x >= 24 && oldItem.x < 24) {
      // alert('삭제되었습니다.');
      newItem.w = 2;
      newItem.h = 1;
      setLayout([...newLayout, newItem]);
    } else if (newItem.x < 24 && oldItem.x >= 24) {
      newItem.w = 2;
      newItem.h = 2;
      setLayout([...newLayout, newItem]);
    }
  };

  return (
    <>
      <ReactGridLayout
        className={'layout'}
        cols={30}
        rowHeight={30}
        width={gridWidth}
        autoSize={true}
        margin={[2, 2]}
        preventCollision={true}
        verticalCompact={false}
        isDraggable={true}
        isResizable={true}
        onDragStop={ItemCallback}
        style={{ position: 'absolute' }}
      >
        {generateDOM()}
      </ReactGridLayout>
    </>
  );
}

export default GridFixedAsset;
