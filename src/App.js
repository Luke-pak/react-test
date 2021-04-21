import { useEffect, useRef } from 'react';
import { RecoilRoot } from 'recoil';
import { Container, Row, Col } from 'react-bootstrap';
import './bootstrap.css';
import './gridStyle.css';

import AddGrid from './AddGrid';
import GridTotal from './GridTotal';

function App() {
  const stageCanvasRef = useRef(null);
  useEffect(() => {
    // useEffect는 랜더링 이후에 실행된다. API에 확인하면 대체 할수 있는 다른 함수도 있다.
    // stageCanvasRef 참조를 Component에 ref={stageCanvasRef} 로 연결하고 useEffect에서 param으로 가져온다.
    // stageCanvasRef에는 랜더링 이후 current에 연결된 Component의 특성정보를 가져올수있다.
    if (stageCanvasRef.current) {
      let height = stageCanvasRef.current.offsetHeight;
      let width = stageCanvasRef.current.offsetWidth;
      console.log(height, width);
    }
  }, [stageCanvasRef]);

  return (
    <RecoilRoot>
      <Container style={{ backgroundColor: '#303642' }} fluid>
        <Row>
          <Col md="12" lg="2" style={{ backgroundColor: 'gray' }}>
            <AddGrid />
          </Col>
          <Col md="12" lg="10" ref={stageCanvasRef}>
            <GridTotal />
          </Col>
        </Row>
      </Container>
    </RecoilRoot>
  );
}

export default App;
