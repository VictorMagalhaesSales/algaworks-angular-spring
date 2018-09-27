import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }


  handle(errorResponse: any) {
    let msg: string;


    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    }else if (errorResponse.status >= 400 && errorResponse.status <= 499) {

      const erros = errorResponse.json();
      msg = erros[0].mensagemUsuario;
      console.error('Ocorreu um erro', errorResponse);

    }else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro2 ', errorResponse);
    }

    this.toasty.error(msg);
  }
}
