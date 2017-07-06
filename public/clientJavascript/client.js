/**
 * Created by barak on 05/07/2017.
 * solution for the rapidApi challenge.
 */

/**
 * Method for post requests to the server.
 * Sending request to the server with client status in the body.
 */
function barak() {
    var http = new XMLHttpRequest();
    var data = document.getElementById("textArea").value;
    if (data.length === 0)
        return;

    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log("Server responded well - Posted!");
            document.getElementById("postResult").innerHTML = "Posted!";
        }
        if (this.readyState === 4 && this.status === 500) {
            console.log("Server returned 500");
            document.getElementById("postResult").innerHTML = "Something went wrong..";
        }
    };
    var obj = {status: data};
    data = JSON.stringify(obj);
    http.open("POST", "/tweet", true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.send(data);
}