"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = (props) => {
  const { error } = props;
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="❌" subtitle="Something went wrong" />;
};

export default ErrorState;
