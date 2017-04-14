window.onload = function(){

	// bring list in from localStorage if applicable

	var listArr = JSON.parse(localStorage.getItem("currentList"));
	var form = document.querySelector("form");
	var list = document.querySelector("ul");
	var span = document.createElement("span");

	if(listArr.length > 0) {
		for (var i=0; i<listArr.length; i++) {
			var oldToDo = document.createElement("li");
			oldToDo.innerText = listArr[i].todo;
			oldToDo.setAttribute("class", "list-group-item");
			oldToDo.setAttribute("ID", i);
			if(listArr[i].done) {
				oldToDo.setAttribute("class", "list-group-item disabled");
			} else {
				oldToDo.setAttribute("class", "list-group-item")
			}
			list.appendChild(oldToDo);
		}
	} else {
		listArr = [];
	}

	var counter = listArr.length;

	// add a new To Do item

	form.addEventListener("submit", function(event){
		var newToDo = document.createElement("li");
		newToDo.innerText = form.elements[0].value;
		newToDo.setAttribute("class", "list-group-item");
		newToDo.setAttribute("done", "false");
		newToDo.setAttribute("ID", counter);
		counter += 1;
		if (newToDo.innerText.length === 0) {
			form.preventDefault();
		} else {
			list.appendChild(newToDo);
			listArr.push({
				todo: newToDo.innerText,
				done: false
			});
			localStorage.setItem("currentList", JSON.stringify(listArr));
			form.reset();
		}
	});

	// mark an item as completed

	list.addEventListener("click", function(event){
		if (event.target.getAttribute("class") === "list-group-item") {
			event.target.setAttribute("class", "list-group-item disabled");
			for (var i=0; i<listArr.length; i++) {
				if(listArr[i].todo === event.target.innerText) {
					listArr[i].done = true;
				}
			}
		} else {
			event.target.setAttribute("class", "list-group-item");
			for (var i=0; i<listArr.length; i++) {
				if(listArr[i].todo === event.target.innerText) {
					listArr[i].done = false;
				}
			}
		}
		localStorage.setItem("currentList", JSON.stringify(listArr));
	});

	// remove an item

	list.addEventListener("mouseover", function(event){
		event.target.appendChild(span);
		span.setAttribute("class", "glyphicon glyphicon-remove pull-right");
	});

	span.addEventListener("click", function(event){
		event.target.parentNode.remove();
		var id = event.target.parentNode.getAttribute("ID");
		listArr.splice(id,1);
		localStorage.setItem("currentList", JSON.stringify(listArr));
	});

};