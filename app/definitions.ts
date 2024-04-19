export type rezultati = {
  bruto:number,
  apgadajamie:number,
  irnodoklugramatina:boolean,
  neapliekamismin:number,
  papildusstvieglojumi:number,
  VSAOI:number,
  IINBaze:number,
  IIN1:number,
  IIN2:number,
  darbaDevVSAOI:number,
  neto:number
  darbaDevIzdevumi:number
}

export type ieraksti = {
  id:number,
  bruto:number,
  neto:number,
  apgadajamie:number,
  papildusAtvieglojumi:number,
  irnodokluGramatina:boolean,
  neapliekamaisMinimums:number
  date:Date
}