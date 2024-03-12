function serialize(numbers) {
  // Сортировка и удаление дубликатов
  numbers = Array.from(new Set(numbers)).sort((a, b) => a - b);

  let result = [];
  let start = numbers[0];
  let end = start;

  numbers.push(null); // Маркер конца массива
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === end + 1) {
      end = numbers[i];
    } else {
      if (start === end) {
        result.push(start.toString(36));
      } else {
        result.push(start.toString(36) + "-" + end.toString(36));
      }
      start = end = numbers[i];
    }
  }

  return result.join(",");
}

function deserialize(str) {
  let ranges = str.split(",");
  let numbers = [];

  for (let range of ranges) {
    if (range.includes("-")) {
      let [start, end] = range.split("-").map((s) => parseInt(s, 36));
      for (let i = start; i <= end; i++) {
        numbers.push(i);
      }
    } else {
      numbers.push(parseInt(range, 36));
    }
  }

  return numbers;
}

// Тесты
let tests = [
  { input: [1, 2, 3, 5], expected: "1-3,5" }, // Простейший случай
  // Добавьте здесь другие тестовые случаи...
];

tests.forEach((test) => {
  let serialized = serialize(test.input);
  let deserialized = deserialize(serialized);
  console.log(`Исходный массив: ${test.input}`);
  console.log(`Сериализованная строка: ${serialized}`);
  console.log(`Десериализованный массив: ${deserialized}`);
  console.log(
    `Коэффициент сжатия: ${(
      JSON.stringify(test.input).length / serialized.length
    ).toFixed(2)}`
  );
  console.log("---");
});
