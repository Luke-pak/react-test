import { atom } from 'recoil';

export const WindowSize = atom({
  key: 'windowSize',
  default: { width: 1920, height: 920 },
});

export const GridWidth = atom({
  key: 'gridWidth',
  default: window.innerWidth * (9.5 / 12),
});

//1
export const Grid = atom({
  key: 'gridState',
  default: [
    { i: 'a', name: 'a', x: 3, y: 0, w: 2, h: 2, page: 1 },
    { i: 'b', name: 'b', x: 1, y: 0, w: 2, h: 2, page: 2 },
    { i: 'c', name: 'c', x: 4, y: 5, w: 2, h: 2 },

    { i: 'd', name: 'd', x: 24, y: 0, w: 2, h: 1, page: 100 },
    { i: 'e', name: 'e', x: 24, y: 1, w: 2, h: 1, page: 100 },
    { i: 'f', name: 'f', x: 24, y: 2, w: 2, h: 1, page: 100 },
    { i: 'g', name: 'g', x: 24, y: 3, w: 2, h: 1, page: 100 },
  ],
});

export const ModalGrid = atom({
  key: 'modalGridState',
  default: [],
});

export const GridPage = atom({ key: 'gridPage', default: 0 });
