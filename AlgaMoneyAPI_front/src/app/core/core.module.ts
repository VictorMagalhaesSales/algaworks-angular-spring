import { ConfirmationService } from 'primeng/components/common/api';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';
import { ErrorHandlerService } from './error-handler.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
