import { Component, inject, OnInit, signal } from '@angular/core';
import { BidiModule } from '@angular/cdk/bidi';
import { Balance } from './pages/list/components/balance/balance';
import { TransactionItem } from './pages/list/components/transaction-item/transaction-item';
import { Transaction } from '../../shared/transaction/interfaces/transactions';
import { TransactionType } from '../../shared/transaction/enums/transaction-type';
import { NoTransactions } from './pages/list/components/no-transactions/no-transactions';
import { HttpClient } from '@angular/common/http';
import { TransactionsService } from '../../shared/transaction/services/transactions.service';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FeedbackService } from '../../shared/feedback/services/feedback.service';
import { ConfirmationDialogService } from '../../shared/dialog/confirmation/services/confirmation-dialog.service';
import { TransactionsContainerComponent } from './pages/list/components/transactions-container/transactions-container.component';


@Component({
  selector: 'app-home',
  imports: [
    BidiModule,
    Balance,
    TransactionItem,
    NoTransactions,
    MatAnchor,
    MatButtonModule,
    RouterLink,
    TransactionsContainerComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private transactionsService = inject(TransactionsService);
  private feedbackService = inject(FeedbackService);
  private router = inject(Router);
  private confirmationDialogService = inject(ConfirmationDialogService);


  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.getTransactions();
  }

  edit(transaction: Transaction) {
    this.router.navigate(['/edit', transaction.id]);
  }

  remove(transaction: Transaction) {
    this.confirmationDialogService.open({
      title: 'Deletar transação',
      message: 'Você realmente quer deletar essa transação?',
      yesBtnText: 'Sim!',
      noBtnText: 'Não',
    }).subscribe({
        next: () => {
          this.transactionsService.delete(transaction.id).subscribe({
            next: () => {
              this.removeTransactionFromArray(transaction);
              this.feedbackService.success('Transação removida com sucesso!');
            },
          });
        },
      });
  }

  private removeTransactionFromArray(transaction: Transaction) {
    this.transactions.update((transactions) =>
      transactions.filter((item) => item.id !== transaction.id),
    );
  }

  private getTransactions() {
    this.transactionsService.getAll().subscribe({
      next: (transactions) => {
        this.transactions.set(transactions);
      },
    });
  }
}


