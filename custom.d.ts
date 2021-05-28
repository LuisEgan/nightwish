declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare module "*.gif";

declare global {
  interface Window {
    dataLayer: any[];
  }
}
