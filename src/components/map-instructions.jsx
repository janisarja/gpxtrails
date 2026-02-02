import { useState } from 'react';
<<<<<<< HEAD
import ButtonSmall from './button-small';
=======
>>>>>>> 6f21278 (Refactor editor and move editor to /trails/new)

const MapInstructions = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div>
      <ButtonSmall 
        onClick={() => setShowInstructions(!showInstructions)}
        text="Help" 
      />
      <p className="mt-2 text-sm text-gray-600">
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
