'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Clock, Play } from 'lucide-react';
import { NewsItem } from '@/types';

interface HomeCarouselProps {
    featuredNews: NewsItem[];
}

export default function HomeCarousel({ featuredNews }: HomeCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (featuredNews.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [featuredNews.length]);

    const nextSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentSlide((prev) => (prev + 1) % featuredNews.length);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentSlide((prev) => (prev === 0 ? featuredNews.length - 1 : prev - 1));
    };

    if (featuredNews.length === 0) return null;

    const currentItem = featuredNews[currentSlide];

    return (
        <div className="lg:col-span-2 group relative rounded-xl overflow-hidden shadow-sm aspect-video">
            <Link href={`/news/${currentItem.id}`} className="block w-full h-full relative">
                <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    fill
                    className="object-cover transform hover:scale-105 transition duration-700 animate-fade-in"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full pr-16">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded hidden">
                            {currentItem.category || 'ข่าวเด่น'}
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 drop-shadow-md line-clamp-2">
                        {currentItem.title}
                    </h2>
                    <div className="flex items-center gap-4 text-gray-300 text-sm">
                        <span className="flex items-center gap-1">
                            <Clock size={14} /> {currentItem.time}
                        </span>
                        <span className="flex items-center gap-1">
                            <Play size={14} /> {currentItem.views?.toLocaleString() || '0'}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition z-10 opacity-0 group-hover:opacity-100"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition z-10 opacity-0 group-hover:opacity-100"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
                {featuredNews.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.preventDefault();
                            setCurrentSlide(idx);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-red-600 w-6' : 'bg-white/50 hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
