import { Component } from '@angular/core';
import { UserInputComponent } from "./user-input/user-input.component";
import { InvestmentResultsComponent } from "./investment-results/investment-results.component";
import { HeaderComponent } from "./header/header.component";
import { IInvestment } from './investment-results/investment.model';
import type { IInvestmentInput } from './investment-input.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [UserInputComponent, InvestmentResultsComponent, HeaderComponent],
})
export class AppComponent {
  investmentResults: IInvestment[] = [];

  onCalculateInvestmentResults(event: IInvestmentInput) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } = event;

    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }

    this.investmentResults = annualData;
    console.log('===== investmentResults', this.investmentResults);
  }

}
