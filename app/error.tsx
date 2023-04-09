"use client";

interface ErrorStateProps {
  error: Error;
}

import { FC, useEffect } from "react";
import EmptyState from "./components/EmptyState";

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle={error.message} />;
};

export default ErrorState;
