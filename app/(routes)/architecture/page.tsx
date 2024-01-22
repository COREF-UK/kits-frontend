import ArchitectureDiagram from "@/app/_components/architectureDiagram";
import { initialEdges, initialNodes } from "@/app/_lib/connectivity_architecture";

export default function Page() {
    return <ArchitectureDiagram initialNodes={initialNodes} initialEdges={initialEdges}></ArchitectureDiagram>
}