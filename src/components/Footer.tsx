import portfolioData from "../data/portfolio.json";

export default function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="py-24 px-6 md:px-12 lg:px-24 border-t border-neutral-100 snap-start">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col gap-4 items-center md:items-start">
          <span className="text-2xl font-bold tracking-tighter uppercase">
            {personal.name}
          </span>
          <p className="text-sm font-mono text-neutral-400 uppercase tracking-widest">
            © {new Date().getFullYear()} / All Rights Reserved
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium uppercase tracking-widest">
          {Object.entries(personal.links).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-neutral-400 transition-colors ${
                key.toLowerCase() === 'linkedin' 
                  ? 'text-sm' 
                  : 'text-[10px] md:text-sm'
              }`}
            >
              {key}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
