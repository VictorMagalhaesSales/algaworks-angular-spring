import { Title } from '@angular/platform-browser';
import { ToastyService } from 'ng2-toasty';
import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { PessoaService } from '../../pessoas/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) { }

  ngOnInit() {
    this.title.setTitle('Cadastro de lançamentos');
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.listarCategorias();
    this.listarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo)
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualzarTituloEdição();
      })
      .catch(erro => this.handler.handleError(erro));
  }

  listarCategorias() {
    this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(categoria => {
          return { label: categoria.nome, value: categoria.codigo}
        })
      })
      .catch((erro) => this.handler.handleError(erro));
  }

  listarPessoas() {
    this.pessoaService.listarTodas()
      .then( pessoas => {
        this.pessoas = pessoas.map(pessoa => {
          return { label: pessoa.nome, value: pessoa.codigo}
        })
      })
      .catch(erro => this.handler.handleError(erro));
  }


  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then((lancamento) => {
        this.toasty.success('Lançamento adicionado com sucesso!');

        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamento.codigo])
      })
      .catch(erro => this.handler.handleError(erro));
  }
  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualzarTituloEdição();
        this.toasty.success('Lançamento alterado com sucesso!');
      })
      .catch(erro => this.handler.handleError(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['lancamentos/novo']);
  }

  atualzarTituloEdição() {
    this.title.setTitle(`Edição de lançamentos: ${this.lancamento.descricao}`);
  }

}
