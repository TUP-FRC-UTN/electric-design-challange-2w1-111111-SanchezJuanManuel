import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, UntypedFormArray, UntypedFormControl, Validators } from '@angular/forms';
import { Budget, ModuleType, Zone } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [BudgetService],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
})
export class BudgetFormComponent implements OnInit {

  private readonly budgetService = inject(BudgetService);
  private readonly router = inject(Router);
  subscriptions = new Subscription();
  
  
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/forms/typed-forms#formarray-dynamic-homogenous-collections
    - https://dev.to/chintanonweb/angular-reactive-forms-mastering-dynamic-form-validation-and-user-interaction-32pe
  */
    moduleTypes : ModuleType[] = [];
    zone : any[] = [];
    price : Number = 0;
    slots : Number = 0;
    selectedModule : ModuleType = {} as ModuleType;
  
    form = new FormGroup({
      id: new FormControl(''),
      client: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      modules: new UntypedFormArray([])
    });

  ngOnInit(): void {
    this.loadModuleTypes();
    this.zone = Object.values(Zone);


  }

  get modules() {
    return this.form.controls["modules"] as UntypedFormArray;
  }

  save() {
    const budget : any = this.form.value;
    const addSubscription = this.budgetService.addBudget(budget).subscribe({
      next: () => {
        this.router.navigate(['list']);
      },
      error: (err) => {
        alert('Error al comunicarse con la API')
      }
    });
    this.subscriptions.add(addSubscription);
  }

  onNewModule() {
    const formArray = this.form.controls["modules"];
    const eventForm = new FormGroup({
      id: new FormControl(""),
      types: new FormControl("", [Validators.required]),
      zone: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      slots: new FormControl("", [Validators.required])
    });
    formArray.push(eventForm);
  }

  onDeleteModule(index: number) {
    this.modules.removeAt(index);
  }

  loadModuleTypes() {
    const getAllSubscription = this.budgetService.getAllModuleTypes().subscribe({
      next: (typeList: ModuleType[]) => {
        this.moduleTypes = typeList;
      },
      error: (err :any) => {
        alert('Error al comunicarse con la API')
      }
    });
    this.subscriptions.add(getAllSubscription);
  }

  onChangeValue(id : number) {
    
    const moduleType = this.moduleTypes.find(item => item.id == id);
    this.price = moduleType!.price;
    this.slots = moduleType!.slots;
  }
}
