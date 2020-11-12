import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraficoanualComponent } from './graficoanual/graficoanual.component';
import { MensalComponent } from './mensal/mensal.component';
import { PortipodemultaComponent } from './portipodemulta/portipodemulta.component';

const routes: Routes = [
  { path: '', component: GraficoanualComponent },
  { path: 'mensal', component: MensalComponent },
  { path: 'multa', component: PortipodemultaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultasDetranRoutingModule {}
