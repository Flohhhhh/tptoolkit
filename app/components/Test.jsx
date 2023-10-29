"use client";
import React, { useState } from "react";

const Test = () => {
  const [data, setData] = useState(null);
  const lat = 0;
  const lng = 0;

  const fetchData = async () => {
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
    <div>
      <button
        onClick={() => {
          fetchData();
        }}
      >
        Fetch
      </button>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Test;
