"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const DISCLAIMER_TOAST_ID = "tp-toolkit-disclaimer";
const DISCLAIMER_TITLE = "Disclaimer";
const DISCLAIMER_MESSAGE =
  "This tool is an unofficial utility. All results should be verified using official tools. No guarantee of accuracy or uptime.";

export default function DisclaimerToast() {
  useEffect(() => {
    toast(DISCLAIMER_TITLE, {
      id: DISCLAIMER_TOAST_ID,
      description: DISCLAIMER_MESSAGE,
      duration: Infinity,
      dismissible: false,
      action: {
        label: "Accept",
        onClick: () => toast.dismiss(DISCLAIMER_TOAST_ID),
      },
    });
  }, []);

  return null;
}
