import { Component } from '@angular/core';
import { DragdropComponent } from '../../componentes/dragdrop/dragdrop.component';


@Component({
  selector: 'app-receitas-despesas',
  standalone: true,
  imports: [DragdropComponent],
  templateUrl: './receitas-despesas.component.html',
  styleUrl: './receitas-despesas.component.css'
})
export class ReceitasDespesasComponent {

}
