# Pipes
Pipes in Angular are a way to transform data / value in templates. They are simple functions that accept an input value and return a transformed value. Pipes can be used to format data, such as dates, currencies, and numbers, or to perform other transformations.

## Types of Pipes

### Built-in Pipes
Angular provides several built-in pipes, including:
- **DatePipe**: Formats dates.
- **UpperCasePipe**: Transforms text to uppercase.
- **LowerCasePipe**: Transforms text to lowercase.
- **CurrencyPipe**: Formats numbers as currency.
- **DecimalPipe**: Formats numbers with decimal points.
- **PercentPipe**: Formats numbers as percentages.
- **JsonPipe**: Converts objects to JSON strings.
- **SlicePipe**: Slices arrays and strings.
- **AsyncPipe**: Handles asynchronous data.

### Custom Pipes
You can also create custom pipes to handle specific transformations. Custom pipes are defined as classes that implement the `PipeTransform` interface and are decorated with the `@Pipe` decorator.

## Examples

### Basic Example: Using Built-in Pipes
```html
<!-- Using DatePipe -->
<p>{{ today | date }}</p>
<!-- Using UpperCasePipe -->
<p>{{ 'hello world' | uppercase }}</p>
<!-- Using CurrencyPipe -->
<p>{{ 1234.56 | currency:'USD' }}</p>
```

### Chaining Pipes
You can chain multiple pipes together to perform multiple transformations on a value:
```html
<p>{{ 'hello world' | uppercase | slice:0:5 }}</p> <!-- Output: HELLO -->
```

### Arguments in Pipes
Some pipes accept arguments to customize their behavior. For example, the `currency` pipe accepts a currency code and a display format:
```html
<!-- currency -->
<p>{{ 1234.56 | currency:'USD':'symbol':'1.2-2' }}</p> <!-- Output: $1,234.56 -->


<!-- date -->
<p>{{ today | date:'yyyy-MM-dd' }}</p> <!-- Output: 2022-01-01 -->

<!-- decimal -->
<p>{{ 1234.56 | number:'1.2-2' }}</p> <!-- Output: 1,234.56 -->
<p>{{ 1234.56 | number:'1.0-0' }}</p> <!-- Output: 1,235 -->
```


### Using Pipes in Component Classes
You can also use pipes in component classes by injecting the `DatePipe` service and calling its `transform` method:
```typescript
import { DatePipe } from '@angular/common';

export class AppComponent {
  today: Date;

  constructor(private datePipe: DatePipe) {
    this.today = new Date();
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
```

### Advanced Example1: Creating a Custom Pipe
1. Create a custom pipe class:
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponentialStrength'
})
export class ExponentialStrengthPipe implements PipeTransform {
  transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
  }
}
```

2. Register the custom pipe in an Angular module:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ExponentialStrengthPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

3. Use the custom pipe in a template:
```html
<p>{{ 2 | exponentialStrength:'10' }}</p> <!-- Output: 1024 -->
```

By using pipes, you can easily format and transform data in your Angular applications, making your templates cleaner and more readable.



### Advanced Example2: Temperature pipe
To create pipes using cli, use `ng generate pipe <pipe-name>`

```bash
ng generate pipe temperature
```

`temperature.pipe.ts`
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: string | number, inputType: 'cel' | 'fah', outputType?: 'cel' | 'fah' ) {
    let val: number;




    if(typeof value === 'string') {
      val = pareseFloat(value);
    } else {
      val = value;
    }

    let outputTemp: number;

    if(inputType === 'cel' && outputType === 'fah') {
      
      outputTemp = val * (9/5) + 32;
    } else if(inputType === 'fah' && outputType === 'cel') {
      outputTemp = val - 32 * (5/9);
    } else {
      outputTemp = val;
    }

    let symbol : '°F' | '°C';


    if(!outputType) {
      symbol = inputType === 'cel' ? '°C' : '°F';
    } else {
      symbol = outputType === 'cel' ? '°C' : '°F';
    }

    return `${outputTemp} ${symbol}`;
  }
}
```
```html
<p>{{ 32 | temp:'fah':'cel' }}</p> <!-- Output: 0°C -->

<!-- chainig -->
<p>{{ 16.12 | number:'1.1-2' | temp:'cel':'fah' }}</p> <!-- Output: 61.02°F -->
```

## Pure and Impure Pipes
By default, Angular pipes are pure, meaning they are state independent and only recompute when the input value changes. This can improve performance by reducing unnecessary recalculations. However, if a pipe relies on external state or has side effects, it should be marked as impure by setting the `pure` property to `false` in the `@Pipe` decorator.

```typescript
@Pipe({
  name: 'myPipe',
  pure: false //caching disabled
})
export class MyPipe implements PipeTransform {
  transform(value: any): any {
    // Impure pipe logic
  }
}
```
