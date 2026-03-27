export interface AppRoute {
  path: string;
}

export const routes: AppRoute[] = [
  { path: '/' },
  { path: '/posts/:id' },
  { path: '*' },
];
