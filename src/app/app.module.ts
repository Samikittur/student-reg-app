import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RoutingComponent} from './app.routing';
import { Services} from './services';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, FormControlName} from '@angular/forms';
import { AppRouterModule } from './app.routing';
import { AppComponent } from './app.component';
import { AuthServices} from './auth.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageComponent } from './manage/manage.component';
import { RequestsComponent } from './requests/requests.component';

import { MatDialogModule, MatButtonModule, MatCardModule} from '@angular/material';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { UserAuthGuard } from './user-auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    AdminDashboardComponent,
    ManageComponent,
    RequestsComponent,
    MatDialogComponent,
    UserDashboardComponent
  ],
  entryComponents: [
    MatDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRouterModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [Services,AuthServices,AdminAuthGuard,UserAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
