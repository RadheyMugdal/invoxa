import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconAlertCircle, IconHome } from "@tabler/icons-react";

export default function ShareNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 max-w-md px-4">
        <IconAlertCircle className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="text-2xl font-bold">Share Link Not Found</h1>
        <p className="text-muted-foreground">
          This share link doesn't exist or has been revoked. Please contact the invoice owner for a new link.
        </p>
        <Button asChild>
          <Link href="/">
            <IconHome className="mr-2 h-4 w-4" />
            Go to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
