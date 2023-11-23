const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes = [
  {
    id: '1a',
    data: { label: 'Device' },
    position,
  },
  {
    id: '1b',
    data: { label: 'Device' },
    position,
  },
  {
    id: '2',
    data: { label: 'Edge' },
    position,
  },
  {
    id: '3',
    data: { label: 'Database' },
    position,
  },
  {
    id: '4',
    data: { label: 'Analytics' },
    position,
  },
];

export const initialEdges = [
  { id: 'e1', source: '1a', target: '2', type: edgeType, animated: true },
  { id: 'e2', source: '1b', target: '2', type: edgeType, animated: true },
  { id: 'e3', source: '2', target: '3', type: edgeType, animated: true },
  { id: 'e3', source: '3', target: '2', type: edgeType, animated: true },
  { id: 'e4', source: '3', target: '4', type: edgeType, animated: true },
];
