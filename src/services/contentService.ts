
import { ISLANDS as defaultIslands, TOTAL_POINTS_TO_CONQUER, MANDALA_PETAL_THRESHOLDS, MAIN_BACKGROUND_URL, WELCOME_BACKGROUND_URL } from '../constants';
import { Island } from '../types';

const CONTENT_KEY = 'rpg_soft_skills_islands_content';
const STORYTELLING_URL_KEY = 'rpg_soft_skills_storytelling_url';
const MAIN_BG_URL_KEY = 'rpg_soft_skills_main_bg_url';
const WELCOME_BG_URL_KEY = 'rpg_soft_skills_welcome_bg_url';

const getFromStorageOrDefault = (key: string, defaultValue: string): string => {
    try {
        const storedValue = localStorage.getItem(key);
        // If storedValue is null, undefined, or an empty string, fallback to default.
        return storedValue || defaultValue; 
    } catch (error) {
        console.error(`Error reading ${key} from localStorage, falling back to default.`, error);
        return defaultValue;
    }
};

const saveToStorage = (key: string, value: string): void => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      localStorage.setItem(key, trimmedValue);
    } else {
      // If the URL is empty or just whitespace, remove it from storage to allow fallback to default.
      localStorage.removeItem(key);
    }
};

const getIslands = (): Island[] => {
  try {
    const storedContent = localStorage.getItem(CONTENT_KEY);
    if (storedContent) {
      const parsed = JSON.parse(storedContent);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error reading islands from localStorage, falling back to default.", error);
  }
  
  // If not in storage or invalid, use default and store it for future editing
  localStorage.setItem(CONTENT_KEY, JSON.stringify(defaultIslands));
  return defaultIslands;
};

const saveIslands = (islands: Island[]): void => {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(islands));
};

export const contentService = {
  getIslands,
  saveIslands,
  getStorytellingUrl: () => getFromStorageOrDefault(STORYTELLING_URL_KEY, '#'),
  saveStorytellingUrl: (url: string) => saveToStorage(STORYTELLING_URL_KEY, url),
  getMainBackgroundUrl: () => getFromStorageOrDefault(MAIN_BG_URL_KEY, MAIN_BACKGROUND_URL),
  saveMainBackgroundUrl: (url: string) => saveToStorage(MAIN_BG_URL_KEY, url),
  getWelcomeBackgroundUrl: () => getFromStorageOrDefault(WELCOME_BG_URL_KEY, WELCOME_BACKGROUND_URL),
  saveWelcomeBackgroundUrl: (url: string) => saveToStorage(WELCOME_BG_URL_KEY, url),
  TOTAL_POINTS_TO_CONQUER,
  MANDALA_PETAL_THRESHOLDS,
};