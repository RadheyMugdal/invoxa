"use client";

import { useParams } from "next/navigation";
import { ShareManager } from "./share-manager";

export function ShareManagerContent() {
  const params = useParams();
  const invoiceId = params.id as string;
  return <ShareManager invoiceId={invoiceId} />;
}
