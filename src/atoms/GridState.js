import { atom } from 'recoil';

export const WindowSize = atom({
  key: 'windowSize',
  default: { width: 1920, height: 920 },
});

export const GridWidth = atom({
  key: 'gridWidth',
  default: window.innerWidth * (9.5 / 12),
});

export const Grid = atom({
  key: 'gridState',
  default: [
    { i: 'a', name: 'CNC1호기', x: 1, y: 0, w: 4, h: 2, page: 1 },
    { i: 'b', name: 'CNC2호기', x: 5, y: 0, w: 4, h: 2, page: 2 },
    { i: 'c', name: 'CNC3호기', x: 9, y: 5, w: 4, h: 2 },

    { i: 'd', name: '연마1호기', x: 43, y: 0, w: 4, h: 1, page: 100 },
    { i: 'e', name: '연마2호기', x: 43, y: 3, w: 4, h: 1, page: 100 },
    { i: 'f', name: '범용선반1', x: 43, y: 6, w: 4, h: 1, page: 100 },
    { i: 'g', name: '범용선반2', x: 43, y: 9, w: 4, h: 1, page: 100 },
  ],
});

export const ModalGrid = atom({
  key: 'modalGridState',
  default: [],
  // { i: 'modalA', name: 'modalA', x: 7, y: 3, w: 10, h: 10 }
});

export const ModalShow = atom({
  key: 'modalShowState',
  default: false,
  // { i: 'modalA', name: 'modalA', x: 7, y: 3, w: 10, h: 10 }
});

export const GridPage = atom({ key: 'gridPage', default: 0 });
