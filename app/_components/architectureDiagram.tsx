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
  Handle,
  HandleType,
  NodeProps,
  useOnViewportChange,
  Viewport,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import dagre from "@dagrejs/dagre";
import "reactflow/dist/style.css";
import { Tooltip } from "react-tooltip";
import { useEffect, useRef } from "react";

const CustomNodeComponent = (props: NodeProps) => {
  const handles = [];

  // order of matters as it dictates the default handle
  for (let side of ["middle", "left", "right"]) {
    for (let type of ["target" as HandleType, "source" as HandleType]) {
      for (let positionChoice of [true, false]) {
        const position = [Position.Top, Position.Bottom][
          (type === "target" ? positionChoice : !positionChoice) ? 1 : 0
        ];

        handles.push(
          <Handle
            key={
              side + "-" + position.toString().toLocaleLowerCase() + "-" + type
            }
            isConnectable={false}
            type={type}
            position={position}
            id={
              side + "-" + position.toString().toLocaleLowerCase() + "-" + type
            }
            style={{
              transform: `translate(${
                side === "middle" ? "0" : side === "left" ? "-10px" : "10px"
              }, 0)`,
              borderRadius: 0,
              opacity: 0,
            }}
          />
        );
      }
    }
  }

  for (let side of ["middle", "top", "bottom"]) {
    for (let type of ["target" as HandleType, "source" as HandleType]) {
      for (let positionChoice of [true, false]) {
        const position = [Position.Left, Position.Right][
          (type === "target" ? positionChoice : !positionChoice) ? 1 : 0
        ];

        handles.push(
          <Handle
            key={
              side + "-" + position.toString().toLocaleLowerCase() + "-" + type
            }
            isConnectable={false}
            type={type}
            position={position}
            id={
              side + "-" + position.toString().toLocaleLowerCase() + "-" + type
            }
            style={{
              transform: `translate(0, ${
                side === "middle" ? "-3px" : side === "top" ? "-12px" : "6px"
              })`,
              borderRadius: 0,
              opacity: 0,
            }}
          />
        );
      }
    }
  }

  return (
    <div
      className="react-flow__node-default flex justify-center items-center"
      data-tooltip-id={`architecture-${props.id}`}
      data-tooltip-content={props.data.description ?? ""}
      style={{
        height: props.data.height ?? 40,
        width: props.data.width ?? 150,
        transform: `rotate(${props.data.flipped ? "-90deg" : 0})`,
        backgroundColor: props.data.type === "title" ? "transparent" : "",
        color: props.data.type === "title" ? "white" : "",
        border: props.data.type === "title" ? "none" : "",
      }}
    >
      {/* your node content */}
      {props.data.description && (
        <Tooltip
          key={`architecture-${props.id}`}
          className="max-w-xl"
          id={`architecture-${props.id}`}
          place="bottom"
          variant="light"
          // clickable={true}
        ></Tooltip>
      )}
      <h2
        style={
          props.data.type === "title"
            ? { fontSize: "30px", whiteSpace: "nowrap" }
            : {}
        }
      >
        {props.data.label}
      </h2>
      {handles}
    </div>
  );
};

function Flow({
  initialNodes,
  initialEdges,
}: {
  initialNodes: Node[];
  initialEdges: Edge[];
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const flowDiagram = useReactFlow();

  const handleResize = () => {
    console.log('here')
    flowDiagram.fitView({nodes});
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ReactFlow
      proOptions={{ hideAttribution: true }}
      nodeTypes={{
        customNode: CustomNodeComponent,
      }}
      nodes={nodes}
      edges={edges}
      panOnDrag={false}
      maxZoom={1}
      minZoom={0.1}
      zoomOnScroll={false}
      fitViewOptions={{ nodes }}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView={true}
    ></ReactFlow>
  );
}

export default function LayoutFlow({
  initialNodes,
  initialEdges,
}: {
  initialNodes: Node[];
  initialEdges: Edge[];
}) {
  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <ReactFlowProvider>
        <Flow initialNodes={initialNodes} initialEdges={initialEdges}></Flow>
      </ReactFlowProvider>
    </div>
  );
}
