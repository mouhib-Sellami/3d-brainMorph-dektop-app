/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BASE_SERVER_API_URL: string;
    readonly VITE_AUTH_TOKEN: string;
    readonly VITE_SOCKET_SERVER: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module 'moment/locale/fr';
declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.json';
declare module '*.css';
declare module '*.mp4';
declare module '*.zpt';