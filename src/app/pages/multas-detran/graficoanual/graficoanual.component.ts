import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { MultasService } from '../../shared';
import { Multa } from '../../shared/models/multa.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface MultasAnual {
  data: number[];
  label: string;
}

@Component({
  selector: 'app-graficoanual',
  templateUrl: './graficoanual.component.html',
  styleUrls: ['./graficoanual.component.css'],
})
export class GraficoanualComponent implements OnInit {
  lineChartData: ChartDataSets[] = [];

  lineChartLabels: Label[] = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  multas2018 = {} as MultasAnual;
  multas2019 = {} as MultasAnual;
  multas2020 = {} as MultasAnual;

  multasTotal2018: Multa[] = [];
  multasTotal2019: Multa[] = [];
  multasTotal2020: Multa[] = [];
  constructor(private multaService: MultasService) {}

  ngOnInit(): void {
    this.loadDataMultas();

    // load data MOCK
    this.multas2018.data = [85, 62, 98, 35, 77, 75, 72, 78, 75, 77, 75, 85];
    this.multas2018.label = 'Multas 2018';
    this.multas2019 = {
      data: [85, 72, 78, 75, 77, 75, 85, 62, 98, 35, 77, 75],
      label: 'Multas 2019',
    };

    this.multas2020 = {
      data: [55, 20, 48, 85, 62, 98, 35, 77, 75, 25, 77, 75],
      label: 'Multas 2020',
    };
    this.lineChartData = [this.multas2018, this.multas2019, this.multas2020];
  }

  loadDataMultas(): void {
    const anos = [2018, 2019, 2020];
    anos.forEach((ano) => {
      this.multaService.getAll(ano).subscribe(
        (multas) => {
          switch (ano) {
            case 2018:
              this.multasTotal2018 = multas;
              this.setDadosGrafico(ano, this.multasTotal2018);
              break;
            case 2019:
              this.multasTotal2019 = multas;
              this.setDadosGrafico(ano, this.multasTotal2019);
              break;
            case 2020:
              this.multasTotal2020 = multas;
              this.setDadosGrafico(ano, this.multasTotal2020);
              break;
            default:
              break;
          }
        },
        (err) => console.error('Erro ao carregar dados => ', err)
      );
    });
  }

  setDadosGrafico(ano: number, multasTotal: Multa[]) {
    let multasTotalTem = multasTotal;

    const indexMulta = multasTotalTem.findIndex(
      (multa) => multa.tipo === 'TOTAL'
    );

    switch (ano) {
      case 2018:
        this.multas2018.data = this.setData(multasTotal[indexMulta]);
        break;
      case 2019:
        this.multas2019.data = this.setData(multasTotal[indexMulta]);
        break;
      case 2020:
        this.multas2020.data = this.setData(multasTotal[indexMulta]);
        break;
      default:
        break;
    }
  }

  private setData(multa: Multa) {
    const data = [
      multa.jan,
      multa.fev,
      multa.mar,
      multa.abr,
      multa.mai,
      multa.jun,
      multa.jul,
      multa.ago,
      multa.set,
      multa.out,
      multa.nov,
      multa.dez,
    ];
    return data;
  }
}
