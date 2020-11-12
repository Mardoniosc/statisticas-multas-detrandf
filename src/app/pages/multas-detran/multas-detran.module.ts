import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { MultasDetranRoutingModule } from './multas-detran-routing.module';
import { GraficoanualComponent } from './graficoanual/graficoanual.component';
import { PortipodemultaComponent } from './portipodemulta/portipodemulta.component';
import { MensalComponent } from './mensal/mensal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GraficoanualComponent,
    PortipodemultaComponent,
    MensalComponent,
  ],
  imports: [
    CommonModule,
    MultasDetranRoutingModule,
    SharedModule,
    ChartsModule,
  ],
})
export class MultasDetranModule {}
