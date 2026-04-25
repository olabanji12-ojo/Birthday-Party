import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ArrowLeft, Users, CheckCircle2, XCircle, Music } from "lucide-react";
import { Link } from "react-router-dom";

interface Guest {
  id: string;
  fullName: string;
  phone: string;
  attendance: string;
  guests: string;
  message: string;
  songRequest: string;
}

const AdminGuestList = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "rsvps"), orderBy("submittedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const guestData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Guest[];
      setGuests(guestData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalComing = guests.filter(g => g.attendance === "yes").length;
  const totalGuestCount = guests
    .filter(g => g.attendance === "yes")
    .reduce((acc, curr) => acc + parseInt(curr.guests || "1"), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e2e] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c9a84c]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e2e] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 text-[#c9a84c] mb-4 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Link>
            <h1 className="text-4xl font-bold text-[#f5e6c0] font-cormorant">Guest List Manager</h1>
            <p className="text-[#c9a84c]/60 font-inter text-sm mt-1">Real-time RSVP Tracking for Solomon @ 70</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/5 border border-brand-gold/20 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-brand-gold/10 rounded-lg"><Users className="w-5 h-5 text-brand-gold" /></div>
              <div>
                <p className="text-[10px] text-brand-gold uppercase tracking-widest">Total Heads</p>
                <p className="text-xl font-bold text-white">{totalGuestCount}</p>
              </div>
            </div>
            <div className="bg-white/5 border border-green-500/20 p-4 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg"><CheckCircle2 className="w-5 h-5 text-green-400" /></div>
              <div>
                <p className="text-[10px] text-green-400 uppercase tracking-widest">Responses</p>
                <p className="text-xl font-bold text-white">{totalComing}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white/5 border border-brand-gold/10 rounded-3xl overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-inter">
              <thead>
                <tr className="border-b border-brand-gold/10 bg-white/5">
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Name</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Guests</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Contact</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Song Request</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {guests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <p className="text-white font-medium">{guest.fullName}</p>
                      {guest.message && (
                        <p className="text-[11px] text-white/40 italic mt-1 max-w-xs truncate group-hover:whitespace-normal group-hover:overflow-visible">
                          "{guest.message}"
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      {guest.attendance === "yes" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> YES
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold">
                          <XCircle className="w-3 h-3" /> NO
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-white/80 font-mono">{guest.attendance === "yes" ? guest.guests : "-"}</td>
                    <td className="px-6 py-5 text-white/60 text-sm">{guest.phone}</td>
                    <td className="px-6 py-5">
                      {guest.songRequest ? (
                        <div className="flex items-center gap-2 text-brand-gold-pale text-xs">
                          <Music className="w-3 h-3" /> {guest.songRequest}
                        </div>
                      ) : (
                        <span className="text-white/20 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {guests.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-white/20 font-inter">No RSVPs yet. Spread the word!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminGuestList;
