import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from "@angular/core";

import 'rxjs/add/operator/toPromise';
import { Pessoa } from '../core/model';

@Injectable()
export class PessoaService {

    url = 'http://localhost:8080/pessoas';

    constructor(private http: Http) {}

    pesquisar(filtro: PessoaFiltro): Promise<any>{
        const params = new URLSearchParams();
        const headers = new Headers();
        headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.itensPorPagina.toString());

        if (filtro.nome) {
            params.set('nome', filtro.nome);
        }

        return this.http.get(this.url, { headers, search: params } )
            .toPromise()
            .then(resposta => resposta.json());
    }

    listarTodas(): Promise<any> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.get(this.url, { headers })
        .toPromise()
        .then(response => response.json().content);
    }

    excluir(codigo: number): Promise<any>{
      const headers = new  Headers();
      headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.delete(`${this.url}/${codigo}`, { headers })
        .toPromise()
        .then(() => null);
    }

    mudarStatus(codigo: number, ativo: boolean): Promise<void> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      headers.append('Content-Type', 'application/json');

      return this.http.put(`${this.url}/${codigo}/ativo`, ativo, { headers })
        .toPromise()
        .then(() => null);
    }

    adicionar(pessoa: Pessoa): Promise<Pessoa> {
      const headers = new Headers();
      headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.url, JSON.stringify(pessoa), { headers })
        .toPromise()
        .then(response => response.json());
    }

}

export class PessoaFiltro {
    nome: string;
    pagina = 0;
    itensPorPagina = 5;
  }
