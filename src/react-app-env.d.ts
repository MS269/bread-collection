/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
    readonly REACT_APP_API_KEY: string;
    readonly REACT_APP_AUTH_DOMAIN: string;
    readonly REACT_APP_PROJECT_ID: string;
    readonly REACT_APP_STORAGE_BUCKET: string;
    readonly REACT_APP_MESSAGING_SENDER_ID: string;
    readonly REACT_APP_APP_ID: string;
    readonly REACT_APP_MEASUREMENT_ID: string;
    readonly REACT_APP_ADMIN_PASSWORD: string;
  }
}
