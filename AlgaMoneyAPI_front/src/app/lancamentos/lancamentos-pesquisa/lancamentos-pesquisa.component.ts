import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { Component, OnInit, ViewChild } from '@angular/core';

import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { ToastyService } from 'ng2-toasty';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) {  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(lancamentos => {
        this.lancamentos = lancamentos.content;
        this.totalRegistros = lancamentos.totalElements;
        //this.filtro.pagina =
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows ;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any){
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      if(this.grid.first === 0){
        this.pesquisar();
      }
      else {
        this.grid.first = 0;
      }
      this.toasty.success('Lançamento excluido com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
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
