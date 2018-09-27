import { Component, OnInit } from '@angular/core';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    //this.pesquisar();
  }

  pesquisar(pagina: number) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(lancamentos => {
        this.lancamentos = lancamentos.content;
        this.totalRegistros = lancamentos.totalElements;
        //this.filtro.pagina =
      });
  }

  aoMudarPagina(event: LazyLoadEvent){
    console.log(event);
    const pagina = event.first / event.rows ;
    console.log(pagina);
    this.pesquisar(pagina);
  }

}

/**
 * Primeiro temos que setar 2 parâmetros na requisição: page e size(fixo);
 * Depois, temos pegar a informação quantidade de itens na requsição da pesquisa e guardar;
 * No formulário, diremos o tanto de linhas [rows]="quantidade de itens na requisição", lazy="true" e [totalRecords]="quantidade de itens NO GERAL";
 * Botaremos, também no formulário, o (onLazyLoad)="aoMudarPagina($event)". Ele será executado ao mudar a página; 
 * No método aoMudarPagina, dividiremos o primeiro elemento pelo número de linhas e pegaremos a página;
 * Chamaremos, no aoMudarPagina, o método pesquisar passando a página como parâmetro, que será colocado no objeto filtro e passado para o método get do serviço.
*/