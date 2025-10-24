const HUDCorners = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-ember/60" />
      <span className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-ember/60" />
      <span className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-ember/60" />
      <span className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-ember/60" />
    </div>
  );
};

export default HUDCorners;

