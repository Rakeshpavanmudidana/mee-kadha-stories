import meeKadhaLogo from '@/assets/mee-kadha-logo.png';

interface StickyHeaderProps {
  onLogoClick?: () => void;
}

const StickyHeader = ({ onLogoClick }: StickyHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-3 px-4 flex justify-center items-center bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
      <button
        onClick={onLogoClick}
        className="flex items-center gap-2 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full"
        title="Back to home"
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 overflow-hidden">
          <img 
            src={meeKadhaLogo} 
            alt="MEE KADHA" 
            className="w-full h-full object-contain"
          />
        </div>
        <span className="hidden sm:block font-serif text-lg font-semibold text-gradient">
          MEE KADHA
        </span>
      </button>
    </header>
  );
};

export default StickyHeader;
