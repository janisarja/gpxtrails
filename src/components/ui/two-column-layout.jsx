'use client';

const TwoColumnLayout = ({
  left,
  right,
  leftLabel = 'Primary content',
  rightLabel = 'Secondary content'
}) => {
  return (
    <div className="flex bg-white">
      <section
        className="w-2/5 min-w-0 overflow-auto p-6 max-h-[calc(100vh-var(--header-height))] break-words"
        aria-label={leftLabel}
      >
        {left}
      </section>
      <section
        className="w-3/5 h-[calc(100vh-var(--header-height))]"
        aria-label={rightLabel}
      >
        <div className="h-full">{right}</div>
      </section>
    </div>
  );
}

export default TwoColumnLayout;
