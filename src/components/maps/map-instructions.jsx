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
        If you start with an empty map, drawing is active right away and the draw/erase button is visible. If you load a GPX trail, the map starts in view mode. Click the trail to enter edit mode for a local section around where you clicked. In draw mode you can move points and insert new points inside the editable section, and you can only append new points when the editable section reaches the start or end of the full trail. In erase mode click points in the editable section to delete them. Click outside the trail to return to view mode.
      </p>
    </section>
  );
}

export default MapInstructions;
