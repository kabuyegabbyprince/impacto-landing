import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  QrCode,
  CheckCircle2,
  MapPin,
  Compass,
  ShieldAlert,
} from 'lucide-react';
import {
  useOrganization,
  useEvents,
  useMeetings,
  useCheckIn,
  useSaveMeetingAttendance,
} from '../hooks/useImpactoData';
import { Button, Card, Badge } from '../components/ui';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // metres
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
}

export const EventCheckinPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const cleanSlug = slug?.startsWith('@') ? slug.slice(1) : slug;
  const checkinMutation = useCheckIn();
  const { data: org } = useOrganization(cleanSlug);
  const { data: events } = useEvents(org?.id);
  const { data: meetings } = useMeetings(org?.id);
  const saveMeetingAttendanceMutation = useSaveMeetingAttendance();

  // URL Query Parameters
  const params = new URLSearchParams(window.location.search);
  const urlMeetId = params.get('meetId') || '';
  const urlEventId = params.get('eventId') || '';

  // Selection state
  const [selectedType, setSelectedType] = useState<'event' | 'meeting'>(
    urlMeetId ? 'meeting' : 'event'
  );
  const [selectedId, setSelectedId] = useState(urlMeetId || urlEventId || '');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifyingGeo, setIsVerifyingGeo] = useState(false);

  useEffect(() => {
    if (urlMeetId) {
      setSelectedType('meeting');
      setSelectedId(urlMeetId);
    } else if (urlEventId) {
      setSelectedType('event');
      setSelectedId(urlEventId);
    }
  }, [urlMeetId, urlEventId]);

  const activeEvent = selectedType === 'event' ? events?.find((e) => e.id === selectedId) : null;
  const activeMeeting = selectedType === 'meeting' ? meetings?.find((m) => m.id === selectedId) : null;

  const itemTitle = activeEvent ? activeEvent.title : activeMeeting ? activeMeeting.title : '';
  const itemLocationType = activeEvent
    ? activeEvent.location_type || 'on-site'
    : activeMeeting
    ? activeMeeting.location_type || 'on-site'
    : 'on-site';

  const targetLat = activeEvent ? activeEvent.latitude : activeMeeting ? activeMeeting.latitude : undefined;
  const targetLng = activeEvent ? activeEvent.longitude : activeMeeting ? activeMeeting.longitude : undefined;
  const radiusMeters = activeEvent
    ? activeEvent.radius_meters || 100
    : activeMeeting
    ? activeMeeting.radius_meters || 100
    : 100;

  const handleVerifyAndCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) {
      setErrorMsg('Please select a valid scheduled session.');
      return;
    }

    setErrorMsg('');
    setIsVerifyingGeo(true);

    let userLat = -1.9441;
    let userLng = 30.0619;

    const completeCheckinProcess = async (statusVal: 'present' | 'mismatch' | 'attempted', distanceVal?: number) => {
      try {
        if (selectedType === 'event') {
          await checkinMutation.mutateAsync({
            event_id: selectedId,
            member_id: 'member-2',
            method: 'qr',
            status: statusVal,
            attempt_lat: userLat,
            attempt_lng: userLng,
            distance_meters: distanceVal,
          });
        } else {
          const key = `meet_attn_${selectedId}`;
          const currentList = JSON.parse(localStorage.getItem(key) || '[]');
          if (!currentList.includes('member-2')) {
            currentList.push('member-2');
          }
          localStorage.setItem(key, JSON.stringify(currentList));

          await saveMeetingAttendanceMutation.mutateAsync({
            meetingId: selectedId,
            memberIds: currentList,
          });
        }
        setSuccess(true);
      } catch (err: any) {
        setErrorMsg(err?.message || 'Check in failed to compile in logs.');
      } finally {
        setIsVerifyingGeo(false);
      }
    };

    if (itemLocationType === 'online') {
      setSuccessMessage('Thank you! Your virtual attendance has been instantly confirmed with the organizer.');
      await completeCheckinProcess('present');
      return;
    }

    if (targetLat !== undefined && targetLng !== undefined) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            userLat = pos.coords.latitude;
            userLng = pos.coords.longitude;
            const distance = calculateDistance(userLat, userLng, targetLat, targetLng);

            if (distance <= radiusMeters) {
              setSuccessMessage(
                `Excellent! Geofence verified. You are within ${distance.toFixed(
                  0
                )}m of the venue. Attendance logged successfully!`
              );
              await completeCheckinProcess('present', distance);
            } else {
              setSuccessMessage(
                `Attendance logged! You are ${distance.toFixed(
                  0
                )}m away, which is outside the set ${radiusMeters}m fence. We recorded your presence attempt gently so your administrator can review and confirm it.`
              );
              await completeCheckinProcess('mismatch', distance);
            }
          },
          async () => {
            setSuccessMessage(
              'Attendance logged! Geolocation permissions were unavailable, but we have submitted your presence attempt for administrator approval.'
            );
            await completeCheckinProcess('attempted');
          },
          { enableHighAccuracy: true, timeout: 6000 }
        );
      } else {
        setSuccessMessage(
          'Attendance logged! Your browser does not support geolocation tracking, so we submitted your presence check-in for admin review.'
        );
        await completeCheckinProcess('attempted');
      }
    } else {
      setSuccessMessage(
        'On-site attendance recorded successfully. The administrators did not configure active geolocation fencing for this session.'
      );
      await completeCheckinProcess('present');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <Card title="Mobile Attendance Portal" className="w-full max-w-md shadow-xl border border-gray-150">
        {success ? (
          <div className="text-center flex flex-col items-center gap-3">
            <span className="p-3 bg-emerald-50 rounded-full text-emerald-600 mb-2 border border-emerald-200">
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg">
              Check-In Completed!
            </h3>
            <p className="text-xs text-gray-600 dark:text-slate-300 font-medium leading-relaxed px-2">
              {successMessage || 'Your presence has been saved to our cooperative logs.'}
            </p>
            <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-xl w-full text-[11px] text-gray-400 font-mono mt-2 leading-tight">
              Type: {selectedType.toUpperCase()} | Session: {itemTitle || 'Active Sync'}
            </div>
            <Button onClick={() => navigate(`/@${slug}`)} className="mt-4 w-full">
              Return to Public Profile
            </Button>
          </div>
        ) : (
          <form onSubmit={handleVerifyAndCheckin} className="flex flex-col gap-4">
            <p className="text-xs text-gray-500 mb-2 leading-relaxed">
              Scan or select your cooperative's current scheduled session to verify your attendance presence.
            </p>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-150 font-semibold mb-4 leading-normal">
                {errorMsg}
              </div>
            )}

            {/* Toggle Session Type */}
            {!urlMeetId && !urlEventId && (
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType('event');
                    setSelectedId('');
                  }}
                  className={`py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                    selectedType === 'event'
                      ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  Community Events
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedType('meeting');
                    setSelectedId('');
                  }}
                  className={`py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${
                    selectedType === 'meeting'
                      ? 'bg-white dark:bg-slate-700 text-stone-900 dark:text-white shadow-sm'
                      : 'text-gray-500'
                  }`}
                >
                  Governance Meetings
                </button>
              </div>
            )}

            {/* Selector list */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-slate-300">
                Active Sessions
              </label>
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="w-full text-xs rounded-lg border bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700 px-3.5 py-2.5 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-[var(--org-primary,#15803D)] transition"
              >
                <option value="">-- Choose Active Session --</option>
                {selectedType === 'event'
                  ? events?.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        🗓️ {ev.title} ({new Date(ev.date_time).toLocaleDateString()})
                      </option>
                    ))
                  : meetings?.map((meet) => (
                      <option key={meet.id} value={meet.id}>
                        🕒 {meet.title} ({new Date(meet.date_time).toLocaleDateString()})
                      </option>
                    ))}
              </select>
            </div>

            {/* Details Widget of Selected Item */}
            {selectedId && (activeEvent || activeMeeting) && (
              <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/40 text-xs flex flex-col gap-2.5 animate-in">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[10px] tracking-wider uppercase text-gray-400">
                    Session Mode
                  </span>
                  {itemLocationType === 'online' ? (
                    <Badge color="blue">💻 ONLINE VIRTUAL</Badge>
                  ) : (
                    <Badge color="green">📍 PHYSICAL ON-SITE</Badge>
                  )}
                </div>

                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-gray-900 dark:text-white text-sm leading-snug">
                    {itemTitle}
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1 font-mono">
                    Time:{' '}
                    {new Date(
                      activeEvent ? activeEvent.date_time : activeMeeting!.date_time
                    ).toLocaleString()}
                  </span>
                </div>

                {itemLocationType === 'on-site' && (
                  <div className="pt-2 border-t border-dashed border-gray-200 dark:border-slate-700 mt-1">
                    <span className="text-[10px] text-gray-400 font-bold block mb-1">
                      🌍 GEOLOCATION SECURITY:
                    </span>
                    {targetLat !== undefined && targetLng !== undefined ? (
                      <div className="flex flex-col gap-1 text-[11px] text-gray-600 dark:text-slate-300">
                        <span className="flex items-center gap-1 font-semibold">
                          <MapPin className="h-3 w-3 text-emerald-500" /> Fence Target:{' '}
                          {targetLat.toFixed(4)}, {targetLng.toFixed(4)}
                        </span>
                        <span className="flex items-center gap-1 font-semibold">
                          <Compass className="h-3 w-3 text-emerald-500" /> Acceptable Boundary: within{' '}
                          {radiusMeters} meters
                        </span>
                        <p className="text-[10px] text-stone-400 leading-snug mt-1">
                          You will be scanned. If you are outside the boundary, your presence is still
                          marked as Tried to Attend for admin confirmation.
                        </p>
                      </div>
                    ) : (
                      <span className="text-[10px] text-amber-600 font-semibold italic flex items-center gap-1">
                        <ShieldAlert className="h-3.5 w-3.5" /> No strict geofence configured. Normal
                        check-in will run.
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              loading={
                isVerifyingGeo ||
                checkinMutation.isPending ||
                saveMeetingAttendanceMutation.isPending
              }
              disabled={!selectedId}
              className={`w-full mt-3 font-bold py-3 text-sm flex items-center justify-center gap-2 ${
                itemLocationType === 'online'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isVerifyingGeo ? (
                <>
                  <Compass className="h-4 w-4 animate-spin" />
                  Verifying Geofence Boundary...
                </>
              ) : (
                <>
                  <QrCode className="h-4 w-4" />
                  {itemLocationType === 'online'
                    ? 'Confirm Online Attendance'
                    : 'Verify & Check-In On-Site'}
                </>
              )}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};
