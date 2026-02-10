import { useId, useState } from 'react';
import ButtonSmall from '@/src/components/ui/button-small';

const MapInstructions = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsId = useId();
  const titleId = useId();

  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId} className="sr-only">Map instructions</h2>
      <ButtonSmall 
        onClick={() => setShowInstructions(!showInstructions)}
        aria-expanded={showInstructions}
        aria-controls={instructionsId}
        text="Help" 
      />
      <p
        id={instructionsId}
        className="mt-2 text-sm text-gray-600"
        hidden={!showInstructions}
      >
        In draw mode click on one of the ends to start drawing. Click on any point to stop drawing. Click and drag points to move them. Add more points in the middle of the line by clicking and dragging on them. In erase mode click on points to delete them. Use button in top left corner to switch between draw mode and erase mode. You must add atleast two points before switching to erase mode.
      </p>
    </section>
  );
}

export default MapInstructions;
