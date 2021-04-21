import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ReactGridLayout from 'react-grid-layout';
import {
  Grid,
  GridWidth,
  GridPage,
  WindowSize,
  ModalGrid,
} from './atoms/GridState';

function GridSample() {
  const [layout, setLayout] = useRecoilState(Grid);
  const page = useRecoilValue(GridPage);
  const [gridWidth, setGridWidth] = useRecoilState(GridWidth);
  const [windowSize, setWindowSize] = useRecoilState(WindowSize);
  const [modalGrid, setModalGrid] = useRecoilState(ModalGrid);

  const stageCanvasRef = useRef(null);
  useEffect(() => {
    let handleResize = () => {
      const _windowSize = {
        width: window.innerWidth,
        height: window.innerHeight - 60,
      };
      setWindowSize(_windowSize);
      if (stageCanvasRef.current) {
        let width = stageCanvasRef.current.offsetWidth;
        setGridWidth(width);
      }
    };

    window.addEventListener('resize', handleResize);
  }, [stageCanvasRef]);

  const generateDOM = () => {
    return layout.map((val, idx) => {
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
    const newLayout = layout.filter(item => item != oldItem);
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

  // ========================================================================================
  // ========================================================================================
  // ========================================================================================

  // { i: 'modalA', name: 'modalA', x: 3, y: 3, w: 2, h: 2}

  const modalGenerateDOM = () => {
    return modalGrid.map((val, idx) => {
      if (val.page === page || val.page === 100 || page === 0) {
        return (
          <div key={val.i} data-grid={val} style={{ backgroundColor: 'wheat' }}>
            {val.name}
          </div>
        );
      } else {
        return <></>;
      }
    });
  };

  const ClickItem = e => {
    const key = e.target.id;
    const clickItem = layout.find(item => item.i === key);
    console.log(clickItem);
  };

  // ======================================================================================== 1
  // ========================================================================================
  // ========================================================================================

  const dropItem = [
    { i: 'DA', name: 'DA', x: 24, y: 10, w: 2, h: 1 },
    { i: 'DB', name: 'DB', x: 24, y: 11, w: 2, h: 1 },
    { i: 'DC', name: 'DC', x: 24, y: 12, w: 2, h: 1 },
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
      <div
        style={{ width: '100%', height: windowSize.height }}
        ref={stageCanvasRef}
      >
        <div
          style={{
            width: '20%',
            height: windowSize.height,
            float: 'right',
            backgroundColor: 'wheat',
          }}
        ></div>

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
          isResizable={false}
          style={{ position: 'absolute' }}
        >
          {modalGenerateDOM()}
        </ReactGridLayout>

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
          isResizable={false}
          onDragStop={DropItemCallback}
          style={{ position: 'absolute' }}
        >
          {dropGenerateDOM()}
        </ReactGridLayout>
      </div>
    </>
  );
}

export default GridSample;
