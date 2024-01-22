import { Node, Edge } from "reactflow";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const basicConnectivityNodes: Node[] = [
  {
    id: "title_1",
    data: {
      label: "Basic",
      type: "title"
    },
    position: { x: 0, y: -550 },
    type: "customNode",
  },
  {
    id: "1a",
    data: {
      label: "Device",
      description:
        "Industrial device (vision systems, robots, CNC, etc) with a PLC connected",
    },
    position: { x: -125, y: 0 },
    type: "customNode",
  },
  {
    id: "1b",
    data: {
      label: "Device",
      description:
        "Industrial device (vision systems, robots, CNC, etc) with a PLC connected",
    },
    position: { x: 125, y: 0 },
    type: "customNode",
  },
  {
    id: "2",
    data: {
      label: "1-Way Edge",
      description:
        "One-way fixed configuration edge device used to transform data and/or compute more complex values from raw device data to reduce data load on the network and storage. Usually placed physically near to the device(s). Can used in a one-to-one (every device has one edge device) or many-to-one (many devices for one edge device) configuration",
    },
    position: { x: 0, y: -100 },
    type: "customNode",
  },
  {
    id: "3",
    data: { label: "Database" },
    position: { x: 0, y: -200 },
    type: "customNode",
  },
  {
    id: "4",
    data: { label: "Analytics" },
    position: { x: 0, y: -300 },
    type: "customNode",
  },
];

const advancedConnectivityNodes: Node[] = [
  {
    id: "title_2",
    data: {
      label: "Advanced",
      type: "title"
    },
    position: { x: 0, y: -550 },
    type: "customNode",
  },
  {
    id: "5a",
    data: {
      label: "Device",
      description:
        "Industrial device (vision systems, robots, CNC, etc) with a PLC connected",
    },
    position: { x: -125, y: 0 },
    type: "customNode",
  },
  {
    id: "5b",
    data: {
      label: "Device",
      description:
        "Industrial device (vision systems, robots, CNC, etc) with a PLC connected",
    },
    position: { x: 125, y: 0 },
    type: "customNode",
  },
  {
    id: "6",
    data: {
      label: "1-Way Edge",
      description:
        "One-way reconfiguration edge device used to transform data and/or compute more complex values from raw device data to reduce data load on the network and storage. Usually placed physically near to the device(s). Can used in a one-to-one (every device has one edge device) or many-to-one (many devices for one edge device) configuration",
    },
    position: { x: 0, y: -100 },
    type: "customNode",
  },
  {
    id: "7",
    data: {
      label: "Data Broker",
    },
    position: { x: 0, y: -200 },
    type: "customNode",
  },
  {
    id: "8",
    data: {
      label: "Database",
    },
    position: { x: 0, y: -300 },
    type: "customNode",
  },
  {
    id: "9",
    data: {
      label: "Analytics",
    },
    position: { x: 0, y: -400 },
    type: "customNode",
  },
];

const wcConnectivityNodes: Node[] = [
  {
    id: "title_3",
    data: {
      label: "World-Class",
      type: "title"
    },
    position: { x: 0, y: -550 },
    type: "customNode",
  },
  {
    id: "10a",
    data: {
      label: "Device",
      description:
      "Industrial device (vision systems, robots, CNC, etc) with a PLC connected",
    },
    position: { x: -125, y: 0 },
    type: "customNode",
  },
  {
    id: "10b",
    data: {
      label: "Device",
      description:
      "Industrial device (vision systems, robots, CNC, etc) with a PLC connected",
    },
    position: { x: 125, y: 0 },
    type: "customNode",
  },
  {
    id: "11",
    data: {
      label: "2-Way Edge",
      description:
      "Two-way reconfiguration edge device used to transform data and/or compute more complex values from raw device data to reduce data load on the network and storage. Usually placed physically near to the device(s). Can used in a one-to-one (every device has one edge device) or many-to-one (many devices for one edge device) configuration",
    },
    position: { x: 0, y: -100 },
    type: "customNode",
  },
  {
    id: "12",
    data: {
      label: "Data Broker",
    },
    position: { x: 0, y: -200 },
    type: "customNode",
  },
  {
    id: "13",
    data: {
      label: "MES",
    },
    position: { x: 200, y: -400 },
    type: "customNode",
  },
  {
    id: "14",
    data: {
      label: "Database",
    },
    position: { x: 0, y: -300 },
    type: "customNode",
  },
  {
    id: "15",
    data: {
      label: "Analytics",
    },
    position: { x: 0, y: -400 },
    type: "customNode",
  },
];

const futureConnectivityNodes: Node[] = [
  {
    id: "title_4",
    data: {
      label: "Future",
      type: "title"
    },
    position: { x: 0, y: -550 },
    type: "customNode",
  },
  {
    id: "16a",
    data: {
      label: "Device",
      description:
      "Industrial device (vision systems, robots, CNC, etc) with a PLC connected",
    },
    position: { x: -125, y: 0 },
    type: "customNode",
  },
  {
    id: "16b",
    data: {
      label: "Device",
      description:
      "Industrial device (vision systems, robots, CNC, etc) with a PLC connected",
    },
    position: { x: 125, y: 0 },
    type: "customNode",
  },
  {
    id: "17",
    data: {
      label: "2-Way Edge",
      description:
      "Two-way reconfiguration edge device used to transform data and/or compute more complex values from raw device data to reduce data load on the network and storage. Usually placed physically near to the device(s). Can used in a one-to-one (every device has one edge device) or many-to-one (many devices for one edge device) configuration",
    },
    position: { x: 0, y: -100 },
    type: "customNode",
  },
  {
    id: "18",
    data: {
      label: "Data Broker",
    },
    position: { x: 0, y: -200 },
    type: "customNode",
  },
  {
    id: "19",
    data: {
      label: "MES",
    },
    position: { x: 200, y: -400 },
    type: "customNode",
  },
  {
    id: "20",
    data: {
      label: "Database",
    },
    position: { x: 0, y: -300 },
    type: "customNode",
  },
  {
    id: "21",
    data: {
      label: "Analytics",
    },
    position: { x: 0, y: -400 },
    type: "customNode",
  },
  {
    id: "22",
    data: {
      label: "IOT Platform",
      width: 440,
      height: 50,
      flipped: true,
    },
    position: { x: -400, y: -205 },
    type: "customNode",
  },
  
]

export const initialNodes: Node[] = [
  ...basicConnectivityNodes,
  ...advancedConnectivityNodes.map((n) => {
    n.position.x = n.position.x + 500;
    return n;
  }),
  ...wcConnectivityNodes.map((n) => {
    n.position.x = n.position.x + 1000;
    return n;
  }),
  ...futureConnectivityNodes.map((n) => {
    n.position.x = n.position.x + 1700;
    return n;
  }),
];

const basicConnectivityEdges: Edge[] = [
  {
    id: "e1",
    source: "1a",
    target: "2",
    type: edgeType,
    animated: true,
  },
  {
    id: "e2",
    source: "1b",
    target: "2",
    type: edgeType,
    animated: true,
  },
  {
    id: "e3",
    source: "2",
    target: "3",
    type: edgeType,
    animated: true,
  },
  {
    id: "e4",
    source: "3",
    target: "4",
    type: edgeType,
    animated: true,
  },
];

const advancedConnectivityEdges: Edge[] = [
  {
    id: "e5",
    source: "5a",
    target: "6",
    type: edgeType,
    animated: true,
  },
  {
    id: "e6",
    source: "5b",
    target: "6",
    type: edgeType,
    animated: true,
  },
  {
    id: "e7",
    source: "6",
    target: "7",
    type: edgeType,
    animated: true,
  },
  {
    id: "e8",
    source: "7",
    target: "8",
    type: edgeType,
    animated: true,
  },
  {
    id: "e9",
    source: "8",
    target: "9",
    type: edgeType,
    animated: true,
  },
];

const wcConnectivityEdges: Edge[] = [
  {
    id: "e10a",
    source: "10a",
    target: "11",
    type: edgeType,
    animated: true,
    sourceHandle: "left-top-source",
    targetHandle: "top-left-target",
  },
  {
    id: "e10a-reverse",
    source: "11",
    target: "10a",
    type: edgeType,
    animated: true,
    sourceHandle: "bottom-left-source",
    targetHandle: "right-top-target",
  },
  {
    id: "e10b",
    source: "10b",
    target: "11",
    type: edgeType,
    animated: true,
    sourceHandle: "right-top-source",
    targetHandle: "top-right-target",
  },
  {
    id: "e10b-reverse",
    source: "11",
    target: "10b",
    type: edgeType,
    animated: true,
    sourceHandle: "bottom-right-source",
    targetHandle: "left-top-target",
  },
  {
    id: "e11",
    source: "11",
    target: "12",
    type: edgeType,
    animated: true,
    sourceHandle: "left-top-source",
    targetHandle: "left-bottom-target",
  },
  {
    id: "e11-reverse",
    source: "12",
    target: "11",
    type: edgeType,
    animated: true,
    sourceHandle: "right-bottom-source",
    targetHandle: "right-top-target",
  },
  {
    id: "e12",
    source: "12",
    target: "13",
    type: edgeType,
    animated: true,
    sourceHandle: "top-right-source",
    targetHandle: "left-bottom-target",
  },
  {
    id: "e12-reverse",
    source: "13",
    target: "12",
    type: edgeType,
    animated: true,
    sourceHandle: "right-bottom-source",
    targetHandle: "bottom-right-target",
  },
  {
    id: "e13",
    source: "12",
    target: "14",
    type: edgeType,
    animated: true,
    sourceHandle: "middle-top-source",
    targetHandle: "middle-bottom-target",
  },
  {
    id: "e14",
    source: "14",
    target: "15",
    type: edgeType,
    animated: true,
  },
];

const futureConnectivityEdges: Edge[] = [
  {
    id: "e15a",
    source: "16a",
    target: "17",
    type: edgeType,
    animated: true,
    sourceHandle: "left-top-source",
    targetHandle: "top-left-target",
  },
  {
    id: "e15a-reverse",
    source: "17",
    target: "16a",
    type: edgeType,
    animated: true,
    sourceHandle: "bottom-left-source",
    targetHandle: "right-top-target",
  },
  {
    id: "e15b",
    source: "16b",
    target: "17",
    type: edgeType,
    animated: true,
    sourceHandle: "right-top-source",
    targetHandle: "top-right-target",
  },
  {
    id: "e15b-reverse",
    source: "17",
    target: "16b",
    type: edgeType,
    animated: true,
    sourceHandle: "bottom-right-source",
    targetHandle: "left-top-target",
  },
  {
    id: "e16",
    source: "17",
    target: "18",
    type: edgeType,
    animated: true,
    sourceHandle: "left-top-source",
    targetHandle: "left-bottom-target",
  },
  {
    id: "e16-reverse",
    source: "18",
    target: "17",
    type: edgeType,
    animated: true,
    sourceHandle: "right-bottom-source",
    targetHandle: "right-top-target",
  },
  {
    id: "e17",
    source: "18",
    target: "19",
    type: edgeType,
    animated: true,
    sourceHandle: "top-right-source",
    targetHandle: "left-bottom-target",
  },
  {
    id: "e17-reverse",
    source: "19",
    target: "18",
    type: edgeType,
    animated: true,
    sourceHandle: "right-bottom-source",
    targetHandle: "bottom-right-target",
  },
  {
    id: "e18",
    source: "18",
    target: "20",
    type: edgeType,
    animated: true,
    sourceHandle: "middle-top-source",
    targetHandle: "middle-bottom-target",
  },
  {
    id: "e19",
    source: "20",
    target: "21",
    type: edgeType,
    animated: true,
  },
];

export const initialEdges: Edge[] = [
  ...basicConnectivityEdges,
  ...advancedConnectivityEdges,
  ...wcConnectivityEdges,
  ...futureConnectivityEdges
];
