var term,
    protocol,
    socketURL,
    socket;

var terminalContainer = document.getElementById('terminal-container');
var optionElements = {
  cursorBlink: document.querySelector('#option-cursor-blink')
};

optionElements.cursorBlink.addEventListener('change', createTerminal);

createTerminal();

function createTerminal() {
  while (terminalContainer.children.length) {
    terminalContainer.removeChild(terminalContainer.children[0]);
  }
  term = new Terminal({
    cursorBlink: optionElements.cursorBlink.checked
  });
  protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
  socketURL = protocol + location.hostname + ((location.port) ? (':' + 8888) : '') + '';
  socket = new WebSocket(socketURL);
  
  term.open(terminalContainer);
  term.fit();

  socket.onopen = runRealTerminal;
  // socket.onclose = runFakeTerminal;
  // socket.onerror = runFakeTerminal;
  socket.onmessage = function(e){
    // term.write(e.data);
    // console.log(e.data)
    // term.prompt();
    setTimeout(()=>{term.prompt()})

  };
}

window.onresize = function() {
    term.fit();
};
function runRealTerminal() {
  term.attach(socket);
  term._initialized = true;
}

// function runFakeTerminal() {
//   if (term._initialized) {
//     return;
//   }

//   term._initialized = true;

  
// }
var shellprompt = '$ ';

  term.prompt = function () {
    term.write('\r\n' + shellprompt);
  };

  term.writeln('Welcome to xterm.js');
  term.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
  term.writeln('Type some keys and commands to play around.');
  term.writeln('');
  term.prompt();

  term.on('key', function (key, ev) {
    var printable = (
      !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
    );
    if (ev.keyCode == 13) {
      // socket.send("sadsadsad");
      // console.log(term.children[term.refreshEnd].innerHTML.replace(/&nbsp;/g,' ').replace(/\$ /,'').replace(/<span.*/,''))
      // socket.send(term.children[term.refreshEnd].innerHTML.replace(/&nbsp;/g,' ').replace(/\$ /,'').replace(/<span.*/,''))
      // term.prompt();
      term.write('\r\n')
    } else if (ev.keyCode == 8) {
      /*
     * Do not delete the prompt
     */
      if (term.x > 2) {
        term.write('\b \b');
      }
    } else if (ev.keyCode == 9) {
    } else if (printable) {
      term.write(key);
    }
  });

  term.on('paste', function (data, ev) {
    term.write(data);
  });
