import { ElectronHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
  }
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
declare module '*.glb';


export {};
