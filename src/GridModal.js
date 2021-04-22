import { useRecoilState, useRecoilValue } from 'recoil';
import ReactGridLayout from 'react-grid-layout';
import { GridWidth, GridPage, ModalGrid, ModalShow } from './atoms/GridState';
import { Modal } from 'react-bootstrap';

function GridModal() {
  const page = useRecoilValue(GridPage);
  const gridWidth = useRecoilValue(GridWidth);
  const modalGrid = useRecoilValue(ModalGrid);
  const [modalShow, setModalShowState] = useRecoilState(ModalShow);

  const handleClose = () => setModalShowState(false);

  const modalGenerateDOM = () => {
    return modalGrid.map((val, idx) => {
      return (
        <Modal
          show={modalShow}
          onHide={handleClose}
          key={val.i}
          data-grid={val}
          style={{ background: 'none', border: 'none' }}
        >
          <Modal.Header closeButton>
            <Modal.Title>{val.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{val.name}</p>
          </Modal.Body>
        </Modal>
      );
    });
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
