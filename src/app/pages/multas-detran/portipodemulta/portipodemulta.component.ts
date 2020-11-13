import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MultasService } from '../../shared';
import { Multa } from '../../shared/models/multa.model';

interface TipoMulta {
  data: number[];
  label: string;
}

@Component({
  selector: 'app-portipodemulta',
  templateUrl: './portipodemulta.component.html',
  styleUrls: ['./portipodemulta.component.css'],
})
export class PortipodemultaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [
    'Apple',
    'Banana',
    'Kiwifruit',
    'Orange',
    'Grapes',
    'Grapes',
    'Grapes',
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' },
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits ' },
  ];

  multasTotal2018: Multa[] = [];
  multasTotal2019: Multa[] = [];
  multasTotal2020: Multa[] = [];

  constructor(private multaService: MultasService) {}

  ngOnInit(): void {
    this.loadDataMultas();
  }

  loadDataMultas(): void {
    const anos = [2018, 2019, 2020];
    anos.forEach((ano) => {
      this.multaService.getAll(ano).subscribe(
        (multas) => {
          switch (ano) {
            case 2018:
              this.multasTotal2018 = multas;
              this.loadDataSetChar(2018);
              break;
            case 2019:
              this.multasTotal2019 = multas;
              break;
            case 2020:
              this.multasTotal2020 = multas;
              break;
            default:
              break;
          }
        },
        (err) => console.error('Erro ao carregar dados => ', err)
      );
    });
  }

  loadDataSetChar(ano: number) {
    ano = Number(ano);
    this.barChartData = [];
    let dadosTemp = [];
    let labels = [];
    let aux: Multa[] = [];
    switch (ano) {
      case 2020:
        aux = this.multasTotal2020;
        break;
      case 2019:
        aux = this.multasTotal2019;
        break;
      case 2018:
        aux = this.multasTotal2018;
        break;
      default:
        break;
    }

    aux.forEach((multa) => {
      if (multa.tipo !== 'TOTAL') {
        dadosTemp.push(multa.total_ANO);
        labels.push(multa.tipo);
      }
    });

    this.barChartData.push({
      data: dadosTemp,
      label: `Multas ${ano} -  ${aux[0].total_ANO}`,
    });
    this.barChartLabels = labels;
  }
}
