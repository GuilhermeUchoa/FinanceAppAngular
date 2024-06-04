import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PortfolioService } from '../../service/portfolioService/portfolio.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';


  constructor(
    private _PortfolioService: PortfolioService,
    private _Router:Router,
  ) {

  }


  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname0: string = wb.SheetNames[0];
      const wsname1: string = wb.SheetNames[1];
      const wsname2: string = wb.SheetNames[2];
      const wsname3: string = wb.SheetNames[3];

      let listaDePlanilhas = [wsname0, wsname1, wsname2, wsname3]

      listaDePlanilhas.forEach((planilha) => {
       
        const ws: XLSX.WorkSheet = wb.Sheets[planilha];
        /* save data */
        this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

        /* Colocar para interagir com a meu db.json ou API aqui */
        this.data.forEach((data,) => {

          let Excelativo = ""
          let Excelquantidade = 0
          let ExcelprecoFechamento = 0


          if(planilha == 'BDR'){
            Excelativo = data[3]
            Excelquantidade = data[7]
            ExcelprecoFechamento = data[11]
          }if(planilha == 'Tesouro Direto'){
            Excelativo = data[0]
            Excelquantidade = data[11]
            ExcelprecoFechamento = 1
           
          }if(planilha == 'Acoes' || planilha == 'Fundo de Investimento'){
            Excelativo = data[3]
            Excelquantidade = data[8]
            ExcelprecoFechamento = data[12]
          }

          //Se nao tiver como atuaizaliar entao devo criar um novo ativo, criar essa feature
          try {

            if (Excelativo != '') {
              this._PortfolioService.getAtivoNome(Excelativo).subscribe((dataApi) => {
                
                dataApi[0].ativo = Excelativo
                dataApi[0].quantidade = Excelquantidade
                dataApi[0].cotacao = ExcelprecoFechamento
                if(planilha == 'BDR'){console.log(ExcelprecoFechamento)}
                this._PortfolioService.atualizarAtivo(dataApi[0].id, dataApi[0]).subscribe()
                
              })
            }

          } catch (error) {
            console.error('Erro na tabela !!! verifique o codigo !!!');
            
          }

        })

      })



    };
    reader.readAsBinaryString(target.files[0]);

    // this._Router.routeReuseStrategy.shouldReuseRoute = ()=> false
    // this._Router.onSameUrlNavigation ="reload"
    // this._Router.navigate([this._Router.url])

  }


  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}
