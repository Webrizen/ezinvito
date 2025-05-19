"use client";
import { QRCodeSVG } from 'qrcode.react';
import Logo from "@/assets/logo.png";
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toPng, toCanvas } from 'html-to-image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const formatDate = (dateString) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function QRCodeWithLogo({ url, expiresAt, eventName, host, attendee, eventDescription, eventStartTime, eventId, location }) {
  const qrCodeRef = useRef(null);
  const passDesignRef = useRef(null);
  const [customLogo, setCustomLogo] = useState(null);
  const fileInputRef = useRef(null);
  const [isGeneratingPass, setIsGeneratingPass] = useState(false);

  console.log(location)

  const handleDownloadQRCode = () => {
    if (qrCodeRef.current === null) return;

    toPng(qrCodeRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'event-qrcode.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(console.error);
  };

  const handleDownloadPass = async () => {
    if (!passDesignRef.current) return;

    setIsGeneratingPass(true);
    try {
      const canvas = await toCanvas(passDesignRef.current, {
        cacheBust: true,
        canvasWidth: 800,
        canvasHeight: 1000,
      });

      const link = document.createElement('a');
      link.download = `${eventName.replace(/\s+/g, '-')}-pass.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error generating pass:', err);
    } finally {
      setIsGeneratingPass(false);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => setCustomLogo(event.target.result);
    reader.readAsDataURL(file);
  };

  const removeCustomLogo = () => {
    setCustomLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <div
        ref={qrCodeRef}
        className="p-4 bg-white dark:bg-zinc-700 rounded-lg border border-zinc-200 dark:border-zinc-600 mb-4"
      >
        <div className="relative w-[200px] h-[200px]">
          <QRCodeSVG
            value={url}
            size={200}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
            includeMargin={true}
          />
          {customLogo ? (
            <img
              src={customLogo}
              alt="Custom Logo"
              width={40}
              height={40}
              className="absolute top-1/2 left-1/2 w-[40px] h-[40px] transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-black p-1 object-contain"
            />
          ) : (
            <Image
              src={Logo}
              alt="Logo"
              width={40}
              height={40}
              placeholder='blur'
              className="absolute top-1/2 left-1/2 w-[40px] h-[40px] transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-black p-1"
            />
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Custom Logo (optional)
        </label>
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            accept="image/*"
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg transition duration-200 text-center cursor-pointer"
          >
            Upload Logo
          </label>
          {customLogo && (
            <button
              onClick={removeCustomLogo}
              className="bg-red-50 hover:bg-red-100 text-red-700 py-2 px-4 rounded-lg transition duration-200"
            >
              Remove
            </button>
          )}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Recommended size: 40×40px
        </p>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-300 text-center mb-2">
        Scan this QR code to view the event
      </p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
        Expires: {formatDate(expiresAt)}
      </p>
      <div className="mt-4 w-full grid md:grid-cols-1 gap-4">
        <button
          onClick={handleDownloadQRCode}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-200"
        >
          Download QR Code
        </button>

        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-lg transition duration-200">
              Download Invitation Pass
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Event Pass</DialogTitle>
              <DialogDescription>
                Preview and download your personalized event pass
              </DialogDescription>
            </DialogHeader>

            <div className="p-1">
              <div
                ref={passDesignRef}
                className="bg-black p-6 rounded-xl shadow-2xl border border-zinc-800 mx-auto relative overflow-hidden aspect-video w-[800px] h-[400px]"
              >
                {/* Background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black opacity-95"></div>
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.8) 0%, transparent 20%)'
                }}></div>

                {/* Metallic border effect */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.3) 100%)'
                }}></div>

                {/* Main content */}
                <div className="relative h-full flex flex-row">
                  {/* Left side - Branding (unchanged) */}
                  <div className="w-2/5 h-full flex flex-col justify-between p-6 border-r border-zinc-800">
                    <div>
                      <div className="flex items-center mb-8">
                        {customLogo ? (
                          <img
                            src={customLogo}
                            alt="Custom Logo"
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-md object-contain"
                          />
                        ) : (
                          <Image
                            src={Logo}
                            alt="Logo"
                            width={48}
                            height={48}
                            placeholder='blur'
                            className="w-12 h-12 rounded-md"
                          />
                        )}
                        <div className="ml-3">
                          <p className="text-xs text-zinc-400 uppercase tracking-wider">Event by</p>
                          <p className="text-white font-medium">{host}</p>
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-white mb-2">{eventName}</h2>
                      {eventDescription && (
                        <p className="text-zinc-400 text-sm">{eventDescription}</p>
                      )}
                    </div>

                    <div className="text-zinc-500 text-xs">
                      <p>Valid until {new Date(expiresAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</p>
                    </div>
                  </div>

                  {/* Right side - Redesigned Details */}
                  <div className="w-3/5 h-full flex flex-col p-6">
                    {/* Top section with attendee info */}
                    <div className="flex-1 flex flex-col">
                      {/* Attendee info with decorative border */}
                      <div className="mb-6 pb-6 border-b border-zinc-800">
                        <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Attendee</p>
                        <p className="text-white text-2xl font-bold tracking-tight">{attendee}</p>
                        <div className="mt-2 h-[2px] w-16 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
                      </div>

                      {/* Event details in a grid layout */}
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Event Date</p>
                          <p className="text-white text-lg font-medium">
                            {formatDate(eventStartTime)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Ticket Type</p>
                          <p className="text-white text-lg font-medium">VIP Access</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Location</p>
                          <p className="text-white text-lg font-medium">Main Hall</p>
                        </div>
                        <div>
                          <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Seat</p>
                          <p className="text-white text-lg font-medium">A-12</p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0">
                        <div className="bg-white p-2 rounded-lg shadow-lg">
                          <div className="relative w-[100px] h-[100px]">
                            <QRCodeSVG
                              value={url}
                              size={100}
                              bgColor="#ffffff"
                              fgColor="#000000"
                              level="H"
                              includeMargin={true}
                            />
                            {customLogo ? (
                              <img
                                src={customLogo}
                                alt="Custom Logo"
                                width={20}
                                height={20}
                                className="absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-black p-1 object-contain"
                              />
                            ) : (
                              <Image
                                src={Logo}
                                alt="Logo"
                                width={20}
                                height={20}
                                placeholder='blur'
                                className="absolute top-1/2 left-1/2 w-5 h-5 transform -translate-x-1/2 -translate-y-1/2 rounded-md bg-black p-1"
                              />
                            )}
                          </div>
                        </div>
                        <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)',
                          mixBlendMode: 'overlay'
                        }}></div>
                      </div>

                    {/* Bottom section with QR and ID */}
                    <div className="flex justify-end items-end mt-8">
                      {/* Ticket ID with premium badge */}
                      <div className="text-right">
                        <div className="text-zinc-400 text-sm">
                          <p className="text-xs mb-1">Ticket ID</p>
                          <p className="font-mono text-white text-xs tracking-wider">#{eventId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premium effects */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-300 opacity-20 blur-md"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 opacity-10 blur-lg"></div>

                {/* Holographic security stripe */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <button
                onClick={handleDownloadPass}
                disabled={isGeneratingPass}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
              >
                {isGeneratingPass ? 'Generating...' : 'Download Pass'}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}