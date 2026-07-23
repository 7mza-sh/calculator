// الحصول على العناصر من الصفحة
let display = document.getElementById('display-result');
let numbers = document.getElementsByClassName('btn-number');
let operators = document.getElementsByClassName('btn-operator');
let equals = document.getElementsByClassName('btn-equals')[0];
let clear = document.getElementsByClassName('btn-clear')[0];

// جميع المتغيرات العامة بالمشروع
let num1 = '';
let num2 = '';
let operator = {
  sign: '',
  selected: false
}

// تحديد الرقم
function numSelect (number, operatorSelected) {
  if (!operatorSelected) {
    num1 += number;
  }
  else {
    num2 += number;
  }
  display.textContent = num1 + operator.sign + num2;
}

// تحديد نوع العملية
function operatorSelect (sign) {
  operator.sign = sign;
  operator.selected = true;
  if (num1 === '') {
    num1 = '0';
  }
  display.textContent = num1 + operator.sign + num2;
}

// دالة الحساب
function calc (sign) {
  if (operator.selected && num2 !== '' &&
  !(num2 === '0' && sign === '÷')) {
    let result;
    num1 = Number(num1);
    num2 = Number(num2);
    if (sign === '+') {
      result = num1 + num2;
    }
    else if (sign === '-') {
      result = num1 - num2;
    }
    else if (sign === '×') {
      result = num1 * num2;
    }
    else if (sign === '÷') {
      result = num1 / num2;
    }
    reset();
    num1 = String(result);
    display.textContent = num1 + operator.sign + num2;
    if (num1 === '0') {
      num1 = '';
    }
  }
}

// دالة الحذف
function reset () {
  num1 = '';
  num2 = '';
  operator = {
    sign: '',
    selected: false
  }
  display.textContent = '0';
}

// الأحداث
for (let number of numbers) {
  number.addEventListener('click', _ => numSelect(number.textContent, operator.selected));
}

for (let oneOperator of operators) {
  oneOperator.addEventListener('click', _ => operatorSelect(oneOperator.textContent))
}
equals.addEventListener('click', _ => calc(operator.sign));
clear.addEventListener('click', reset);