import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ArrowLeft, Users, CheckCircle2, XCircle, Music, Download, Lock, Moon, Sun, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import VirtualTicket from "./VirtualTicket";

interface Guest {
  id: string;
  fullName: string;
  phone: string;
  attendance: string;
  guests: string;
  message: string;
  songRequest: string;
  email?: string;
}

const AdminGuestList = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("adminAuth") === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(document.documentElement.classList.contains("dark") ? "dark" : "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "OJO@12345678") {
      setIsAuthenticated(true);
      sessionStorage.setItem("adminAuth", "true");
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

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

  const exportToCSV = () => {
    const headers = ["Ticket ID", "Name", "Email", "Phone", "Attendance", "Guests", "Song Request", "Message"];
    const csvData = guests.map(g => [
      `"${g.id.slice(0, 8).toUpperCase()}"`,
      `"${g.fullName || ''}"`,
      `"${g.email || ''}"`,
      `"${g.phone || ''}"`,
      `"${g.attendance || ''}"`,
      `"${g.attendance === 'yes' ? (g.guests || '1') : '0'}"`,
      `"${g.songRequest || ''}"`,
      `"${g.message || ''}"`
    ]);
    
    const csvContent = [headers.join(","), ...csvData.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Solomon70_GuestList.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-brand-navy transition-colors duration-500 flex flex-col items-center justify-center px-4">
        <Link to="/" className="flex items-center gap-2 text-brand-gold mb-8 hover:opacity-80 transition-opacity absolute top-8 left-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Site
        </Link>
        
        <div className={`bg-white dark:bg-brand-navy-light p-8 rounded-[30px] shadow-2xl border border-gray-100 dark:border-brand-gold/20 w-full max-w-md transition-all ${error ? 'animate-shake' : ''}`}>
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-brand-gold" />
            </div>
            <h2 className="font-cormorant text-3xl text-brand-navy dark:text-brand-gold-pale">Admin Access</h2>
            <p className="font-inter text-gray-500 text-sm mt-2 text-center">Please enter the security passcode to view the guest list.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={`w-full bg-gray-50 dark:bg-brand-navy/50 border ${error ? 'border-red-500' : 'border-gray-200 dark:border-brand-gold/30'} rounded-xl px-4 py-3 pr-12 text-gray-900 dark:text-white focus:outline-none focus:border-brand-gold transition-colors`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-gold transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs text-center">Incorrect Passcode</p>}
            <button
              type="submit"
              className="w-full bg-brand-gold text-brand-navy font-bold py-3 rounded-xl hover:bg-brand-gold-light transition-colors"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-brand-navy transition-colors duration-500 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-navy transition-colors duration-500 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 text-[#c9a84c] mb-4 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Link>
            <h1 className="text-4xl font-bold text-brand-navy dark:text-brand-gold-pale transition-colors font-cormorant">Guest List Manager</h1>
            <p className="text-gray-500 dark:text-brand-gold/60 font-inter text-sm mt-1 transition-colors">Real-time RSVP Tracking for Solomon @ 70</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={toggleTheme}
              className="bg-white shadow-md dark:shadow-none dark:bg-white/5 border border-gray-100 dark:border-brand-gold/20 p-4 rounded-2xl flex items-center gap-3 transition-colors text-brand-navy dark:text-brand-gold"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button 
              onClick={exportToCSV}
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light transition-colors p-4 rounded-2xl flex items-center gap-3 font-bold"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
            <div className="bg-white shadow-md dark:shadow-none dark:bg-white/5 border border-gray-100 dark:border-brand-gold/20 p-4 rounded-2xl flex items-center gap-3 transition-colors">
              <div className="p-2 bg-brand-gold/10 rounded-lg"><Users className="w-5 h-5 text-brand-gold" /></div>
              <div>
                <p className="text-[10px] text-brand-gold uppercase tracking-widest">Total Heads</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors">{totalGuestCount}</p>
              </div>
            </div>
            <div className="bg-white shadow-md dark:shadow-none dark:bg-white/5 border border-green-500/20 p-4 rounded-2xl flex items-center gap-3 transition-colors">
              <div className="p-2 bg-green-500/10 rounded-lg"><CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 transition-colors" /></div>
              <div>
                <p className="text-[10px] text-green-600 dark:text-green-400 transition-colors uppercase tracking-widest">Responses</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors">{totalComing}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Printable Card Template Section */}
        <div className="bg-white dark:bg-brand-navy-light p-6 rounded-3xl border border-gray-200 dark:border-brand-gold/10 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors">
          <div>
            <h2 className="font-cormorant text-2xl font-bold text-brand-navy dark:text-brand-gold-pale">Physical Invitation Card Template</h2>
            <p className="font-inter text-xs text-gray-500 dark:text-brand-gold/60 mt-1">Download the high-resolution invitation template (with a blank guest name line) to print and distribute physically.</p>
          </div>
          <div className="w-full md:w-auto mt-0">
            <VirtualTicket isBlank={true} />
          </div>
        </div>

        {/* Table View */}
        <div className="bg-white shadow-lg dark:shadow-none dark:bg-white/5 border border-gray-200 dark:border-brand-gold/10 rounded-3xl overflow-hidden backdrop-blur-sm transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-inter">
              <thead>
                <tr className="border-b border-gray-200 dark:border-brand-gold/10 bg-gray-50 dark:bg-white/5 transition-colors">
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Ticket ID</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Name</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Status</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Guests</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Contact Info</th>
                  <th className="px-6 py-4 text-[10px] uppercase font-bold text-brand-gold tracking-[2px]">Song Request</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/5 transition-colors">
                {guests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center justify-center px-2.5 py-1 bg-brand-gold/10 text-brand-gold font-mono text-[11px] rounded font-bold tracking-widest">
                        {guest.id.slice(0, 8).toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-gray-900 dark:text-white transition-colors font-medium">{guest.fullName}</p>
                      {guest.message && (
                        <p className="text-[11px] text-gray-500 dark:text-white/40 italic mt-1 max-w-xs truncate group-hover:whitespace-normal group-hover:overflow-visible transition-colors">
                          "{guest.message}"
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      {guest.attendance === "yes" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[10px] font-bold transition-colors">
                          <CheckCircle2 className="w-3 h-3" /> YES
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-[10px] font-bold transition-colors">
                          <XCircle className="w-3 h-3" /> NO
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-gray-700 dark:text-white/80 transition-colors font-mono">{guest.attendance === "yes" ? guest.guests : "-"}</td>
                    <td className="px-6 py-5 text-gray-600 dark:text-white/60 transition-colors text-sm">
                      <div>{guest.phone}</div>
                      {guest.email && <div className="text-[11px] text-gray-400 dark:text-white/40">{guest.email}</div>}
                    </td>
                    <td className="px-6 py-5">
                      {guest.songRequest ? (
                        <div className="flex items-center gap-2 text-brand-gold dark:text-brand-gold-pale transition-colors text-xs">
                          <Music className="w-3 h-3" /> {guest.songRequest}
                        </div>
                      ) : (
                        <span className="text-gray-300 dark:text-white/20 transition-colors text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {guests.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 dark:text-white/20 transition-colors font-inter">No RSVPs yet. Spread the word!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminGuestList;
