import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormularioService } from '../../services/formulario.service';
import { Formulario } from '../../interfaces/formulario';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CampoFormComponent } from '../campo-form/campo-modal.component';
import { CampoService } from '../../services/campo.service';
import { Campo } from '../../interfaces/campo';
import { FormularioModalComponent } from '../formulario-modal/formulario-modal.component';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  formularios: Formulario[] = [];
  selectedFormulario?: Formulario;
  formularioGroup!: FormGroup;
  closeResult = '';

  constructor(
    private formularioService: FormularioService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private campoService: CampoService
  ) {}

  ngOnInit(): void {
    this.loadFormularios();
  }

  loadFormularios(): void {
    this.formularioService.getFormularios().subscribe({
      next: (data: Formulario[]) => {
        this.formularios = data;
      },
      error: (error) => {
        console.error('Error cargando formularios', error);
      }
    });    
  }

  onFormularioSelect(formulario: Formulario): void {
    this.selectedFormulario = formulario;
    this.buildForm();
  }

  
  buildForm(): void {
    if (this.selectedFormulario?.campos) {
      const group: { [key: string]: FormControl } = {};
      this.selectedFormulario.campos.forEach(campo => {
        group[campo.nombre_campo] = this.fb.control('');
      });
      this.formularioGroup = this.fb.group(group);
    }
  }
  

  onSubmit(): void {
    console.log(this.formularioGroup.value);
  }

  onCreateCampo() {
    const modalRef = this.modalService.open(CampoFormComponent);
    modalRef.componentInstance.id_formulario = this.selectedFormulario?.id_formulario;  
    modalRef.componentInstance.campoCreado.subscribe(() => {
      this.refreshFormularioSelected(this.selectedFormulario?.id_formulario!);
    });
  }
  
  onEditCampo(campo: Campo) {
    const modalRef = this.modalService.open(CampoFormComponent);
    modalRef.componentInstance.id_formulario = this.selectedFormulario?.id_formulario;
    modalRef.componentInstance.campo = campo;
    modalRef.componentInstance.campoCreado.subscribe(() => {
      this.refreshFormularioSelected(this.selectedFormulario?.id_formulario!);
    });
  }  
  
  onDeleteCampo(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este campo?')) {
      this.campoService.deleteCampo(id).subscribe({
        next: () => {
          alert(`Campo con id ${id} eliminado`);
          this.refreshFormularioSelected(this.selectedFormulario!.id_formulario!);
        },
        error: (error) => {
          alert('Error al eliminar el campo');
          console.error('Error al eliminar el campo', error);
        }
      });
    }
  }

  refreshFormularioSelected(id: number): void {
    this.formularioService.getFormularioById(id).subscribe({
      next: (formulario: Formulario) => {
        this.selectedFormulario = formulario;
        this.buildForm();
        console.log('Formulario actualizado:', formulario);
      },
      error: (error) => {
        console.error('Error al refrescar el formulario', error);
      }
    });
  }

  onCreateFormulario() {
    const modalRef = this.modalService.open(FormularioModalComponent);
    modalRef.componentInstance.formularioCreado.subscribe(() => {
      this.loadFormularios();
    });
  }

  onEditFormulario(formulario: Formulario): void {
    const modalRef = this.modalService.open(FormularioModalComponent);
    modalRef.componentInstance.formulario = formulario; 
    modalRef.componentInstance.formularioEditado.subscribe(() => {
      this.loadFormularios(); 
      this.refreshFormularioSelected(formulario.id_formulario!);
    });
  }

  onDeleteFormulario(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este formulario?')) {
        this.formularioService.deleteFormulario(id).subscribe({
            next: () => {
                alert(`Formulario con id ${id} eliminado`);
                this.formularios = this.formularios.filter(formulario => formulario.id_formulario !== id);
                if (this.selectedFormulario?.id_formulario === id) {
                    this.selectedFormulario = undefined;
                    this.formularioGroup = this.fb.group({});
                }
            },
            error: (error) => {
                alert('Error al eliminar el formulario');
                console.error('Error al eliminar el formulario', error);
            }
        });
    }
}


}
