const Logo = ({ className = '' }) => {
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded border border-ember/60 bg-steel/60 ${className}`} aria-label="RedOffset">
      <span className="sr-only">RedOffset</span>
      <svg
        className="h-6 w-6 text-ember"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
      >
        {/* Crown */}
        <path d="M8.5 8.5c.2-2 1.9-3.5 3.5-3.5s3.3 1.5 3.5 3.5l.9 4.2H7.6l.9-4.2Z" />
        {/* Brim */}
        <path d="M2.5 16c0-1.6 3-2.5 5.5-2.5h8c2.5 0 5.5.9 5.5 2.5 0 .4-.2.8-.6 1-1.9 1.2-15.9 1.2-17.8 0-.4-.2-.6-.6-.6-1Z" />
      </svg>
    </div>
  );
};

export default Logo;

