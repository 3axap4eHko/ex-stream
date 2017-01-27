'use strict';

import {PassThrough} from 'stream';
import Csvify from '../src/Csvify';


const testCase1 = `
a,b,c,d,e
a,b,c,d,e
`;
const testCase1Expect = [
  [ 'a', 'b', 'c', 'd', 'e' ],
  [ 'a', 'b', 'c', 'd', 'e' ]
];

const testCase2 = `
a,"b,b",c,d,e
a,"b,b",c,d,e
`;
const testCase2Expect = [
  [ 'a', 'b,b', 'c', 'd', 'e' ],
  [ 'a', 'b,b', 'c', 'd', 'e' ]
];

const testCase3 = `
a,"b\nb",c,d,e
a,"b\nb",c,d,e
`;
const testCase3Expect = [
  [ 'a', 'b\nb', 'c', 'd', 'e' ],
  [ 'a', 'b\nb', 'c', 'd', 'e' ]
];



describe('Csvify Test Suite', () => {

  it('Test case 1', done => {
    const csv = new Csvify();
    let counter = 0;
    csv.on('data', data => {
      const {records, id} = data;
      records.should.be.eql(testCase1Expect[id]);
      counter ++;
    });
    csv.on('end', () => {
      counter.should.be.exactly(testCase1Expect.length);
      done();
    });
    csv.end(testCase1)
  });

  it('Test case 2', done => {
    const csv = new Csvify();
    let counter = 0;
    csv.on('data', ({records, id}) => {
      records.should.be.eql(testCase2Expect[id]);
      counter ++;
    });
    csv.on('end', () => {
      counter.should.be.exactly(testCase2Expect.length);
      done();
    });
    csv.end(testCase2)
  });

  it('Test case 3', done => {
    const csv = new Csvify();
    let counter = 0;
    csv.on('data', ({records, id}) => {
      records.should.be.eql(testCase3Expect[id]);
      counter ++;
    });
    csv.on('end', () => {
      counter.should.be.exactly(testCase3Expect.length);
      done();
    });
    csv.end(testCase3)
  });

});