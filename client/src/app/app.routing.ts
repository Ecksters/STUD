import { AuthGuard } from './auth.guard';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  { path: 'overview', loadChildren: './overview/overview.module#OverviewModule'},
  //{ path: 'portfolio/:id', loadChildren: './users/user-portfolio/user-portfolio.module#UserPortfolioModule'},
  { path: '', loadChildren: './layout/layout.module#LayoutModule',
    canLoad:  [AuthGuard]}
];

export const routing = RouterModule.forRoot(ROUTES);
