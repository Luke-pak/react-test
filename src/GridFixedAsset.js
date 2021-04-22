import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import ReactGridLayout from 'react-grid-layout';
import {
  Grid,
  GridWidth,
  GridPage,
  ModalGrid,
  ModalShow,
} from './atoms/GridState';

import { Row, Col, Container } from 'react-bootstrap';

function GridFixedAsset() {
  const [layout, setLayout] = useRecoilState(Grid);
  const page = useRecoilValue(GridPage);
  const gridWidth = useRecoilValue(GridWidth);
  const setModal = useSetRecoilState(ModalGrid);

  const setModalShowState = useSetRecoilState(ModalShow);

  const ClickItem = e => {
    const key = e.target.id;
    const clickItem = layout.find(item => item.i === key);
    setModal([
      {
        i: `modal${clickItem.name}`,
        name: `modalA${clickItem.name}`,
        x: 0,
        y: 0,
        w: 30,
        h: 20,
      },
    ]);

    setModalShowState(true);

    // { i: 'modalA', name: 'modalA', x: 7, y: 3, w: 10, h: 10 }
  };

  const makeGauge = () => {
    let gauge = [];
    for (let index = 0; index < 5; index++) {
      gauge.push(
        <div
          style={{
            margin: '3px',
            width: '15px',
            height: '9px',
            backgroundColor: 'white',
          }}
        ></div>
      );
    }
    return gauge;
  };

  const makeGaugeCol = () => {
    let gauge = [];
    for (let index = 0; index < 4; index++) {
      gauge.push(
        <Col
          lg="2"
          style={{
            height: '62px',
            padding: '0',
          }}
        >
          {makeGauge()}
        </Col>
      );
    }
    return gauge;
  };

  const generateDOM = () => {
    return layout.map(val => {
      if (val.page === page || val.page === 100 || page === 0) {
        return (
          <div
            key={val.i}
            id={val.i}
            data-grid={val}
            style={{ backgroundColor: '#00000000', border: 'none' }}
            // onClick={ClickItem}
          >
            <div
              style={{
                border: '8px solid #2196f3',
                borderRadius: '15px',
                height: '100px',
                width: '100px',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              <Container className="justify-content-md-center p-0">
                <Row className="justify-content-md-center">
                  <Col
                    lg="12"
                    style={{ textAlign: 'center', fontWeight: 'bold' }}
                  >
                    {val.name}
                  </Col>

                  <Col lg="12" style={{ height: '5em', paddingLeft: '13px' }}>
                    <Row className="justify-content-md-center">
                      {makeGaugeCol()}
                    </Row>
                  </Col>
                </Row>
              </Container>
            </div>
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

    if (newItem.x >= 43 && oldItem.x < 43) {
      // alert('삭제되었습니다.');
      newItem.w = 4;
      newItem.h = 3;
      setLayout([...newLayout, newItem]);
    } else if (newItem.x < 43 && oldItem.x >= 43) {
      newItem.w = 4;
      newItem.h = 3;
      setLayout([...newLayout, newItem]);
    }

    console.log(newItem.x, newItem.y);
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
        onDragStop={ItemCallback}
        style={{ position: 'absolute' }}
      >
        {generateDOM()}
      </ReactGridLayout>
    </>
  );
}

export default GridFixedAsset;
