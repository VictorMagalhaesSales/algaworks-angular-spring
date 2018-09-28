import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalDeRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [ ];
  @ViewChild('tabela') grid;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService
  ) { }

  ngOnInit() {
    //this.pesquisar();
  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
      .then(resposta => {
        this.pessoas = resposta.content;
        this.totalDeRegistros = resposta.totalElements;
      });
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }

        this.toasty.success('Pesssoa excluída com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  mudarAtivado(pessoa: any): void{
    pessoa.ativo = !pessoa.ativo;
    const status = pessoa.ativo === true ? 'ativado' : 'desativado' ;
    this.pessoaService.mudarStatus(pessoa.codigo, pessoa.ativo)
      .then(() => this.toasty.success(`Pesssoa ${status} com sucesso!`) )
      .catch(erro => this.errorHandler.handle(erro));
  }



}
