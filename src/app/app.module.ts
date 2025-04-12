import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { SchedulePageComponent } from './schedule/schedule-page/schedule-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { CoursesPageComponent } from './courses/courses-page/courses-page.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { provideNativeDateAdapter } from '@angular/material/core';

import { provideHttpClient } from '@angular/common/http';
import { CourseDialogComponent } from './courses/course-dialog/course-dialog.component';

import { ToastrModule } from 'ngx-toastr';
import { ClassroomsPageComponent } from './classrooms/classrooms-page/classrooms-page.component';
import { ClassroomDialogComponent } from './classrooms/classroom-dialog/classroom-dialog.component';
import { ProfessorsPageComponent } from './professors/professors-page/professors-page.component';
import { ProfessorDialogComponent } from './professors/professor-dialog/professor-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SchedulePageComponent,
    CoursesPageComponent,
    CourseDialogComponent,
    ClassroomsPageComponent,
    ClassroomDialogComponent,
    ProfessorsPageComponent,
    ProfessorDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTimepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [provideHttpClient(), provideNativeDateAdapter()],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas); // Añadir el pack de iconos sólidos
  }
}
