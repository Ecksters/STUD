import { ContextSectionComponent } from './components/context/context-section/context-section.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EasyPieChartDirective } from './directives/easy-pie-chart/easy-pie-chart.directive';
import { FlotDirective } from './directives/flot/flot.directive';
import { SparklineDirective } from './directives/sparklines/sparkline.directive';

import { TodoListsComponent } from './components/widgets/todo-lists/todo-lists.component';
import { PieChartsComponent } from './components/widgets/pie-charts/pie-charts.component';
import { RandomPostComponent } from './components/widgets/random-post/random-post.component';
import { RecentPostsComponent } from './components/widgets/recent-posts/recent-posts.component';
import { PastDaysComponent } from './components/widgets/past-days/past-days.component';
import { PhotosComponent } from './components/widgets/photos/photos.component';
import { TasksComponent } from './components/widgets/tasks/tasks.component';
import { ContactsComponent } from './components/widgets/contacts/contacts.component';
import { RatingsComponent } from './components/widgets/ratings/ratings.component';
import { ProfileComponent } from './components/widgets/profile/profile.component';
import { RecentSignupsComponent } from './components/widgets/recent-signups/recent-signups.component';

@NgModule ({
    declarations: [
        // Directives
        EasyPieChartDirective,
        FlotDirective,
        SparklineDirective,

        // Components
        PastDaysComponent,
        TodoListsComponent,
        PieChartsComponent,
        RandomPostComponent,
        RecentPostsComponent,
        PhotosComponent,
        TasksComponent,
        ContactsComponent,
        RatingsComponent,
        ProfileComponent,
        RecentSignupsComponent,
        ContextSectionComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        // Directives
        EasyPieChartDirective,
        FlotDirective,
        SparklineDirective,

        // Components
        PastDaysComponent,
        TodoListsComponent,
        PieChartsComponent,
        RandomPostComponent,
        RecentPostsComponent,
        PhotosComponent,
        TasksComponent,
        ContactsComponent,
        RatingsComponent,
        ProfileComponent,
        RecentSignupsComponent,
        ContextSectionComponent
    ]
})

export class SharedModule {  }
