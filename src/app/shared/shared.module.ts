import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './compontes/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './compontes/spinner/spinner.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    ThemeToggleComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    ThemeToggleComponent
  ]
})
export class SharedModule { }
