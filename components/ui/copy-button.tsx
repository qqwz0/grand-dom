"use client";

import { Button } from "./button";
import { Check, Copy, Mail } from "lucide-react";
import { isMobile } from "@/lib/isMobile";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface CopyButtonProps {
  contact: string;
  type: "email" | "phone";
}

export default function CopyButton({ contact, type }: CopyButtonProps) {
  const { copied, copyToClipboard } = useCopyToClipboard(2000);

  const handleClick = () => {
    if (isMobile() && type === "email") {
      window.location.href = `mailto:${contact}`;
      return;
    }

    if (isMobile() && type === "phone") {
      window.location.href = `tel:${contact.replace(/\s+/g, "")}`;
      return;
    }

    copyToClipboard(contact, type);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400 hover:text-green-300"
      onClick={handleClick}
      aria-label={`Copy ${type}`}
      style={{ cursor: "pointer" }}
    >
      {copied === type ? (
        <Check className="h-4 w-4" />
      ) : isMobile() ? (
        <Mail className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}
