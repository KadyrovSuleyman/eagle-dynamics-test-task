const socket = new WebSocket('ws://localhost:3000');

socket.onopen = (e) => {
  console.log('[open] Соединение установлено');
};

socket.onmessage = (event) => {
  console.log(`[message] Данные получены с сервера: ${event.data}`);
};

socket.onclose = (event) => {
  if (event.wasClean) {
    console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
  } else {
    // например, сервер убил процесс или сеть недоступна
    // обычно в этом случае event.code 1006
    console.log('[close] Соединение прервано');
  }
};

socket.onerror = (error) => {
  console.log(`[error] ${error}`);
};

export default socket;
