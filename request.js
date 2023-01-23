'use strict'
const http = require('http');

// http.request('http://localhost:3000/bicycle',{ 
//   method: 'POST',
//   headers: {'content-type': 'application/json'}
// },
// (res) => res.pipe(process.stdout))
//  .end(JSON.stringify({data: {brand: 'Ferrari', color: 'red'}}));



//  http.request('http://localhost:3000/bicycle',{ 
//   method: 'POST',
//   headers: {'content-type': 'application/json'}
// },
// (res) => {
//   res.setEncoding('utf8'); 
//   res.on('data', console.log.bind(null, res.statusCode + res.statusMessage))
// })
//  .end(JSON.stringify({data: {brand: 'Ferrari', color: 'red'}}));


// http.request('http://localhost:3000/bicycle/1', 
// { method: 'post'}, 
// ({statusCode}) => console.log(statusCode)).end()


// http.request('http://localhost:3000/bicycle/99', 
//   { method: 'put', 
//   headers: {'content-type': 'application/json'}}, 
//   (res) => console.log(res.statusCode)).end(JSON.stringify({data: {brand: 'VanMoof', color: 'black'}}));

//http.get('http://localhost:3000/bicycle/1', (res) => (res).pipe(process.stdout));

// const url = new URL("http://localhost:3000/bicycle/1?abc=2");

// for (const [key, value] of  url.searchParams) {
//   console.log(key);
//   console.log(value);
// }

const {Readable} = require('stream');
const assert = require('assert');

async function readableToString2(readable) {
  let result = 'a';
  // for await (const chunk of readable) {
  //   result += chunk;
  // }

  await readable.on('data', (chunk) => result += chunk);

  return  result;
}

const readable = Readable.from('Good morning!', {encoding: 'utf8'});
readableToString2(readable).then(console.log);