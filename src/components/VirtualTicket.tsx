import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Share2, Loader2, Calendar } from "lucide-react";
import QRCode from "react-qr-code";
import { EVENT_CONFIG } from "../config/eventConfig";

interface TicketProps {
  guestName?: string;
  ticketId?: string;
  isBlank?: boolean;
}

const VirtualTicket = ({ guestName = "", ticketId = "", isBlank = false }: TicketProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadTicket = async () => {
    if (ticketRef.current === null || isDownloading) return;
    setIsDownloading(true);
    
    try {
      const dataUrl = await toPng(ticketRef.current, { 
        cacheBust: true,
        pixelRatio: 3 // Exports at 3x resolution (1200x1800) for sharp printing quality
      });
      const link = document.createElement("a");
      const nameForFile = isBlank ? "Template" : guestName.replace(/\s+/g, "-");
      link.download = `Solomon70-Invitation-${nameForFile}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate invitation card:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const addToCalendar = () => {
    const event = {
      title: "Solomon @ 70",
      description: `Your VIP Ticket ID: ${ticketId.slice(0, 8).toUpperCase()}\\nWe look forward to celebrating with you!`,
      location: "Lagos Country Club, Ikeja",
      startDate: EVENT_CONFIG.calendarStartDate,
      endDate: EVENT_CONFIG.calendarEndDate
    };
    
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${event.startDate}`,
      `DTEND:${event.endDate}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");
    
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "solomon_70.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Card Content JSX helper to avoid duplicate code between offscreen and onscreen preview
  const CardContent = ({ forDownload }: { forDownload: boolean }) => (
    <div 
      className={`${forDownload ? 'w-[400px] h-[600px] p-6 rounded-none' : 'w-full max-w-[360px] min-h-[530px] p-5 rounded-2xl'} bg-[#0a0e2e] flex flex-col items-center justify-between relative overflow-hidden shadow-2xl`}
      style={{ backgroundImage: "radial-gradient(circle at center, #182352 0%, #06091b 100%)" }}
    >
      {/* Outer thin border */}
      <div className={`absolute inset-2.5 border-2 border-[#c9a84c] pointer-events-none ${forDownload ? 'rounded-none' : 'rounded-xl'}`} />
      {/* Inner thin border */}
      <div className={`absolute inset-4 border border-[#c9a84c]/20 pointer-events-none ${forDownload ? 'rounded-none' : 'rounded-lg'}`} />

      {/* Decorative Corner Ornaments (Simple L-shaped lines as preferred) */}
      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#c9a84c] opacity-60" />
      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#c9a84c] opacity-60" />
      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#c9a84c] opacity-60" />
      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#c9a84c] opacity-60" />

      {/* Celebrant Image (Arched Frame) */}
      <div className="z-10 flex flex-col items-center mt-3">
        <div className={`${forDownload ? 'w-[125px] h-[155px]' : 'w-[105px] h-[135px]'} rounded-t-full overflow-hidden border-2 border-[#c9a84c] shadow-[0_8px_25px_rgba(0,0,0,0.6)] bg-slate-900 relative`}>
          <img 
            src={EVENT_CONFIG.celebrantImageUrl} 
            alt="Mr. Solomon Olusegun Ojo" 
            className="w-full h-full object-cover object-center" 
          />
        </div>
        {/* Decorative gold pedestal line under the arch */}
        <div className="w-24 h-[1px] bg-[#c9a84c] mt-2.5 opacity-60" />
      </div>

      {/* Invitation Header Text */}
      <div className="z-10 text-center px-2 flex flex-col items-center gap-1">
        <span className="text-[#c9a84c] font-space text-[8.5px] uppercase tracking-[0.25em] font-semibold">Official Invitation</span>
        <p className="text-gray-300 font-inter text-[9.5px] tracking-wider leading-relaxed max-w-[280px] mt-0.5">
          Together with their families, we cordially invite you to the 70th Birthday Celebration of
        </p>
        <h2 className="text-[#f5e6c0] font-cormorant text-2xl font-bold tracking-wide leading-none mt-1.5">
          Mr. Solomon Olusegun Ojo
        </h2>
        <p className="text-[#c9a84c] font-cormorant italic text-[11px] font-semibold tracking-wide mt-1">
          Our beloved husband, father, grandpa, brother, uncle & friend
        </p>
      </div>

      {/* Guest Name Line */}
      <div className="z-10 w-full flex flex-col items-center my-2">
        {isBlank ? (
          <div className="flex flex-col items-center w-[85%]">
            <span className="text-[#c9a84c] font-space text-[8px] uppercase tracking-[0.2em] font-medium">Admit:</span>
            <div className="w-full border-b border-dashed border-[#c9a84c]/40 h-6" />
          </div>
        ) : (
          <div className="text-center flex flex-col items-center">
            <span className="text-[#c9a84c] font-space text-[8px] uppercase tracking-[0.2em] font-medium block mb-1">Admit:</span>
            <span className="font-cormorant font-bold italic text-xl text-[#f5e6c0] px-4 py-0.5 border-b border-[#c9a84c]/30 inline-block min-w-[150px]">
              {guestName}
            </span>
          </div>
        )}
      </div>

      {/* Schedule Info */}
      <div className="z-10 grid grid-cols-2 gap-x-4 gap-y-2.5 w-full px-4 text-center font-inter text-[9px] text-[#f5e6c0]/90">
        <div className="flex flex-col items-center">
          <span className="text-[#c9a84c] text-[8px] uppercase tracking-wider font-semibold mb-0.5">Date</span>
          <span className="font-semibold text-white tracking-wide">{EVENT_CONFIG.dateFormatted}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[#c9a84c] text-[8px] uppercase tracking-wider font-semibold mb-0.5">Time</span>
          <span className="font-semibold text-white tracking-wide leading-tight">
            Thanksgiving: {EVENT_CONFIG.thanksgivingTime}<br />
            Reception: {EVENT_CONFIG.receptionTime}
          </span>
        </div>
        <div className="col-span-2 flex flex-col items-center border-t border-[#c9a84c]/20 pt-2 mt-1">
          <span className="text-[#c9a84c] text-[8px] uppercase tracking-wider font-semibold mb-0.5">Venue</span>
          <span className="font-semibold text-white tracking-wide">Lagos Country Club, Ikeja, Lagos</span>
        </div>
        <div className="col-span-2 flex flex-col items-center mt-1">
          <span className="text-[#c9a84c] text-[8px] uppercase tracking-wider font-semibold mb-0.5">Dress Code</span>
          <span className="font-medium text-[#f5e6c0] bg-[#c9a84c]/10 border border-[#c9a84c]/20 px-3 py-0.5 rounded-full text-[8.5px] tracking-wide">
            White & Blue Gele / Cap ✨
          </span>
        </div>
      </div>

      {/* Bottom Bridge (Verification or RSVP Phone) */}
      {isBlank ? (
        <div className="z-10 w-full text-center border-t border-dashed border-[#c9a84c]/20 pt-2.5 pb-1 mt-1">
          <p className="text-[#c9a84c] text-[8px] uppercase tracking-widest font-semibold mb-1">RSVP Contacts</p>
          <div className="flex justify-center items-center gap-3 text-[#f5e6c0] text-[9px] font-mono tracking-wider">
            {EVENT_CONFIG.contacts.map((contact, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="text-[#c9a84c] text-[7.5px] uppercase font-sans tracking-wide">
                  {(contact.shortName || contact.name.split(" ")[0])}:
                </span>
                <span>{contact.displayPhone}</span>
                {idx < EVENT_CONFIG.contacts.length - 1 && <span className="text-[#c9a84c]/30 ml-2">|</span>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="z-10 w-full flex justify-between items-center px-4 border-t border-dashed border-[#c9a84c]/20 pt-2 pb-1 mt-1">
          <div className="text-left flex flex-col justify-center">
            <span className="text-[#c9a84c] text-[7.5px] uppercase tracking-wider font-semibold">Security ID</span>
            <span className="text-[#f5e6c0] text-[9px] font-mono tracking-wider">
              {ticketId ? ticketId.slice(0, 8).toUpperCase() : ""}
            </span>
          </div>
          {/* QR Code Container */}
          <div className="bg-white p-1 rounded shadow-md">
            <QRCode
              value={`https://solomon70.rsvp/ticket/${ticketId}`}
              size={36}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              fgColor="#0a0e2e"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8 mt-6 w-full">
      {/* Visible Interactive Preview (For Onscreen feedback) */}
      {!isBlank && (
        <div className="w-full flex flex-col items-center">
          <span className="font-space text-xs text-[#c9a84c] uppercase tracking-widest mb-3">Your Digital Ticket Preview</span>
          <CardContent forDownload={false} />
        </div>
      )}

      {/* Hidden fixed-size template used for png download generation */}
      <div className="absolute left-[-9999px] top-0">
        <div ref={ticketRef}>
          <CardContent forDownload={true} />
        </div>
      </div>

      {/* Visible Action Buttons (Skip sharing/calendar if rendering blank printable card) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[400px]">
        <button 
          onClick={downloadTicket}
          disabled={isDownloading}
          className={`flex-1 flex items-center justify-center gap-3 bg-[#c9a84c] text-[#0a0e2e] py-4 px-6 rounded-full font-bold uppercase text-xs tracking-widest shadow-xl transition-all ${isDownloading ? 'opacity-80 cursor-wait' : 'hover:brightness-110 active:scale-95'}`}
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              {isBlank ? "Download Card PNG" : "Download Invitation"}
            </>
          )}
        </button>
        
        {!isBlank && (
          <>
            <button 
               onClick={() => {
                 if (navigator.share) {
                   navigator.share({
                     title: 'Solomon @ 70 Ticket',
                     text: `I'm attending Mr. Solomon Olusegun Ojo's 70th Birthday! My ticket ID: ${ticketId ? ticketId.slice(0, 8).toUpperCase() : ""}`,
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

            <button 
               onClick={addToCalendar}
               className="col-span-1 md:col-span-2 flex items-center justify-center gap-3 border border-[#c9a84c] text-[#c9a84c] py-4 px-6 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#c9a84c] hover:text-[#0a0e2e] transition-all"
            >
              <Calendar className="w-4 h-4" />
              Add to Calendar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VirtualTicket;
