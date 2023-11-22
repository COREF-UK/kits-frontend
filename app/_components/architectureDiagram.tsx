"use client";

import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Position,
} from "reactflow";
import dagre from "@dagrejs/dagre";
import "reactflow/dist/style.css";

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const initialNodes: Node[] = [
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

const initialEdges: Edge[] = [
  { id: 'e1', source: '1a', target: '2', type: edgeType, animated: true },
  { id: 'e2', source: '1b', target: '2', type: edgeType, animated: true },
  { id: 'e3', source: '2', target: '3', type: edgeType, animated: false,  },
  { id: 'e4', source: '3', target: '4', type: edgeType, animated: true },
];


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "BT"
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Bottom;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Top;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        panOnDrag={false}
        maxZoom={1}
        minZoom={1}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      ></ReactFlow>
    </div>
  );
};

export default LayoutFlow;
