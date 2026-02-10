'use client';

export default function TwoColumnLayout({ left, right }) {
  return (
    <div className="flex bg-white">
      <div className="w-2/5 min-w-0 overflow-auto p-6 max-h-[calc(100vh-var(--header-height))] break-words">{left}</div>
      <div className="w-3/5 h-[calc(100vh-var(--header-height))]">
        <div className="h-full">{right}</div>
      </div>
    </div>
  );
}
