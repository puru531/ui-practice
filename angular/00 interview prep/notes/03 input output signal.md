# Configuring Component inputs & outputs {NOT recommended}
```typescript
data = input({
  alias: 'newData', // data in current component but newData in other components. <NOT recommended to use>
  transform: (value) => Number(value) + 1, // Transform the value before emitting.
});
```

```typescript
@Output('newName') name = new EventEmitter<string>();
name = output('newName');
```




# Custom two way binding

`parent.component.ts`
```typescript
someValue = 'initial value';
```

`parent.component.html`
```html
<app-child [(value)]="someValue"></app-child>
```

`child.component.ts`
```typescript
@Input() value: string;
@Output() valueChange = new EventEmitter<string>();
// format of the output event should be name of the input + 'Change' = valueChange

handleChange() {
  this.valueChange.emit('new value');
}
```

# Easier  way to setup two-way binding [angular 17.2+]

`child.component.ts`
```typescript
import { model } from '@angular/core';
value = model();

handleChange() {
  this.value.set('new value');
}
```