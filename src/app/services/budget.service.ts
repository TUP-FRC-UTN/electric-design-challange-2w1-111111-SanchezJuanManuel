import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BudgetDTO } from '../models/budgetDTO';
import { Budget, ModuleType } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly budgetUrl = 'http://localhost:3000/budgets'
  private readonly moduleTypeUrl = 'http://localhost:3000/module-types';

  constructor() { }

  getAllBudgets(): Observable<BudgetDTO[]> {
    const observable = this.http.get<BudgetDTO[]>(this.budgetUrl);

    return observable;
  }

  addBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(this.budgetUrl, budget);
  }

  getAllModuleTypes(): Observable<ModuleType[]> {
    const observable = this.http.get<ModuleType[]>(this.moduleTypeUrl);

    return observable;
  }
}
