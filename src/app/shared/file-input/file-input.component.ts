import { ChangeDetectionStrategy, Component, ElementRef, HostListener, WritableSignal, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent implements ControlValueAccessor {
  onChange!: (file: File | null) => void;
  file: WritableSignal<File | null> = signal(null);

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file.set(file);
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue() {
    this.host.nativeElement.value = '';
    this.file.set(null);
  }

  registerOnChange(fn: (file: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(_fn: (file: File | null) => void) {
    // nothing to do here
  }
}
