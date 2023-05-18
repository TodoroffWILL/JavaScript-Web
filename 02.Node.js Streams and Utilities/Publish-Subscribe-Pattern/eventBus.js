

const listeners = {};

const publish = (eventName, ...eventData) => {
  listeners[eventName]?.forEach((listener) => listener(...eventData)); // ТАЗИ ФУНКЦИЯ ПОДАВА АРГУМЕНТИ КОЙТО СА НУЖНИ !
};

const subscribe = (eventName, eventListener) => {
  if (!listeners[eventName]) {
    listeners[eventName] = [];
  }
  listeners[eventName].push(eventListener);

  return () => {
    console.log('Unsubscribe');
    listeners[eventName] = listeners[eventName].filter(
      (x) => x != eventListener
    );
  };
};

const eventBus = {
  publish,
  subscribe,
};

module.exports = eventBus;
