import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormularioService } from '../../services/formulario.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Formulario } from '../../interfaces/formulario';

@Component({
  selector: 'app-formulario-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-modal.component.html',
  styleUrls: ['./formulario-modal.component.css']
})
export class FormularioModalComponent {
  formularioGroup: FormGroup;
  @Output() formularioCreado = new EventEmitter<void>();
  @Output() formularioEditado = new EventEmitter<void>();
  @Input() formulario?: Formulario;

  constructor(
    private fb: FormBuilder,
    private formularioService: FormularioService,
    public activeModal: NgbActiveModal
  ) {
    this.formularioGroup = this.fb.group({
      nombre_formulario: [''],
    });
  }

  ngOnInit(): void {
    if (this.formulario) {
      this.formularioGroup.patchValue(this.formulario);
    }
  }

  onSubmit() {
    if (this.formulario) {
      this.formularioService.updateFormulario(this.formulario.id_formulario!, this.formularioGroup.value).subscribe({
        next: () => {
          alert('Formulario actualizado exitosamente');
          this.activeModal.close();
          this.formularioEditado.emit();
        },
        error: (error) => {
          console.error('Error al actualizar el formulario', error);
          alert('Error al actualizar el formulario');
        }
      });
    } else {
      const formularioData: Formulario = this.formularioGroup.value;
      this.formularioService.createFormulario(formularioData).subscribe({
        next: () => {
          alert('Formulario creado exitosamente');
          this.activeModal.close();
          this.formularioCreado.emit();
        },
        error: (error) => {
          console.error('Error al crear el formulario', error);
          alert('Error al crear el formulario');
        }
      });
    }
  }
}
