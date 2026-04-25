import { useRef } from "react";
import { toPng } from "html-to-image";
import { Download, Share2 } from "lucide-react";

interface TicketProps {
  guestName: string;
  ticketId: string;
}

const VirtualTicket = ({ guestName, ticketId }: TicketProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (ticketRef.current === null) return;
    
    try {
      const dataUrl = await toPng(ticketRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `Solomon70-Ticket-${guestName.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate ticket:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-12 w-full">
      {/* Hidden Ticket Container (Off-screen) */}
      <div className="absolute left-[-9999px] top-0">
        <div 
          ref={ticketRef}
          className="w-[400px] h-[600px] bg-[#0a0e2e] p-8 flex flex-col items-center justify-between border-[6px] border-[#c9a84c] relative overflow-hidden"
          style={{ backgroundImage: "radial-gradient(circle at center, #1a1f45 0%, #0a0e2e 100%)" }}
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#c9a84c] opacity-50" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#c9a84c] opacity-50" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#c9a84c] opacity-50" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#c9a84c] opacity-50" />

          {/* Ticket Content */}
          <div className="text-center flex flex-col items-center gap-4 mt-8">
            <span className="text-[#c9a84c] text-xs uppercase tracking-[.4em] font-medium">Official Invitation</span>
            <h1 className="text-[#f5e6c0] text-3xl font-bold tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              SOLOMON @ 70
            </h1>
            <div className="h-[1px] w-24 bg-[#c9a84c] opacity-40" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-[#c9a84c] text-[10px] uppercase tracking-widest">Guest Entrance</span>
            <h2 className="text-[#f5e6c0] text-2xl font-semibold uppercase text-center px-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {guestName}
            </h2>
          </div>

          <div className="flex flex-col items-center gap-6">
            {/* Visual Indicator of 70 */}
            <div className="text-[#c9a84c] text-6xl font-black opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-150 select-none">
              70
            </div>
            
            <div className="text-center">
              <p className="text-[#f5e6c0] text-sm mb-1 uppercase tracking-tighter">October 17, 2025</p>
              <p className="text-[#c9a84c] text-[10px] uppercase tracking-widest opacity-80">Lagos Country Club</p>
            </div>
          </div>

          {/* Ticket ID / Security Code */}
          <div className="w-full flex flex-col items-center gap-2 mb-8">
            <div className="h-[1px] w-full bg-dashed bg-[#c9a84c] opacity-20 border-t border-dashed" />
            <div className="flex justify-between w-full px-4 mt-2">
              <span className="text-[#c9a84c] text-[8px] uppercase tracking-widest">Security ID</span>
              <span className="text-[#f5e6c0] text-[8px] font-mono tracking-wider">{ticketId.slice(0, 8).toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visible Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-[400px]">
        <button 
          onClick={downloadTicket}
          className="flex-1 flex items-center justify-center gap-3 bg-[#c9a84c] text-[#0a0e2e] py-4 px-6 rounded-full font-bold uppercase text-xs tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl"
        >
          <Download className="w-4 h-4" />
          Download Ticket
        </button>
        
        <button 
           onClick={() => {
             if (navigator.share) {
               navigator.share({
                 title: 'Solomon @ 70 Ticket',
                 text: `I'm attending Solomon Olusegun Ojo's 70th Birthday! My ticket ID: ${ticketId.slice(0, 8).toUpperCase()}`,
                 url: window.location.href,
               });
             } else {
               alert('Sharing is not supported on this browser. Please download the ticket.');
             }
           }}
           className="flex-1 flex items-center justify-center gap-3 border border-[#c9a84c] text-[#c9a84c] py-4 px-6 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#c9a84c] hover:text-[#0a0e2e] transition-all"
        >
          <Share2 className="w-4 h-4" />
          Share Event
        </button>
      </div>
    </div>
  );
};

export default VirtualTicket;
