import { useRecoilValue } from 'recoil';
import ReactGridLayout from 'react-grid-layout';
import { GridWidth, GridPage, ModalGrid } from './atoms/GridState';
import { Modal } from 'react-bootstrap';

function GridModal() {
  const page = useRecoilValue(GridPage);
  const gridWidth = useRecoilValue(GridWidth);
  const modalGrid = useRecoilValue(ModalGrid);

  // { i: 'modalA', name: 'modalA', x: 3, y: 3, w: 2, h: 2}

  const modalGenerateDOM = () => {
    return modalGrid.map((val, idx) => {
      return (
        <Modal.Dialog
          key={val.i}
          data-grid={val}
          style={{ background: 'none', border: 'none' }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{val.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>
        </Modal.Dialog>
      );
    });
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
        isDraggable={false}
        isResizable={false}
        style={{ position: 'absolute' }}
      >
        {modalGenerateDOM()}
      </ReactGridLayout>
    </>
  );
}

export default GridModal;
