const GrainOverlay = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {/* Top-Left Ambient Radial Spotlight */}
      <div
        className="fixed -top-48 -left-48 w-[520px] h-[520px] rounded-full blur-[140px] opacity-[0.07]"
        style={{ background: 'var(--accent-hex)' }}
      />

      {/* Bottom-Right Secondary Ambient Spotlight */}
      <div
        className="fixed -bottom-56 -right-48 w-[560px] h-[560px] rounded-full blur-[160px] opacity-[0.06]"
        style={{ background: 'var(--accent-secondary-hex)' }}
      />

      {/* Subtle SVG Film Grain Overlay */}
      <div className="noise-bg" />
    </div>
  );
};

export default GrainOverlay;
