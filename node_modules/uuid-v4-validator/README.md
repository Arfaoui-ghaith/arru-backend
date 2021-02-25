# uuid-v4-validator

![version](https://img.shields.io/npm/v/uuid-v4-validator)
![size](https://img.shields.io/bundlephobia/min/uuid-v4-validator)

Generate, manage and validate easily Universally Unique Identifiers v4

## Description

This package provides a all-in-one class to generate and validate [Universally Unique Identifiers](<https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)>) v4, useful for naming or identify elements in a list, documents in a database, variables etc.

**Is a collision between 2 randomly generated UUIDs possible?**
According to the [Birthday Paradox](https://en.wikipedia.org/wiki/Birthday_problem), the probability of finding a collision between 2 UUID within 103 trillion UUIDs is one in a billion. The number of random UUIDs which need to be generated in order to have a 50% probability of at least one collision is 2.71 quintillion.

## Installation

```cli
npm i uuid-v4-validator
```

## Compatibility

Compatible with Node >=6.2.0

## Features
- Collision test passed on **1 million** instances
- You can manage UUIDs as objects and not as strings
- Supports static generation and validation of UUID v4
- It's developed in order to support inheritance
- Extremely small: it will occupying less than 2kb in your final bundle

### Other features
- Runtime type checking and static with typescript declaration files
- Exhaustive doc comments
- Tree shakable: exported with ESM modules
- Tested with available coverage report


## API

Index

[UUIDv4](#UUIDv4)\
[UUIDv4.id](#UUIDv4id)\
[UUIDv4.blockingError](#UUIDv4blockingError)\
[UUIDv4.generate](#UUIDv4generate)\
[UUIDv4.validate](#UUIDv4validate)\
[UUIDv4.refreshId](#UUIDv4refreshId)

---

### UUIDv4

```import { UUIDv4 } from 'uuid-v4-validator'```

- _Class_
- _Constructor: ( id?: string )_

Create a UUIDv4 instance with an own generated random uuid. You can pass a custom uuid that will be validate.\
⚠ It could generate an error if the provided uuid doesn't pass the validation. For avoid error throwing set [UUIDv4.blockingError](#UUIDv4blockingError) as false.

---

### UUIDv4.id

- _string_

**get**: The current id. It's always valid\
**set**: Set a new custom id. ⚠ Generate an error if the provided id doesn't pass the validation.

---

### UUIDv4.blockingError

- _boolean_

Generate a warn instead of stopping execution at runtime. If you provide an invalid uuid to the constructor, it will generates a new valid one

---

### UUIDv4.generate

- _Function (): string_
- _Return: A valid UUID v4 string_

Generate a new UUID v4 string.

---

### UUIDv4.validate

- _Function ( arg: string | Object | [UUIDv4](UUIDv4) ): boolean_

Returns true if the provided UUID v4 string passes the validation or the provided object or UUIDv4 instance has a valid UUID and shape

---

### UUIDv4.refreshId

- _Function (): void_

Generate a new id that will override the old one

---

## Examples

- Create an UUIDv4 instance with a random generated UUID v4

```js
import { UUIDv4 } from "uuid-v4-validator";

const userId = new UUIDv4();

console.log(userId);
// Returns a UUIDv4 instance
// Expected output: UUIDv4 { _id: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s" }

console.log(userId.id);
// Returns UUID as string
// Expected output: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s"
```

- Create a UUIDv4 instance with a custom string

```js
import { UUIDv4 } from "uuid-v4-validator";

const userId1 = new UUIDv4("s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s");

console.log(userId);
// Returns a UUIDv4 instance
// Expected output: UUIDv4 { _id: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s" }

const userId2 = new UUIDv4("s4F68hF");
// Execution stops due to an error
// Expected output: The provided UUIDv4 "s4F68hF" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one
```

- Validate an UUIDv4 instance, an UUIDv4-like object or an UUID v4 string

```js
import { UUIDv4 } from "uuid-v4-validator";

const importedId = "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s";
console.log(UUIDv4.validate(importedId));
// Returns true if the provided ID passes the validation
// Expected output: true

const importedIdInstance = new UUIDv4();
console.log(UUIDv4.validate(importedIdInstance));
// Returns true if the provided object is a valid UUIDv4 instance and the ID passes the validation
// Expected output: true

const importedIdObject = {
  _id: "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s"
};
console.log(UUIDv4.validate(importedIdObject));
// Returns true if the provided object can be casted into a valid UUIDv4 instance and the ID passes the validation
// Expected output: true
```

- Set a new custom id

```js
import { UUIDv4 } from "uuid-v4-validator";

const uuidv4Instance = new UUIDv4();

const validId = "s4F68hFDf-d3R5-4Rt6-dRgi-dEji85feY51s";
const invalidId = "s4F68";

uuidv4Instance.id = validId;

console.log(uuidv4Instance.id);
// Return true if the provided ID passes the validation
// Expected output: true

uuidv4Instance.id = invalidId;
// Execution stops due to an error
// Expected output: The provided UUIDv4 "s4F68h" string doesn't pass the validation. Use a valid UUIDv4 string or generate a new one
```

### Links

- [RFC 4122](http://tools.ietf.org/html/rfc4122)
- [DCE 1.1: Authentication and Security Services](http://pubs.opengroup.org/onlinepubs/9696989899/chap5.htm#tagcjh_08_02_01_01)

### License

MIT
