import { Component, OnInit } from '@angular/core';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { Multa } from '../../shared/models/multa.model';
import { MultasService } from '../../shared';

interface TipoMulta {
  data: number[];
  label: string;
}

@Component({
  selector: 'app-mensal',
  templateUrl: './mensal.component.html',
  styleUrls: ['./mensal.component.css'],
})
export class MensalComponent implements OnInit {
  total: number = 0;
  lineChartData: ChartDataSets[] = [];

  tipoMultaAtual = {
    data: [85, 72, 78, 75, 77, 75, 85, 72, 78, 75, 77, 75],
    label: 'Excesso de velocidade - 13499',
  } as TipoMulta;

  lineChartLabels: Label[] = [
    'Jan',
    'FeV',
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
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  tiposMultas: string[] = [];

  multasTotal2018: Multa[] = [];
  multasTotal2019: Multa[] = [];
  multasTotal2020: Multa[] = [];
  constructor(private multaService: MultasService) {}

  ngOnInit(): void {
    this.loadDataMultas();
    this.lineChartData.push(this.tipoMultaAtual);
  }

  loadDataMultas(): void {
    const anos = [2018, 2019, 2020];
    anos.forEach((ano) => {
      this.multaService.getAll(ano).subscribe(
        (multas) => {
          switch (ano) {
            case 2018:
              this.multasTotal2018 = multas;
              this.loadTiposMultaAno(2018);
              this.atualizaDadosTipoMulta('ALCOOLEMIA');
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

  atualizaDadosTipoMulta(tipoMulta: String) {
    const dataSetTipo = this.multasTotal2018.find(
      (multa) => multa.tipo === tipoMulta
    );

    this.total = Number(dataSetTipo.total_ANO);

    this.tipoMultaAtual.label = `${tipoMulta} - ${this.total}`;

    this.tipoMultaAtual.data = [];
    this.tipoMultaAtual.data = [
      dataSetTipo.jan,
      dataSetTipo.fev,
      dataSetTipo.mar,
      dataSetTipo.abr,
      dataSetTipo.mai,
      dataSetTipo.jun,
      dataSetTipo.jul,
      dataSetTipo.ago,
      dataSetTipo.set,
      dataSetTipo.out,
      dataSetTipo.nov,
      dataSetTipo.dez,
    ];
    this.lineChartData = [];
    this.lineChartData.push(this.tipoMultaAtual);
  }

  loadTiposMultaAno(ano) {
    this.tiposMultas = [];
    let aux: Multa[] = [];
    ano = Number(ano);

    switch (ano) {
      case 2018:
        aux = this.multasTotal2018;
        break;
      case 2019:
        aux = this.multasTotal2019;
        break;
      case 2020:
        aux = this.multasTotal2020;
        break;
      default:
        break;
    }
    aux.forEach((multa) => {
      if (multa.tipo !== 'TOTAL') {
        this.tiposMultas.push(multa.tipo);
      }
    });
  }
}
