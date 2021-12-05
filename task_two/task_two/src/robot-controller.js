import React, { useState } from 'react';

function RobotController() {

  const sideLength = 5;
  const directions = [
    "NORTH",
    "EAST",
    "SOUTH",
    "WEST"
  ];
  const directionEmoji = [
    "☝",  // NORTH
    "👉",  // EAST
    "👇",  // SOUTH
    "👈",  // WEST
  ];

  // state hooks
  const [positionDirection, setPositionDirection] = useState({ x: -1, y: -1, facing: -1 });
  const [message, setMessage] = useState({ code: -1, text: "" });
  const [command, setCommand] = useState("");

  const isInitialised = () => {
    if (positionDirection.x === -1 || positionDirection.y === -1) {
      return false;
    }
    return true;
  }

  // possible commands are place(), move(), left(), right(), report()

  const place = (x, y, facing) => {
    if (x >= 0 && x < sideLength && y >= 0 && y < sideLength) {
      setPositionDirection({ x: x, y: y, facing: facing });
    } else {
      setMessage({ code: 0, text: 'Coordinate choosen not on grid' });
    }
  }

  const move = () => {
    if (!isInitialised()) {
      return;
    }
    let newPosition = {
      x: positionDirection.x,
      y: positionDirection.y,
      facing: positionDirection.facing
    }
    // increment by 1 in current facing direction
    switch (positionDirection.facing) {
      case 0:
        newPosition.y++;
        break;
      case 1:
        newPosition.x++;
        break;
      case 2:
        newPosition.y--;
        break;
      case 3:
        newPosition.x--;
        break;
      default:
    }
    // checks if move is possible
    if (newPosition.x >= 0 && newPosition.x < sideLength &&
      newPosition.y >= 0 && newPosition.y < sideLength) {
      setPositionDirection(newPosition);
    } else {
      setMessage({ code: 0, text: 'Robot falls off the grid!' });
    }
  }

  const left = () => {
    if (!isInitialised()) {
      return;
    }
    setPositionDirection({
      x: positionDirection.x,
      y: positionDirection.y,
      facing: (positionDirection.facing - 1 + 4) % 4
    });
  }

  const right = () => {
    if (!isInitialised()) {
      return;
    }
    setPositionDirection({
      x: positionDirection.x,
      y: positionDirection.y,
      facing: (positionDirection.facing + 1) % 4
    });
  }

  const report = () => {
    if (!isInitialised()) {
      return;
    }
    setMessage({
      code: 1,
      text: `Robot is at (${positionDirection.x},${positionDirection.y}) and facing ${directions[positionDirection.facing]}`
    });
  }

  const handleSubmit = () => {
    if (command === "move()") {
      move();
    }
    else if (command === "left()") {
      left();
    }
    else if (command === "right()") {
      right();
    }
    else if (command === "report()") {
      report();
    }
    // input is assumed to be a recognised command
    else {
      // parsing the place() command
      const parsedCommand = command.split(", ");
      place(
        parseInt(parsedCommand[0][parsedCommand[0].length - 1]),
        parseInt(parsedCommand[1][parsedCommand[1].length - 1]),
        directions.indexOf(parsedCommand[2].substring(1, parsedCommand[2].length - 2))
      )
    }
  }

  return (
    <>
      <div className="tabletop">
        {(() => {
          // length of grid side
          let returnGrid = [];
          for (let i = sideLength - 1; i >= 0; i--) {
            returnGrid.push(<div className="grid-row">{(() => {
              let returnRow = [];
              for (let j = 0; j < sideLength; j++) {
                if (positionDirection.x === j && positionDirection.y === i) {
                  returnRow.push(
                    <div className="grid-element" data-x={j} data-y={i}>
                      <div className="direction-emoji">{directionEmoji[positionDirection.facing]}</div>
                      <div className="element-label">({j},{i})</div>
                    </div>
                  )
                } else {
                  returnRow.push(
                    <div className="grid-element" data-x={j} data-y={i}>
                      <div className="element-label">({j},{i})</div>
                    </div>)
                }
              }
              return returnRow;
            })()
            }</div>);
          }
          return returnGrid;
        })()}
      </div>
      <div className="message-input-container">
        <div className={
          message.code === 1
            ? 'message message-success'
            : message.code === 0
              ? 'message message-failure'
              : ''}>{message.text}</div>
        <div>
          <br />
          <input
            className="command-input"
            placeholder="Type a command here"
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
          <input
            className="command-input-submit"
            type="submit"
            onClick={(e) => handleSubmit()}
          />
        </div>
      </div>
    </>
  )

}

export default RobotController;
