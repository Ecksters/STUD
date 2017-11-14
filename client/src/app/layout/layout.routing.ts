import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const LAYOUT_ROUTES: Routes = [
    { path: '', component: LayoutComponent, children: [
        // Home
        { path: '', redirectTo: 'summary', pathMatch: 'full' },
        { path: 'summary', loadChildren: '../pages/summary/summary.module#SummaryModule' },

        { path: 'users/profile/:id', loadChildren: '../pages/users/profile/profile.module#ProfileModule' },

        // Refurbs
        { path: 'refurbs/submit',
        loadChildren: '../pages/refurbs/submit/refurbs-submit.module#RefurbsSubmitModule' },
        { path: 'refurbs/verify',
        loadChildren: '../pages/refurbs/verify/refurbs-verify.module#RefurbsVerifyModule' },
        { path: 'refurbs/view',
        loadChildren: '../pages/refurbs/ready/refurbs-ready.module#RefurbsReadyModule' },
        { path: 'refurbs/donations',
        loadChildren: '../pages/refurbs/donations/refurbs-donations.module#RefurbsDonationsModule' },

        // Leaderboards
        { path: 'leaderboards/location',
        loadChildren: '../pages/leaderboards/location/leaderboards-location.module#LeaderboardsLocationModule' },

        // Administration
        { path: 'administration/system',
        loadChildren: '../pages/administration/system/administration-system.module#AdministrationSystemModule' },
        { path: 'administration/region',
        loadChildren: '../pages/administration/region/administration-region.module#AdministrationRegionModule' },
        { path: 'administration/location',
        loadChildren: '../pages/administration/location/administration-location.module#AdministrationLocationModule' },
        { path: 'administration/section',
        loadChildren: '../pages/administration/section/administration-section.module#AdministrationSectionModule' },
        { path: 'administration/moderation',
        loadChildren: '../pages/administration/moderation/administration-moderation.module#AdministrationModerationModule' }
    ]}
];

export const LayoutRouting = RouterModule.forChild(LAYOUT_ROUTES);
