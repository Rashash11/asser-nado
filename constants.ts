import { HexColor } from "@/types";

// Page IDs
export const HERO_PAGE_ID: string = formatted("HERO_PAGE_ID");
export const OUR_STORY_PAGE_ID: string = formatted("OUR_STORY_PAGE_ID");
export const EVENT_DETAILS_PAGE_ID: string = formatted("EVENT_DETAILS_PAGE_ID");
export const TIMER_TO_WEDDING_PAGE_ID: string = formatted("TIMER_TO_WEDDING_PAGE_ID");
export const GET_IN_TOUCH_PAGE_ID: string = formatted("GET_IN_TOUCH_PAGE_ID");
export const REQUEST_TO_QUESTS_PAGE_ID: string = formatted("REQUEST_TO_QUESTS_PAGE_ID");
export const FOOTER_PAGE_ID: string = formatted("FOOTER_PAGE_ID");

// Colors
export const THEME_BG_COLOR: HexColor = "#faf7ef";
export const DEFAULT_SVG_COLOR_FILL: HexColor = "#3b2a23";
export const GOLD_COLOR: HexColor = "#f4c430";

// Common
export const GENERAL_LOADING_ID: string = formatted("GENERAL_LOADING_ID");
export const OUR_STORY_PARAGRAPH_CLASS_NAME: string = formatted("OUR_STORY_PARAGRAPH_CLASS_NAME");

function formatted(str: string) {
    return str.toLowerCase().replaceAll('_', '-');
}