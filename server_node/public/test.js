const socket = io.connect("http://localhost:3001/")
const init = () => {
  declareEvents();
}

const declareEvents = () => {
  const id_form = document.querySelector("#id_form");
  const id_input = document.querySelector("#id_input");
  id_form.addEventListener("submit", (e) => {
    e.preventDefault();
    // alert(id_input.value)
    socket.emit("clientEvent",id_input.value)
  })

  socket.on("nodeEvent",(msg) => {
    document.querySelector("#div_message").innerHTML += msg + "<br>";
  })
}



init();