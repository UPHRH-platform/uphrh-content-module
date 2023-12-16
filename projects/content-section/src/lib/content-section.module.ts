import { NgModule } from '@angular/core';
import { ContentSectionComponent } from './components/content-section/content-section.component';
import { CommonConsumptionModule } from 'uphrh-common-consumption';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SubjectSectionComponent } from './components/subject-section/subject-section.component';


@NgModule({
  declarations: [ContentSectionComponent, SubjectSectionComponent],
  imports: [CommonConsumptionModule, HttpClientModule, CommonModule],
  exports: [ContentSectionComponent, SubjectSectionComponent]
})
export class ContentSectionModule { }
