"use client";
import React, { useState } from "react";

const Test = () => {
  const [data, setData] = useState(null);
  const lat = 38.9974672;
  const lng = -74.8760719;

  const fetchData = async () => {
    const res = await fetch(`/api/get-locations?lat=${lat}&lng=${lng}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    setData(json);
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
