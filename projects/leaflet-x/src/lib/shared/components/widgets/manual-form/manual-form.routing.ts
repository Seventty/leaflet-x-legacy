import { Routes, RouterModule } from '@angular/router';
import { PointFormComponent } from './components/point-form/point-form.component';
import { LinesFormComponent } from './components/linesForm/linesForm.component';
import { PolygonFormComponent } from './components/polygon-form/polygon-form.component';

const routes: Routes = [
  { path: 'points', component: PointFormComponent },
  { path: 'lines', component: LinesFormComponent },
  { path: 'polygons', component: PolygonFormComponent },
  { path: '', redirectTo: '/points', pathMatch: 'full' } // redirecciona a 'puntos' por defecto
];

export const ManualFormRoutes = RouterModule.forChild(routes);
