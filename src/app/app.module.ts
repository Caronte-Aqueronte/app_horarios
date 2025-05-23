import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';

import { MatCheckboxModule } from '@angular/material/checkbox';

import { provideNativeDateAdapter } from '@angular/material/core';

import { provideHttpClient } from '@angular/common/http';
import { CourseDialogComponent } from './courses/course-dialog/course-dialog.component';

import { BaseChartDirective } from 'ng2-charts';
import {
  provideCharts,
  withDefaultRegisterables,
  } from 'ng2-charts';

import { ToastrModule } from 'ngx-toastr';
import { ClassroomsPageComponent } from './classrooms/classrooms-page/classrooms-page.component';
import { ClassroomDialogComponent } from './classrooms/classroom-dialog/classroom-dialog.component';
import { ProfessorsPageComponent } from './professors/professors-page/professors-page.component';
import { ProfessorDialogComponent } from './professors/professor-dialog/professor-dialog.component';
import { GeneratedScheduleComponent } from './schedule/generated-schedule/generated-schedule.component';
import { CsvDialogComponent } from './csv/csv-dialog/csv-dialog.component';

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
    GeneratedScheduleComponent,
    CsvDialogComponent,
  ],
  imports: [
    BaseChartDirective,
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
    MatTabsModule,
    MatRadioModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [provideHttpClient(), provideNativeDateAdapter(),provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas); // Añadir el pack de iconos sólidos
  }
}
