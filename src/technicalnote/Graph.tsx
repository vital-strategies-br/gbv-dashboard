import React, { useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

function Graph(props: any) {
  const fgRef = useRef<any>();
  const [hoveredLink, setHoveredLink] = useState<any>(null);

  const edgeColorMap: Record<string, string> = {
    rel_inheritance: "#c0392b", // deep red (complements node)
    rel_subframe: "#2980b9", // clean blue
    rel_using: "#27ae60", // health/logic green
    rel_see_also: "#f39c12", // amber / attention
    rel_reframing_mapping: "#8e44ad", // royal purple
    rel_inchoative_of: "#d35400", // reddish orange
    rel_causative_of: "#16a085", // teal
    rel_perspective_on: "#7f8c8d", // muted grey
    rel_metaphorical_projection: "#e91e63", // hot pink / metaphorical
    rel_precedes: "#2c3e50", // dark navy (temporal)
  };
  const edgeLabelMap: Record<string, string> = {
    rel_inheritance: "herança",
    rel_subframe: "subframe",
    rel_using: "usa",
    rel_see_also: "ver também",
    rel_reframing_mapping: "mapeamento reframing",
    rel_inchoative_of: "incoativo",
    rel_causative_of: "causativo",
    rel_perspective_on: "perspectiva",
    rel_metaphorical_projection: "projeção metafórica",
    rel_precedes: "precede",
  };

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={props.data}
      width={700}
      height={400}
      nodeColor={() => "#8e1921"}
      nodeRelSize={6}
      linkColor={(link: any) => edgeColorMap[link.type] || "#999999"}
      linkWidth={(link: any) => (link === hoveredLink ? 4 : 2)}
      onLinkHover={setHoveredLink}
      linkCanvasObjectMode={() => "after"}
      linkCanvasObject={(link, ctx, globalScale) => {
        if (link === hoveredLink) {
          const start = link.source;
          const end = link.target;
          if (typeof start !== "object" || typeof end !== "object") return;

          const x = (start.x + end.x) / 2;
          const y = (start.y + end.y) / 2;

          const label = edgeLabelMap[link.type] || link.type;
          const fontSize = 12;
          const padding = 4;

          ctx.save();
          ctx.font = `${fontSize}px Sans-Serif`;

          // Invert the scale to prevent zoom scaling
          ctx.translate(x, y);
          ctx.scale(1 / globalScale, 1 / globalScale);

          const textWidth = ctx.measureText(label).width;
          const rectWidth = textWidth + padding * 2;
          const rectHeight = fontSize + padding * 2;

          // Background
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);

          ctx.shadowColor = "rgba(0,0,0,0.2)";
          ctx.shadowBlur = 1.5;

          // Optional border
          ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
          ctx.lineWidth = 1;
          ctx.strokeRect(
            -rectWidth / 2,
            -rectHeight / 2,
            rectWidth,
            rectHeight
          );

          // Text
          ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(label, 0, 0);

          ctx.restore();
        }
      }}
      nodeCanvasObjectMode={() => "after"}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = 12 / globalScale;

        if (globalScale > 1.5) {
          ctx.save();
          ctx.font = `${fontSize}px Sans-Serif`;

          // Measure text width
          const textWidth = ctx.measureText(label).width;
          const padding = 4 / globalScale;
          const rectWidth = textWidth + padding * 2;
          const rectHeight = fontSize + padding * 2;

          // Draw background rectangle (white with slight transparency)
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fillRect(
            node.x! - rectWidth / 2,
            node.y! - rectHeight / 2,
            rectWidth,
            rectHeight
          );

          // Optional: Draw border around label background
          ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
          ctx.lineWidth = 1 / globalScale;
          ctx.strokeRect(
            node.x! - rectWidth / 2,
            node.y! - rectHeight / 2,
            rectWidth,
            rectHeight
          );

          ctx.shadowColor = "rgba(0,0,0,0.2)";
          ctx.shadowBlur = 1.5;

          // Draw the actual label
          ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(label, node.x!, node.y!);

          ctx.restore();
        }
      }}
      linkDirectionalArrowLength={10}
      linkDirectionalArrowRelPos={0.8}
    />
  );
}

export default Graph;
