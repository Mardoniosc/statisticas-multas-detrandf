export class Multa {
  constructor(
    public tipo?: string,
    public total_ANO?: string,
    public jan?: number,
    public fev?: number,
    public mar?: number,
    public abr?: number,
    public mai?: number,
    public jun?: number,
    public jul?: number,
    public ago?: number,
    public set?: number,
    public out?: number,
    public nov?: number,
    public dez?: number
  ) {}

  static fromJson(jsonData: any): Multa {
    return Object.assign(new Multa(), jsonData);
  }
}
