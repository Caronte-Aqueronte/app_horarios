import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulePageComponent } from './schedule/schedule-page/schedule-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { CoursesPageComponent } from './courses/courses-page/courses-page.component';
import { ClassroomsPageComponent } from './classrooms/classrooms-page/classrooms-page.component';
import { ProfessorsPageComponent } from './professors/professors-page/professors-page.component';
import { GeneratedScheduleComponent } from './schedule/generated-schedule/generated-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'schedule', pathMatch: 'full' },
      {
        path: 'schedule',
        component: SchedulePageComponent,
      },
      {
        path: 'generated-schedule',
        component: GeneratedScheduleComponent,
      },
      { path: 'courses', component: CoursesPageComponent },
      { path: 'professors', component: ProfessorsPageComponent },
      { path: 'classrooms', component: ClassroomsPageComponent },
      { path: '**', redirectTo: 'schedule' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
