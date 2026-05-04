/**
 * useCarousel — Carousel Behavior Hook
 * =======================================
 * Encapsulates responsive item count, auto-slide, index clamping,
 * and touch swipe handling for any horizontal carousel.
 *
 * Extracted from ProductGrid to satisfy Single Responsibility.
 */

"use client";

import { useState, useEffect, useCallback } from "react";

interface TouchHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

interface UseCarouselOptions {
  totalItems: number;
  autoSlideMs?: number;
  minSwipeDistance?: number;
}

interface UseCarouselReturn {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  itemsToShow: number;
  maxIndex: number;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  touchHandlers: TouchHandlers;
}

export function useCarousel({
  totalItems,
  autoSlideMs = 6000,
  minSwipeDistance = 50,
}: UseCarouselOptions): UseCarouselReturn {
  const [itemsToShow, setItemsToShow] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const maxIndex = Math.max(0, totalItems - itemsToShow);

  /* Responsive items count */
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) setItemsToShow(4);
      else if (window.innerWidth >= 768) setItemsToShow(3);
      else setItemsToShow(2);
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  /* Clamp index on resize or data change */
  useEffect(() => {
    setCurrentIndex((prev) =>
      Math.min(prev, Math.max(0, totalItems - itemsToShow))
    );
  }, [itemsToShow, totalItems]);

  /* Auto-slide */
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoSlideMs);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex, autoSlideMs]);

  /* Touch swipe handlers */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [touchStart, touchEnd, currentIndex, maxIndex, minSwipeDistance]);

  return {
    currentIndex,
    setCurrentIndex,
    itemsToShow,
    maxIndex,
    isPaused,
    setIsPaused,
    touchHandlers: { onTouchStart, onTouchMove, onTouchEnd },
  };
}
