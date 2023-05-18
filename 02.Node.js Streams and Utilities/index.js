const eventBus = require('./eventBus');

/* document.addEventListener('click',()=>{
    console.log(blabla);
})*/ 
//It works on the same principe like subscribe! So subscribe is an eventListener 

eventBus.subscribe('user-added', () => {
  console.log('New user is added');
});

const unsubscribe = eventBus.subscribe('user-added', (username,age) => { // ТАЗИ ФУНКЦИЯ ПРИЕМА ПАРАМЕТРИ
  console.log(`New user is added 2: ${username} (${age}) years old`);
});
eventBus.subscribe('user-removed', () => {
  console.log('User is removed');
});

eventBus.publish('user-added', 'Doncho' , 27); // ТАЗИ ФУНКЦИЯ ПОДАВА ПАРАМЕТРИ
eventBus.publish('user-remove');

unsubscribe();
eventBus.publish('user-added', 'Doncho' , 27);