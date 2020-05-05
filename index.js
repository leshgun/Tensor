// 1. Создать массив arr1 из 100 элементов и заполнить его числами от 1 до 100 
// 		в случайном порядке. Каждое число должно встречаться в массиве ровно один раз.

n = 100;

let r1 = 0;
let r2 = 0;
let tmp = 0;
arr1 = [...Array(n+1).keys()];
arr1.shift();
arr1.forEach(function(){
	r1 = Math.floor(Math.random()*n);
	r2 = Math.floor(Math.random()*n);
	tmp = arr1[r1];
	arr1[r1] = arr1[r2];
	arr1[r2] = tmp;
});
console.log('Array 1:', arr1);

// 2. Создать массив arr2, который формируется из массива arr1 следующим образом:
// 		первым элементом нового массива становится последний элемент массива arr1, 
// 		вторым элементом - предпоследний, и т.д.

let arr2 = arr1.slice();
arr2.reverse();
console.log('Array 2:', arr2);

// 3. Создать третий  массив arr3, который формируется как разность соответствующих 
// 		элементов массива arr1 и arr2.

i = -1;
let arr3 = arr1.map(function(){
	i += 1;
	return arr1[i] - arr2[i];
});
console.log('Array 3:', arr3);

// 4. Для третьего массива посчитать среднее арифметическое значение всех элементов.

// console.log(0)
// Всегда будет 0, но необходимо написать реализацию же...

let sum = arr3.reduce(function(acc, i) {
	return acc + i;
});
sum = sum / n;
console.log('Sum:', sum);
