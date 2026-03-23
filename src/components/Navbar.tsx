export default function Navbar() {
  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="w-full h-16 flex items-center px-12 lg:px-24 justify-between">

        <a
          href="#lead-capture"
          aria-label="Get early access to PIC platform"
          className="font-body font-bold text-sm uppercase tracking-widest text-white bg-navy hover:bg-navy-hover active:bg-navy-active transition-colors duration-150 rounded-md min-w-[180px] h-[40px] flex items-center justify-center"
        >
          Contact Us
        </a>

        <span aria-label="PIC - Parties & Events Platform" className="font-display font-bold text-navy uppercase tracking-[0.2em] text-xl select-none">
          PIC
        </span>

      </div>
    </nav>
  );
}
