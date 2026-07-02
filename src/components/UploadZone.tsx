"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

interface UploadZoneProps {
  /** Called when the user selects or drops a valid image file */
  onImageSelect: (imageUrl: string, file: File) => void;
}

export default function UploadZone({ onImageSelect }: UploadZoneProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const { t } = useLanguage();

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Cleanup camera stream on unmount or tab change
  useEffect(() => {
    if (activeTab === "upload") {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab, stopCamera]);

  const startCamera = async () => {
    setCameraError(null);
    
    // Check if mediaDevices API is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(
        "Kamera tidak dapat diakses. Fitur ini membutuhkan koneksi aman (HTTPS). Jika Anda mengakses lewat IP (misal 192.168.x.x), silakan gunakan localhost atau ngrok."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      setIsCameraActive(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 50);
    } catch (err: any) {
      setCameraError(
        "Gagal mengakses kamera. Pastikan Anda telah memberikan izin (permission) akses kamera di browser Anda."
      );
      console.error(err);
    }
  };

  const takePhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" });
              const imageUrl = URL.createObjectURL(file);
              onImageSelect(imageUrl, file);
              stopCamera();
            }
          },
          "image/jpeg",
          0.9
        );
      }
    }
  };

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    if (activeTab !== "upload") return;
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, [activeTab]);

  // Handle drop event
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (activeTab !== "upload") return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        const imageUrl = URL.createObjectURL(file);
        onImageSelect(imageUrl, file);
      }
    },
    [activeTab, onImageSelect]
  );

  // Handle click upload
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl, file);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Tab Selector */}
      <div className="flex w-full rounded-2xl bg-zinc-100 p-1.5 dark:bg-zinc-800/80">
        <button
          onClick={() => setActiveTab("upload")}
          className={`flex flex-1 items-center justify-center space-x-2 rounded-xl py-2.5 text-sm font-medium transition-all ${
            activeTab === "upload"
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          <span>Upload File</span>
        </button>
        <button
          onClick={() => setActiveTab("camera")}
          className={`flex flex-1 items-center justify-center space-x-2 rounded-xl py-2.5 text-sm font-medium transition-all ${
            activeTab === "camera"
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
          </svg>
          <span>Kamera</span>
        </button>
      </div>

      {/* Error Popup */}
      {cameraError && (
        <div className="rounded-xl bg-red-100 p-4 text-sm text-red-700 shadow-sm dark:bg-red-900/30 dark:text-red-400">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <strong>Peringatan:</strong> {cameraError}
            </div>
            <button
              onClick={() => setCameraError(null)}
              className="ml-4 flex h-6 w-6 items-center justify-center rounded-full hover:bg-red-200 dark:hover:bg-red-900/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Upload Zone Tab */}
      {activeTab === "upload" && (
        <div
          className={`relative flex min-h-[320px] w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
            isDragging
              ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10"
              : "border-zinc-200 bg-zinc-50 hover:border-emerald-300 hover:bg-emerald-50/30 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-emerald-700/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            onChange={handleChange}
          />
          <div className="relative z-0 flex flex-col items-center space-y-4">
            <div className="rounded-full bg-white p-4 shadow-sm ring-1 ring-zinc-200/50 dark:bg-zinc-800 dark:ring-zinc-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-emerald-600 dark:text-emerald-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{t("scan.clickOrDrag")}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("scan.supportedFormats")}</p>
            </div>
          </div>
        </div>
      )}

      {/* Camera Tab */}
      {activeTab === "camera" && (
        <div className="relative flex min-h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
          {!isCameraActive ? (
            <div className="flex flex-col items-center space-y-4 p-8 text-center">
              <div className="rounded-full bg-emerald-100 p-4 dark:bg-emerald-900/40">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-emerald-600 dark:text-emerald-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Ambil Foto Langsung</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Nyalakan kamera untuk mendeteksi sampah seketika</p>
              </div>
              <button
                onClick={startCamera}
                className="mt-2 rounded-xl bg-emerald-600 px-6 py-2.5 font-medium text-white shadow-sm transition hover:bg-emerald-500"
              >
                Izinkan & Nyalakan Kamera
              </button>
            </div>
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
                <button
                  onClick={takePhoto}
                  className="flex items-center space-x-2 rounded-full bg-emerald-600 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-emerald-500"
                >
                  <div className="h-4 w-4 rounded-full border-2 border-white bg-white/30" />
                  <span>Ambil Foto</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}


