import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextAreaComponent,
    multi: true
  }]
})
export class TextAreaComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder = "Placeholder";
  @Input() name = "";
  @Input() color = "primary";
  @Input() required = false;
  @Input() readonly = false;
  @Input() rows = 1;
  @Input() cols = 5;
  @Input() mode = "md";

  @Input() value: string;
  @Input() disabled = false;

  @Output() newTextInputValue = new EventEmitter();

  constructor() { }

  // This is the initial value set to the component
  // @param value The input value.
  public writeValue(value: any) {
    this.value = value;
  }

  // Sets a method in order to propagate changes back to the form.
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // * Registers a callback to be triggered when the control has been touched.
  // * @param fn Callback to be triggered when the number input is touched.
  public registerOnTouched(fn: any) {
      this.onTouched = fn;
  }

  // Sets the disabled state through the model
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  // Called when number input is blurred. Needed to properly implement `ControlValueAccessor`.
  onTouched: () => any = () => {
  }

  // Method set in `registerOnChange` to propagate changes back to the form.
  propagateChange = (_: any) => {
  }

  ngOnInit() {}

  onInputChange() {
    this.newTextInputValue.emit(this.value);
  }

}
