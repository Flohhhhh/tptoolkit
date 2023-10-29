import React from "react";
import { useFormStatus } from "react-dom";

const Test2 = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <button>Fetch</button>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Test2;
