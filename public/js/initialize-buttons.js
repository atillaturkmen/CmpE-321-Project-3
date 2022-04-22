/**
 * adds on click to all buttons in root. 
 * redirects clicks to route/button_id
 * @param {*} route
 */
function initializeButtons(route) {
    let children = document.body.childNodes;
    let buttons = Array.from(children).filter(child => child.nodeName == "BUTTON");
    buttons.forEach((button) => {
        let id = button.id;
        if (id == "logout") {
            document.getElementById("logout").onclick = function () {
                window.location = "/logout";
            };
        } else {
            document.getElementById(id).onclick = function () {
                window.location = `${route}/${id}`;
            };
        }
    });
}
