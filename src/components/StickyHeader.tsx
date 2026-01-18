import meeKadhaLogo from '@/assets/mee-kadha-logo.jpeg';

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
        <img 
          src={meeKadhaLogo} 
          alt="MEE KADHA" 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-md ring-2 ring-white/20"
        />
        <span className="hidden sm:block font-serif text-lg font-semibold text-gradient">
          MEE KADHA
        </span>
      </button>
    </header>
  );
};

export default StickyHeader;
