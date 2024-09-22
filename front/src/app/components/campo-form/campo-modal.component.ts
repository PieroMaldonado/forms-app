import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CampoService } from '../../services/campo.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Campo } from '../../interfaces/campo';

@Component({
  selector: 'app-campo-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './campo-modal.component.html',
  styleUrl: './campo-modal.component.css'
})
export class CampoFormComponent implements OnInit {
  @Input() id_formulario!: number;
  @Input() campo?: Campo;
  @Output() campoCreado = new EventEmitter<void>();
  campoGroup: FormGroup;

  constructor(private fb: FormBuilder, private campoService: CampoService, public activeModal: NgbActiveModal) {
    this.campoGroup = this.fb.group({
      nombre_campo: [''],
      tipo_campo: ['']
    });
  }

  ngOnInit() {
    this.loadCampoData();
  }

  private loadCampoData() {
    if (this.campo) {
      this.campoGroup.patchValue({
        nombre_campo: this.campo.nombre_campo,
        tipo_campo: this.campo.tipo_campo
      });
    }
  }
  

  onSubmit() {
    const campoData = this.buildCampoData();
  
    if (this.campo) {
      this.updateCampo(campoData);
    } else {
      this.createCampo(campoData);
    }
  }

  private buildCampoData() {
    return {
      ...this.campoGroup.value,
      id_formulario: this.id_formulario
    };
  }
  
  private updateCampo(campoData: any) {
    if (this.campo) {
      this.campoService.updateCampo(this.campo.id_campo!, campoData).subscribe({
        next: () => {
          this.handleSuccess('Campo editado exitosamente');
        },
        error: (error) => {
          this.handleError('Error al editar el campo', error);
        }
      });
    }
  }
  
  private createCampo(campoData: any) {
    this.campoService.createCampo(campoData).subscribe({
      next: () => {
        this.handleSuccess('Campo creado exitosamente');
      },
      error: (error) => {
        this.handleError('Error al crear el campo', error);
      }
    });
  }
  
  private handleSuccess(message: string) {
    this.activeModal.close();
    alert(message);
    this.campoCreado.emit();
  }
  
  private handleError(message: string, error: any) {
    console.error(message, error);
    alert(message);
  }
  
}
