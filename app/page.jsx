"use client";
import React, { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.elements.coordinates.value) {
      setData(null);
      return;
    }
    const { coordinates } = e.target.elements;
    const [lat, lng] = coordinates.value.split(",");
    console.log(coordinates.value);

    const res = await fetch(`/api/get-locations?lat=${lat}&lng=${lng}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      if (res.statusText === "No matches found") {
        setData(null);
      } else {
        const data = await res.json();
        console.log(data);
        setData(data);
      }
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='coordinates' className='sr-only'>
          Coordinates
        </label>
        <input
          type='text'
          name='coordinates'
          id='coordinates'
          className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          placeholder='Coordinates'
          autoComplete='off'
          pattern='^\s*-?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*-?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$'
        />
        <button type='submit'>Find</button>
      </form>

      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </main>
  );
}
