"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { GalleryImage } from "@/lib/types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryGridProps {
  images: GalleryImage[];
}

// Helper function to get image URL
function getImageUrl(image: GalleryImage): string {
  if (!image?.url) {
    return "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  }
  
  const url = image.url;
  
  // If URL is already absolute, return it
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  
  // If URL starts with /, prepend Strapi URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  
  return `${strapiUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Sample placeholder images when no images from CMS
  const placeholderImages = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154084-4e5f7f23ea86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  // Use placeholder images if no images from CMS
  const displayImages = images && images.length > 0 
    ? images 
    : placeholderImages.map((url, idx) => ({
        id: idx,
        name: `Placeholder ${idx + 1}`,
        url,
        alternativeText: `Sample real estate image ${idx + 1}`,
        width: 800,
        height: 600,
      })) as GalleryImage[];

  // Navigation functions
  const goToPrevious = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : displayImages.length - 1);
    }
  }, [selectedImage, displayImages.length]);

  const goToNext = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage < displayImages.length - 1 ? selectedImage + 1 : 0);
    }
  }, [selectedImage, displayImages.length]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, goToPrevious, goToNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  if (!displayImages || displayImages.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No images available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {displayImages.map((image, index) => {
          const imageUrl = getImageUrl(image);
          const altText = image.alternativeText || image.name || `Gallery image ${index + 1}`;

          return (
            <div
              key={image.id || index}
              className="relative group overflow-hidden rounded-lg cursor-pointer w-full bg-gray-100"
              style={{ aspectRatio: "4/3" }}
                  onClick={() => setSelectedImage(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedImage(index);
                }
              }}
              aria-label={`View ${altText}`}
            >
                    <Image
                      src={imageUrl}
                alt={altText}
                      fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                unoptimized={imageUrl.includes("unsplash.com")}
                    />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
          );
        })}
      </div>

      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gold transition-colors z-20 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button - Desktop only */}
          {displayImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 items-center justify-center bg-black/50 hover:bg-black/70 text-white hover:text-gold rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Next button - Desktop only */}
          {displayImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 items-center justify-center bg-black/50 hover:bg-black/70 text-white hover:text-gold rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image counter - Desktop only */}
          {displayImages.length > 1 && (
            <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-black/50 rounded-full text-white text-sm">
              {selectedImage + 1} / {displayImages.length}
            </div>
          )}

          {/* Image container with swipe support */}
          <div 
            ref={imageContainerRef}
            className="relative w-full h-full max-w-6xl max-h-[90vh] p-4 md:p-8"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={getImageUrl(displayImages[selectedImage])}
              alt={displayImages[selectedImage]?.alternativeText || displayImages[selectedImage]?.name || `Gallery image ${selectedImage + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              unoptimized={getImageUrl(displayImages[selectedImage]).includes("unsplash.com")}
              priority
            />
          </div>

          {/* Mobile swipe indicators */}
          {displayImages.length > 1 && (
            <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {displayImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === selectedImage ? "bg-gold w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

