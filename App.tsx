import * as React from 'react';
import './style.css';

// Shapes
interface Coordinate {
  x: number;
  y: number;
}

type CoordinateContainer = [] | Coordinate[];

// Components
const Circle = ({ coord }) => {
  return (
    <div
      className={'circle'}
      style={{ left: `${coord.x}px`, top: `${coord.y}px` }}
    ></div>
  );
};

const Navigation = ({ handleUndo, handleReset, handleRedo, count }) => {
  return (
    <div className={'navigation'}>
      <p className={'count'}>Circle Count: {count > 0 ? count : ''} </p>
      <button onClick={handleUndo}>⟲</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleRedo}>⟳</button>
    </div>
  );
};


export default function App() {
  const [coordContainer, setCoordContainer] = React.useState<CoordinateContainer>([]);
  const [previousCoords, setPreviousCoords] = React.useState<CoordinateContainer>([]);

  const handleCoordContainer = (e) => {
    const newCoord: Coordinate = { x: e.clientX, y: e.clientY };
    const updatedCoordContainer: CoordinateContainer = [
      ...coordContainer,
      newCoord,
    ];

    setCoordContainer(updatedCoordContainer);
  };

  const handleReset = () => {
    setCoordContainer([])
  }

  const handleUndo = () => {
    if (coordContainer.length > 0) {
      const updatedCoordContainer: CoordinateContainer = [...coordContainer]
      const recentCoord: Coordinate = updatedCoordContainer.pop()
  
      const updatedPreviousCoords: CoordinateContainer = [...previousCoords, recentCoord]
      
      setCoordContainer(updatedCoordContainer)
      setPreviousCoords(updatedPreviousCoords)
    }
  }

  const handleRedo = () => {
    if (previousCoords.length > 0) {
      const updatedPreviousCoords = [...previousCoords]
      const recentCoord: Coordinate = updatedPreviousCoords.pop()
    
      const updatedCoordContainer: CoordinateContainer = [...coordContainer, recentCoord]
  
      setCoordContainer(updatedCoordContainer)
      setPreviousCoords(updatedPreviousCoords)
    }

  }

  return (
    <div>
      <Navigation handleReset={handleReset} handleUndo={handleUndo} handleRedo={handleRedo} count={coordContainer.length}/>
      <div className={'app'} onClick={handleCoordContainer}>
        {coordContainer.map((coord: Coordinate) => {
          return (
            <React.Fragment key={coord.x * coord.y + coordContainer.indexOf(coord)}>
              <Circle coord={coord} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
