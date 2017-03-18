import {Assertion} from 'should';

Assertion.add(
  'bufferOf',
  function(value, description) {

    const expected = Buffer.from(value);

    this.params = { operator: 'to be a buffer', expected: expected, description };

    const buffer = Buffer.from(this.obj);
    this.assert(Buffer.compare(buffer, expected) === 0);
  },
false
);