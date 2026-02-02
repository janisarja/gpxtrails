'use client';

export default function TwoColumnLayout({ left, right }) {
  return (
    <div className="flex bg-white">
      <div className="w-1/2 overflow-auto p-6 max-h-[calc(100vh-var(--header-height))]">{left}</div>
      <div className="w-1/2 h-[calc(100vh-var(--header-height))]">
        <div className="h-full">{right}</div>
      </div>
    </div>
  );
}
