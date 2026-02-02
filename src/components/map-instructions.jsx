import { useState } from 'react';

const MapInstructions = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div>
      <button onClick={() => {
        console.log('click!')
          setShowInstructions(!showInstructions)
      }}>
        Help
      </button>
      <p>
        {showInstructions ?
            ('In draw mode click on one of the ends to start drawing. Click on any point to stop drawing. Click and drag points to move them. Add more points in the middle of the line by clicking and dragging on them. In erase mode click on points to delete them. Use button in top left corner to switch between draw mode and erase mode. You must add atleast two points before switching to erase mode.')
          :
            ('')
        }
      </p>
    </div>
  );
}

export default MapInstructions;
