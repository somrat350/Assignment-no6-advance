### 1) What is the difference between var, let, and const?
#### Answer:
In javascript, var is function-scoped and hoisted with undefined, which often creates bugs. Let and const is block-scoped and introduced in ES6. The difference between them is: let allows reassignment, while const cannot be reassigned. In modern javascript we mostly use let and const instead of var.

### 2) What is the difference between map(), forEach(), and filter()? 
#### Answer:
forEach() used for iteration without returning anything.
map() transforms each element and return a new array of the same length.
filter() returns a new array with only the elements that match a condition.

### 3) What are arrow functions in ES6?
#### Answer:
Arrow functions are a shorter syntax for writing functions, it introduced in ES6. They don't have their own this, arguments, or super keyword. Instead, they use this from the surrounding scope.


### 4) How does destructuring assignment work in ES6?
#### Answer:
Destructuring in ES6 is a way to extract values from arrays or properties from objects into distinct variables, using a shorter and cleaner syntax.


### 5) Explain template literals in ES6. How are they different from string concatenation?
#### Answer:
Template literals in ES6 are strings written with backticks. They allow embedding variables and expressions, and also support multi-line strings. Unlike old string concatenation with +, template literals make the code cleaner, more readable, and easier to maintain.