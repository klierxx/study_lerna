import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
    icon?: string;
    hidden?: boolean;
    keepAlive?: boolean;
    [key: string]: any;
  }
}
