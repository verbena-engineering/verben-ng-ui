import { ThemeSwitcherModule } from './../../projects/verben-ng-ui/src/lib/theme-switcher/theme-switcher.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch  } from '@angular/common/http';
import {
    ConvertToIntegerModule,
    ConvertToNumberModule,
    EmailValidatorModule,
    NumberRangeModule,
    PhoneNumberModule,
    RequiredInputModule,
    ValidateInputModule,
    DropDownModule,
    ImageModule,
    SvgModule,
    CardModule,
    CardDataViewModule,
    ValidationModule,
    ButtonModule,
    VerbenaButtonModule,
    VerbenaBadgeModule,
    VerbenaInputModule,
     } from '../../projects/verben-ng-ui/src/public-api';
import { CDVModule } from './Components/card-data-view/cdv.module';
import { CardDataViewComponent } from './Components/card-data-view/cdv.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    CardDataViewComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     NumberRangeModule,
    RequiredInputModule,
    EmailValidatorModule,
    ConvertToNumberModule,
    ConvertToIntegerModule,
    PhoneNumberModule,
    ValidationModule,
    ButtonModule,
    VerbenaBadgeModule,
    ValidateInputModule,
    VerbenaInputModule,
    VerbenaButtonModule,
    DropDownModule,
    ImageModule,
    SvgModule,
    CardModule,
    CardDataViewModule,
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
