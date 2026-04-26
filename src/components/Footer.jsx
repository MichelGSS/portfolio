
const Footer = () => {
  return (
    <footer className="py-8 px-8 border-t border-borderDark bg-primary text-center">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-textTertiary font-mono text-xs">
          Built with React + Tailwind CSS
        </p>
        <p className="text-textTertiary font-mono text-xs">
          © 2026 Michel Silveira
        </p>
      </div>
    </footer>
  );
};

export default Footer;