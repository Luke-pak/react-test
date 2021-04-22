import { useRecoilValue } from 'recoil';
import ReactGridLayout from 'react-grid-layout';
import { Grid, GridWidth, GridPage } from './atoms/GridState';

function GridToto() {
  const layout = useRecoilValue(Grid);
  const page = useRecoilValue(GridPage);
  const gridWidth = useRecoilValue(GridWidth);

  const dropItem = [
    { i: 'DA', name: 'DA', x: 43, y: 20, w: 4, h: 1 },
    { i: 'DB', name: 'DB', x: 43, y: 21, w: 4, h: 1 },
    { i: 'DC', name: 'DC', x: 43, y: 22, w: 4, h: 1 },
  ];

  const dropGenerateDOM = () => {
    return dropItem.map((val, idx) => {
      if (val.page === page || val.page === 100 || page === 0) {
        return (
          <div key={val.i} data-grid={val} style={{ backgroundColor: 'white' }}>
            {val.name}
          </div>
        );
      } else {
        return <></>;
      }
    });
  };

  const DropItemCallback = (
    dropLayout,
    oldItem,
    newItem,
    placeholder,
    e,
    element
  ) => {
    const posX = newItem.x;
    const posY = newItem.y;

    const selItem = layout.find(
      item =>
        item.x <= posX &&
        posX < item.x + item.w &&
        item.y <= posY &&
        posY < item.y + item.h
    );

    if (selItem) alert(`Add Item ${selItem.name}`);
    console.log(`X : ${posX} , Y : ${posY}`);
  };

  return (
    <>
      <ReactGridLayout
        className={'layout'}
        cols={50}
        rowHeight={30}
        width={gridWidth}
        autoSize={false}
        margin={[2, 2]}
        preventCollision={true}
        verticalCompact={false}
        isDraggable={true}
        isResizable={false}
        onDragStop={DropItemCallback}
        style={{ position: 'absolute' }}
      >
        {dropGenerateDOM()}
      </ReactGridLayout>
    </>
  );
}

export default GridToto;
