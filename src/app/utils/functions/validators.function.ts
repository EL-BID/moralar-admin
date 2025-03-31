import { FormControl, Validators } from '@angular/forms';
import { DateTime } from 'luxon';

export const trimWhiteSpace = (control: FormControl): Validators => {
  let value = control.value;
  if (typeof value === 'string') {
    if (/^\s/.test(value)) {
      value = value.trim();
      control.setValue(value);
    }
    if (/\s{2}/.test(value)) {
      value = value.trim() + ' ';
      control.setValue(value);
    }
  }
  return null;
};

export const isCpfValid = (control: FormControl): null | Validators => {
  const cpf = control.value;
  if (cpf) {
    let numbers, digits, sum, i, result, equalDigits;
    equalDigits = 1;
    if (cpf.length < 11) {
      return null;
    }
    for (i = 0; i < cpf.length - 1; i++) {
      if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
        equalDigits = 0;
        break;
      }
    }
    if (!equalDigits) {
      numbers = cpf.substring(0, 9);
      digits = cpf.substring(9);
      sum = 0;
      for (i = 10; i > 1; i--) {
        sum += numbers.charAt(10 - i) * i;
      }
      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result !== Number(digits.charAt(0))) {
        return {
          cpf: true
        };
      }
      numbers = cpf.substring(0, 10);
      sum = 0;
      for (i = 11; i > 1; i--) {
        sum += numbers.charAt(11 - i) * i;
      }
      result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
      if (result !== Number(digits.charAt(1))) {
        return {
          cpf: true
        };
      }
      return null;
    } else {
      return {
        cpf: true
      };
    }
  }
  return null;
};

export const isCnpjValid = (control: FormControl): null | Validators => {
  const cnpj = control.value ? control.value : '';

  if (cnpj == '') {
    return null;
  }
​
  if (cnpj.length != 14) {
    return null;
  }
​
  // Elimina CNPJs invalidos conhecidos
  if (cnpj == '00000000000000' || 
    cnpj == '11111111111111' || 
    cnpj == '22222222222222' || 
    cnpj == '33333333333333' || 
    cnpj == '44444444444444' || 
    cnpj == '55555555555555' || 
    cnpj == '66666666666666' || 
    cnpj == '77777777777777' || 
    cnpj == '88888888888888' || 
    cnpj == '99999999999999') {
    return { cnpj: true };
  }
​
  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) {
    return { cnpj: true };
  }
​
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1)) {
    return { cnpj: true };
  }
​
  return null;
};

export const dateValidator = (control: FormControl): null | Validators => {
  if (control.value) {
    const dateDue = DateTime.fromFormat(control.value, 'yyyy-MM-dd');
    const days = dateDue.diff(DateTime.local(), 'days').days;
    return days >= 0 ? null : { dateError: true };
  }
  return null;
};

export const isDateBeforeTomorrowValid = (control: FormControl): null | Validators => {
  const date = control.value;
  if (date) {
    const dateObject = DateTime.fromFormat(date, 'yyyy-MM-dd');
    const today = DateTime.local();
    const days = today.diff(dateObject, 'days').days;
    return days >= 0 ? null : { isDateBeforeTomorrowError: true };
  }
  return null;
};

export const isDateAfterYesterdayValid = (control: FormControl): null | Validators => {
  const date = control.value;
  if (date) {
    const dateObject = DateTime.fromFormat(date, 'yyyy-MM-dd');
    const today = DateTime.local();
    const days = today.diff(dateObject, 'days').days;
    return days <= 0 ? null : { isDateAfterYesterdayError: true };
  }
  return null;
};

export const wasTermAccepted = (control: FormControl): null | Validators => {
  return control.value !== true
    ? { term: true }
    : null;
};
