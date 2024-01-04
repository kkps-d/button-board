import { Tooltip } from "@nextui-org/react";
import { useState } from "react";

function StandaloneTooltip({ content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tooltip
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      content={content}
      offset={15}
    >
      <span
        onPointerDown={() => setIsOpen(true)}
        onPointerUp={() => setIsOpen(false)}
        className="bg-foreground text-background cursor-help font-bold"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          height: "20px",
          borderRadius: "100%",
          userSelect: "none",
        }}
      >
        ?
      </span>
    </Tooltip>
  );
}

export default StandaloneTooltip;
