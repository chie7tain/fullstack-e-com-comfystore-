import { Homescreen } from "./screens/HomeScreen";

const router = ()=>{
  const main = document.getElementById('main-container');
  main.innerHTML = Homescreen.render();
}