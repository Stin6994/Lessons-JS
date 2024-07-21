console.log('test2');

// Упражнение 21 - Задание на работу с методами массивов

/* Задачи:

1) У вас есть небольшой массив с данными о доходах каждой торговой точки. 
Напишите функцию getPositiveIncomeAmount, которая принимает этот массив данных и возвращает сумму 
только положительных значений из каждого объекта. (число)

Пример:

getPositiveIncomeAmount(funds) => 13300

2) Напишите функцию getTotalIncomeAmount, которая тоже принимает этот массив данных. 
Если хотя бы один из объектов содержит отрицательное значение поля amount, 
то функция возвращает сумму всех значений. (число) 
Если таких значений нет - запускается функция getPositiveIncomeAmount с тем же массивом данных. */

const funds = [
    {amount: -1400},
    {amount: 2400},
    {amount: -1000},
    {amount: 500},
    {amount: 10400},
    {amount: -11400}
];


const getPositiveIncomeAmount = (data) => {
    return data.filter(item => item.amount >=0)
    .map(item => item.amount)
    .reduce((sum, current) => sum + current);
};
/* console.log(getPositiveIncomeAmount(funds)); */


/* const arr = funds.map(item => item.amount)
.reduce((sum, current) => (funds.some(item => item.amount < 0)) ? sum + current : `dfsd` );
console.log(arr); */


const getTotalIncomeAmount = (data) => {
    return data.map(item => item.amount)
    .reduce((sum, current) => (funds.some(item => item.amount < 0)) ? sum + current : getPositiveIncomeAmount(data));
};

/* console.log(getTotalIncomeAmount(funds)); */