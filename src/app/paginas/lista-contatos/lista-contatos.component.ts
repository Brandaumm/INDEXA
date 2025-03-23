import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ContainerComponent } from '../../componentes/container/container.component';
import { CabecalhoComponent } from '../../componentes/cabecalho/cabecalho.component';
import { SeparadorComponent } from '../../componentes/separador/separador.component';
import { ContatoComponent } from '../../componentes/contato/contato.component';
import { FormsModule } from '@angular/forms';
import { FormularioContatoComponent } from '../formulario-contato/formulario-contato.component';
import { ContatoService } from '../../services/contato.service';
import { Contato } from '../../componentes/contato/contato';
import { PerfilContatoComponent } from '../perfil-contato/perfil-contato.component';


@Component({
  selector: 'app-lista-contatos',
  standalone: true,
  imports: [
    RouterOutlet, 
    ContainerComponent, 
    CabecalhoComponent,
    SeparadorComponent,
    ContatoComponent,
    FormsModule,
    FormularioContatoComponent,
    RouterLink,
    PerfilContatoComponent
  ],
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.css'
})

export class ListaContatosComponent implements OnInit{
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = []

  filtroPorTexto: string = "";

  constructor(private contatoService: ContatoService){}

  ngOnInit(){
    this.contatoService.obterContatos().subscribe(listaContatos => {
    this.contatos = listaContatos;
    })
  }

  filtrarContatosPorTexto(): Contato[] {
    if(!this.filtroPorTexto){
      return this.contatos
    }
    return this.contatos.filter(contato => {
      return contato.nome.toLowerCase().includes(this.filtroPorTexto.toLowerCase())
    })
  }

  filtrarContatosPorLetraInicia(letra:string): Contato[]{
    
    return this.filtrarContatosPorTexto()?.filter(contato => {
      return contato.nome.toLowerCase().startsWith(letra)
    })
  }
}
