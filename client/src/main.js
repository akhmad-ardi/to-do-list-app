import { createApp } from "vue";
import App from "./App.vue";
import routes from "./routes/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

// font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faCheckSquare, faTrash, faSquarePlus, faSquareXmark, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faInstagramSquare, faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// icon solid
library.add(faBars, faCheckSquare, faTrash, faSquarePlus, faSquareXmark, faRightFromBracket);
// icon brand
library.add(faInstagramSquare, faGithubSquare, faLinkedin);

const app = createApp(App);
app.use(routes);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
