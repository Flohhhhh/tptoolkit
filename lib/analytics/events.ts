import { track } from "@vercel/analytics/react";

type TrackableProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

type AnalyticsEventName =
  | "search_coordinates"
  | "search_name"
  | "open_service_area_reference"
  | "history_replay_used"
  | "paste_go_used";

export type CoordinateSearchSource =
  | "search_panel"
  | "map_double_click"
  | "history_replay"
  | "paste_go";

export type CoordinateSearchErrorType =
  | "none"
  | "no_results"
  | "request_failed";

export type PasteGoStatus =
  | "success"
  | "invalid_clipboard"
  | "clipboard_error";

const safeTrack = (
  name: AnalyticsEventName,
  properties?: TrackableProperties
) => {
  if (typeof window === "undefined") return;

  try {
    track(name, properties);
  } catch (error) {
    console.error(`[analytics] Failed to track "${name}"`, error);
  }
};

export const trackSearchCoordinates = (properties: {
  source: CoordinateSearchSource;
  success: boolean;
  result_count: number;
  error_type: CoordinateSearchErrorType;
}) => {
  safeTrack("search_coordinates", properties);
};

export const trackSearchName = (properties: {
  query_length: number;
  success: boolean;
  result_count: number;
}) => {
  safeTrack("search_name", properties);
};

export const trackOpenServiceAreaReference = () => {
  safeTrack("open_service_area_reference");
};

export const trackHistoryReplayUsed = (properties: {
  card_size: "small" | "large";
}) => {
  safeTrack("history_replay_used", properties);
};

export const trackPasteGoUsed = (properties: {
  status: PasteGoStatus;
}) => {
  safeTrack("paste_go_used", properties);
};
