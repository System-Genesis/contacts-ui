/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_PAGE_SIZE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
