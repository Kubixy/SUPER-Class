import React, { useState, useEffect } from "react";
import { useUserTools } from "../../../context/UserToolsProvider";

import "./DrawAndResize.scss";

export default function DrawAndResize(props) {
  const { children, index, position } = props;
  const { updatePositionRecord } = useUserTools();
  const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState([0, 0]);
  const [isDown, setIsDown] = useState(false);

  const container = document.getElementById("movingContainer" + index);
  const item = document.getElementById("item" + index);
  const panel = document.getElementsByClassName("panel")[0];
  const windowResolution = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const mousedown = (e) => {
    setIsDown(true);
    if (offset)
      setOffset([
        container.offsetLeft - e.clientX,
        container.offsetTop - e.clientY,
      ]);
  };

  const mouseup = () => {
    setIsDown(false);
  };

  const mousemove = (e) => {
    if (isDown) {
      if (position)
        setItemPosition({
          x: e.clientX + offset[0],
          y: e.clientY + offset[1],
        });
      container.style.left = fixLimits(e.clientX + offset[0], "x") + "px";
      container.style.top = fixLimits(e.clientY + offset[1], "y") + "px";
    }
  };

  const fixLimits = (value, axis) => {
    if (axis === "y" && value + item.clientHeight > panel.clientHeight)
      return panel.clientHeight - item.clientHeight;
    else if (axis === "x" && value + item.clientWidth > panel.clientWidth)
      return panel.clientWidth - item.clientWidth;

    return value > 0 ? value : 0;
  };

  useEffect(() => {
    if (container && position) {
      if (position.x > -1) {
        container.style.left = position.x + "px";
        container.style.top = position.y + "px";

        setItemPosition({
          x: position.x,
          y: position.y,
        });
      } else {
        let firstPositionX = windowResolution.width / 2 - item.clientWidth / 2;
        let firstPositionY =
          windowResolution.height / 2 - item.clientHeight / 2;

        container.style.left = firstPositionX + "px";
        container.style.top = firstPositionY + "px";

        setItemPosition({
          x: firstPositionX,
          y: firstPositionY,
        });
      }

      container.style.zIndex = 1;
    } else if (container && !position) {
      container.style.left = 25 + "px";
      container.style.top = 125 + "px";
      container.style.zIndex = 2;
      setItemPosition({
        x: 25,
        y: 125,
      });
    }
  }, [position, index, container]);

  useEffect(() => {
    function handleWindowResize() {
      if (container) {
        container.style.left =
          fixLimits(
            itemPosition.x - (windowResolution.width - window.innerWidth),
            "x"
          ) + "px";
        container.style.top =
          fixLimits(
            itemPosition.y - (windowResolution.height - window.innerHeight),
            "y"
          ) + "px";
      }
    }
    window.addEventListener("resize", handleWindowResize);
  });

  return (
    <div
      className="movingContainerClass"
      id={"movingContainer" + index}
      onMouseDown={(e) => {
        mousedown(e);
      }}
      onMouseUp={() => {
        if (position)
          updatePositionRecord(index, { x: itemPosition.x, y: itemPosition.y });
        mouseup();
      }}
      onMouseMove={(e) => {
        mousemove(e);
      }}
    >
      {children}
    </div>
  );
}
