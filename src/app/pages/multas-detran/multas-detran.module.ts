import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultasDetranRoutingModule } from './multas-detran-routing.module';
import { GraficoanualComponent } from './graficoanual/graficoanual.component';
import { PortipodemultaComponent } from './portipodemulta/portipodemulta.component';
import { MensalComponent } from './mensal/mensal.component';


@NgModule({
  declarations: [GraficoanualComponent, PortipodemultaComponent, MensalComponent],
  imports: [
    CommonModule,
    MultasDetranRoutingModule
  ]
})
export class MultasDetranModule { }
