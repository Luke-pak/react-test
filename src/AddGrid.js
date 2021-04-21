import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { Grid, GridPage } from './atoms/GridState';
import { Button } from 'react-bootstrap';

const AddNo = atom({
  key: 'AddNo',
  default: 0,
});

function AddGrid() {
  const [grid, setGrid] = useRecoilState(Grid);
  const [addNo, setAddNo] = useRecoilState(AddNo);
  const setPage = useSetRecoilState(GridPage);

  const addGrid = () => {
    setAddNo(addNo + 1);
    setGrid([
      ...grid,
      { i: 'ADD' + addNo, name: addNo, x: 0, y: 1, w: 1, h: 1 },
    ]);
  };
  //1

  return (
    <>
      <Button variant="primary" onClick={addGrid}>
        Add
      </Button>
      <Button
        onClick={() => {
          setPage(0);
        }}
      >
        All11
      </Button>
      <Button
        onClick={() => {
          setPage(1);
        }}
      >
        Page 1
      </Button>
      <Button
        onClick={() => {
          setPage(2);
        }}
      >
        Page 2
      </Button>
    </>
  );
}

export default AddGrid;
