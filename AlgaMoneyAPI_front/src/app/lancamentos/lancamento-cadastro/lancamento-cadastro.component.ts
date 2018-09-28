import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { PessoaService } from '../../pessoas/pessoa.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private handler: ErrorHandler,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService
    ) { }

  ngOnInit() {
    this.listarCategorias();
    this.listarPessoas();
  }

  listarCategorias(){
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(categoria => {
          return { label: categoria.nome, value: categoria.codigo}
        })
      })
      .catch((erro) => this.handler.handleError(erro));
  }

  listarPessoas(){
    this.pessoaService.listarTodas()
      .then( pessoas => {
        this.pessoas = pessoas.map(pessoa => {
          return { label: pessoa.nome, value: pessoa.codigo}
        })
      })
      .catch(erro => this.handler.handleError(erro));
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        form.reset();
        this.lancamento = new Lancamento();
      })
      .catch(erro => this.handler.handleError(erro));
  }

}
