"use client";
import React, { useEffect, useState } from 'react';

export default function Timer({ duration }) {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        // Jika waktu sudah habis, hentikan timer
        if (time <= 0) {
            return;
        }

        // Set interval untuk mengurangi waktu setiap detik
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1000);
        }, 1000);

        // Bersihkan interval saat komponen unmount
        return () => clearInterval(interval);
    }, [time]);

    const getFormattedTime = (milliseconds) => {
        if (milliseconds <= 0) {
            return "00:00:00:00"; // Tampilkan ini jika waktu habis
        }

        let total_seconds = Math.floor(milliseconds / 1000);
        let total_minutes = Math.floor(total_seconds / 60);
        let total_hours = Math.floor(total_minutes / 60);
        let days = Math.floor(total_hours / 24);

        let seconds = total_seconds % 60;
        let minutes = total_minutes % 60;
        let hours = total_hours % 24;

        // Format waktu agar selalu dua digit (misal: 01:02:03:04)
        const pad = (num) => num.toString().padStart(2, '0');

        return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    return (
        <div>{getFormattedTime(time)}</div>
    );
}