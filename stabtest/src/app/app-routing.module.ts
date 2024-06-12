import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { IndexProductDescComponent } from './pages/productDescription/index-product-desc/index-product-desc.component';
import { NotFoundComponent } from './pages/error/not-found/not-found.component';
import { IndexLineComponent } from './pages/line/index-line/index-line.component';
import { CreateLineComponent } from './pages/line/create-line/create-line.component';
import { EditLineComponent } from './pages/line/edit-line/edit-line.component';
import { ShowProductDescComponent } from './pages/productDescription/show-product-desc/show-product-desc.component';
import { EditProductDescComponent } from './pages/productDescription/edit-product-desc/edit-product-desc.component';
import { CreateProductDescComponent } from './pages/productDescription/create-product-desc/create-product-desc.component';
import { MonitoringRoomComponent } from './pages/monitoring-room/monitoring-room.component';
import { IndexProductComponent } from './pages/product/index-product/index-product.component';
import { IndexVariantComponent } from './pages/variant/index-variant/index-variant.component';
import { CreateVariantComponent } from './pages/variant/create-variant/create-variant.component';
import { EditVariantComponent } from './pages/variant/edit-variant/edit-variant.component';
import { MaintenanceComponent } from './pages/error/maintenance/maintenance.component';
import { IndexParameterComponent } from './pages/parameter/index-parameter/index-parameter.component';
import { CreateParameterComponent } from './pages/parameter/create-parameter/create-parameter.component';
import { EditParameterComponent } from './pages/parameter/edit-parameter/edit-parameter.component';
import { EditProductComponent } from './pages/product/edit-product/edit-product.component';
import { IndexDataStabilityComponent } from './pages/DataStability/index-data-stability/index-data-stability.component';
import { CreateDataStabilityComponent } from './pages/DataStability/create-data-stability/create-data-stability.component';
import { EditDataStabilityComponent } from './pages/DataStability/edit-data-stability/edit-data-stability.component';
import { ShowDataStabilityComponent } from './pages/DataStability/show-data-stability/show-data-stability.component';
import { TransactionDataStabilityComponent } from './pages/DataStability/transaction-data-stability/transaction-data-stability.component';
import { IndexTechnicalUserComponent } from './pages/TechnicalUser/index-technical-user/index-technical-user.component';
import { CreateTechnicalUserComponent } from './pages/TechnicalUser/create-technical-user/create-technical-user.component';
import { EditTechnicalUserComponent } from './pages/TechnicalUser/edit-technical-user/edit-technical-user.component';

import { AsltComponent } from './pages/aslt/aslt.component';
import { AuthenticationGuard } from './services/middleware/authentication/authentication.guard';
import { AuthorizationGuard } from './services/middleware/authorization/authorization.guard';
import { ForbiddenComponent } from './pages/error/forbidden/forbidden.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent,  },
  // { path: 'monitoring-room', component: MaintenanceComponent,  },
  { path: 'monitoring-room', component: MonitoringRoomComponent,  },
  { path: 'auth', component: AuthenticationComponent,  },
  { path: 'schedule', component: ScheduleComponent,  },
  { path: 'master/product', component: IndexProductComponent,  },
  { path: 'master/product/:id', component: EditProductComponent,  },
  { path: 'master/product-description', component: IndexProductDescComponent,  },
  { path: 'master/product-description/create', component: CreateProductDescComponent,  },
  { path: 'master/product-description/edit/:id', component: EditProductDescComponent,  },
  { path: 'master/product-description/:id', component: ShowProductDescComponent,  },
  { path: 'master/line', component: IndexLineComponent,  },
  { path: 'master/line/create', component: CreateLineComponent,  },
  { path: 'master/line/:id', component: EditLineComponent,  },
  { path: 'master/variant', component: IndexVariantComponent,  },
  { path: 'master/variant/create', component: CreateVariantComponent,  },
  { path: 'master/variant/:id', component: EditVariantComponent,  },
  { path: 'master/parameter', component: IndexParameterComponent,  },
  { path: 'master/parameter/create', component: CreateParameterComponent,  },
  { path: 'master/parameter/:id', component: EditParameterComponent,  },
  { path: 'master/technical-user', component: IndexTechnicalUserComponent,  },
  { path: 'master/technical-user/create', component: CreateTechnicalUserComponent,  },
  { path: 'master/technical-user/:id', component: EditTechnicalUserComponent,  },
  { path: 'data-stability/pocari-sweat', component: IndexDataStabilityComponent,  },
  { path: 'data-stability/soyjoy', component: IndexDataStabilityComponent,  },
  { path: 'data-stability/ion-water', component: IndexDataStabilityComponent,  },
  { path: 'data-stability/new-product', component: IndexDataStabilityComponent,  },
  { path: 'data-stability/:name/create', component: CreateDataStabilityComponent,  },
  { path: 'data-stability/:name/edit/:id', component: EditDataStabilityComponent,  },
  { path: 'data-stability/:name/show/:id', component: ShowDataStabilityComponent,  },
  { path: 'data-stability/:name/create-transaction/:id', component: TransactionDataStabilityComponent,  },
  { path: 'prediction', component: AsltComponent,  },
  { path: 'forbidden', component: ForbiddenComponent,  },
  { path: '**', component: NotFoundComponent,  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
