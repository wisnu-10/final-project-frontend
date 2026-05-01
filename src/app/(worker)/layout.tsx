"use client";

import withEmployeeAuth from "@/hoc/withEmployeeAuth";

function WorkerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

export default withEmployeeAuth(WorkerLayout, ["worker"]);
