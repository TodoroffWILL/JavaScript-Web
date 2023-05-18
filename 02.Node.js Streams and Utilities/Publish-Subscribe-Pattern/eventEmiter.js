const EventEmitter = require('events');

const eventEmitter = new EventEmitter();
/* document.addEventListener('click',()=>{
    console.log(blabla);
})*/
//It works on the same principe like.on! So.on is an eventListener

eventEmitter.on('user-added', () => {
  console.log('New user is added');
});

eventEmitter.on('user-added', (username, age) => {
  // ТАЗИ ФУНКЦИЯ ПРИЕМА ПАРАМЕТРИ
  console.log(`New user is added 2: ${username} (${age}) years old`);
});
eventEmitter.on('user-removed', () => {
  console.log('User is removed');
});

eventEmitter.emit('user-added', 'Doncho', 27); // ТАЗИ ФУНКЦИЯ ПОДАВА ПАРАМЕТРИ
eventEmitter.emit('user-remove');


