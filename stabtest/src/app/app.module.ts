import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { IndexProductComponent } from './pages/product/index-product/index-product.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { IndexProductDescComponent } from './pages/productDescription/index-product-desc/index-product-desc.component';
import { EditProductDescComponent } from './pages/productDescription/edit-product-desc/edit-product-desc.component';
import { CreateProductDescComponent } from './pages/productDescription/create-product-desc/create-product-desc.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IndexLineComponent } from './pages/line/index-line/index-line.component';
import { EditLineComponent } from './pages/line/edit-line/edit-line.component';
import { CreateLineComponent } from './pages/line/create-line/create-line.component';
import { ShowProductDescComponent } from './pages/productDescription/show-product-desc/show-product-desc.component';
import { MonitoringRoomComponent } from './pages/monitoring-room/monitoring-room.component';
import { IndexVariantComponent } from './pages/variant/index-variant/index-variant.component';
import { CreateVariantComponent } from './pages/variant/create-variant/create-variant.component';
import { EditVariantComponent } from './pages/variant/edit-variant/edit-variant.component';
import { MaintenanceComponent } from './pages/error/maintenance/maintenance.component';
import { IndexParameterComponent } from './pages/parameter/index-parameter/index-parameter.component';
import { CreateParameterComponent } from './pages/parameter/create-parameter/create-parameter.component';
import { EditParameterComponent } from './pages/parameter/edit-parameter/edit-parameter.component';
import { IndexDataStabilityComponent } from './pages/DataStability/index-data-stability/index-data-stability.component';
import { CreateDataStabilityComponent } from './pages/DataStability/create-data-stability/create-data-stability.component';
import { EditDataStabilityComponent } from './pages/DataStability/edit-data-stability/edit-data-stability.component';
import { TransactionDataStabilityComponent } from './pages/DataStability/transaction-data-stability/transaction-data-stability.component';
import { ShowDataStabilityComponent } from './pages/DataStability/show-data-stability/show-data-stability.component';
import { IndexTechnicalUserComponent } from './pages/TechnicalUser/index-technical-user/index-technical-user.component';
import { CreateTechnicalUserComponent } from './pages/TechnicalUser/create-technical-user/create-technical-user.component';
import { EditTechnicalUserComponent } from './pages/TechnicalUser/edit-technical-user/edit-technical-user.component';
import { ExportAsModule } from 'ngx-export-as';
import { AsltComponent } from './pages/aslt/aslt.component';
import { SwitcherComponent } from './utils/switcher/switcher.component';
import { ForbiddenComponent } from './pages/error/forbidden/forbidden.component';
import { SpinnerComponent } from './utils/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    ScheduleComponent,
    IndexProductComponent,
    EditProductComponent,
    IndexProductDescComponent,
    EditProductDescComponent,
    CreateProductDescComponent,
    NotFoundComponent,
    IndexLineComponent,
    EditLineComponent,
    CreateLineComponent,
    ShowProductDescComponent,
    MonitoringRoomComponent,
    IndexVariantComponent,
    CreateVariantComponent,
    EditVariantComponent,
    MaintenanceComponent,
    IndexParameterComponent,
    CreateParameterComponent,
    EditParameterComponent,
    IndexDataStabilityComponent,
    CreateDataStabilityComponent,
    EditDataStabilityComponent,
    TransactionDataStabilityComponent,
    ShowDataStabilityComponent,
    IndexTechnicalUserComponent,
    CreateTechnicalUserComponent,
    EditTechnicalUserComponent,
    AsltComponent,
    SwitcherComponent,
    ForbiddenComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ExportAsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
