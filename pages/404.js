import React from "react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  const onBack = () => {
    router.push("/home");
  };
  return (
    <>
      <div>
        <h1>404</h1>
      </div>
      <button className="btn btn-primary" onClick={() => onBack()}>
        Back to Home
      </button>
    </>
  );
}
