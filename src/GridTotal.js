import { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { GridWidth, WindowSize } from './atoms/GridState';

import GridFixedAsset from './GridFixedAsset';
import GridToto from './GridTodo';

function GridTotal() {
  const setGridWidth = useSetRecoilState(GridWidth);
  const [windowSize, setWindowSize] = useRecoilState(WindowSize);

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
        <GridFixedAsset />
        <GridToto />
      </div>
    </>
  );
}

export default GridTotal;
