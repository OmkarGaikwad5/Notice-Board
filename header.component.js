let createButton = document.getElementsByClassName("create")[0];
let editButton = document.getElementsByClassName("edit")[0];
let viewButton = document.getElementsByClassName("view")[0];
let deleteButton = document.getElementsByClassName("delete")[0];

let buttons = document.getElementsByClassName("buttons")[0];

let isButtonView = false;
let buttonView = document.getElementsByClassName("buttons")[0];

let NoticeView = document.getElementsByClassName("NoticeView")[0];

let NoticeCraft = document.getElementsByClassName("NoticeCraft")[0];
let noticeContent = document.getElementsByClassName("notice")[0];
let craftButton = document.getElementById("craftButton");
NoticeCraft.style = "display: none;";
craftButton.style = "display: none;";


let notices = [];


createButton.addEventListener("click", () => {
    NoticeCraft.style = "display: block;";
    craftButton.style = "display: block;";
    craftButton.textContent = "Create Notice";
});


editButton.addEventListener("click", () => {
    NoticeCraft.style = "display: block;";
    craftButton.style = "display: block;";
    craftButton.textContent = "Edit Notice";
});

deleteButton.addEventListener("click", () => {
    NoticeCraft.style = "display: block;";
    craftButton.style = "display: block;";
    craftButton.textContent = "Delete Notice";
});

viewButton.addEventListener("click", () => {
    
});

craftButton.addEventListener("click", (el) => {
    let button = checkButton(el.target.innerHTML);
    if (button == 1) {
        createNotice();
    } else if (button == 2) {
        editNotice(craftButton.accessKey);
    } else if (button == 3) {
        viewNotice();
    } else if (button == 0) {
        deleteNotice();
    }
});

function checkButton (target) {
    if (target == "Create Notice") {
        return 1;
    } else if (target == "Edit Notice") {
        return 2;
    } else if (target == "Delete Notice") {
        return 0;
    } else if (target == "View Notice") {
        return 3;
    } else {
        return -1;
    }
}

const noticeElements = (data) => {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let box = document.createElement("div");
    let del = document.createElement("button");
    let edit = document.createElement("button");
    craftNotice(div, p, box, del, edit, data);
}

const craftNotice = (div, p, box, del, edit, data) => {
    div.classList.add("displayNotice");
    p.textContent = data;
    del.textContent = "delete";
    edit.textContent = "edit";
    edit.accessKey = notices.length
    del.accessKey = notices.length
    box.appendChild(del);
    box.appendChild(edit);
    div.appendChild(p);
    div.appendChild(box);
    NoticeView.appendChild(div);
    box.classList.add("box");
    edit.addEventListener('click', (el) => {
        NoticeCraft.style = "display: block";
        craftButton.textContent = "Edit Notice"
        noticeContent.value = notices[el.target.accessKey - 1];
        craftButton.accessKey = el.target.accessKey - 1;
    });
    del.addEventListener("click", (el) => {
        deleteNotice(el.target.accessKey);
    })
}

const createNotice = () => {
    const data = noticeContent.value;
    noticeContent.value = "";
    notices.push(data);
    noticeElements(data);
    NoticeCraft.style = "display: none;";
}
const editNotice = (key) => {
    notices[key] = noticeContent.value;
    noticeContent.value = "";
    NoticeView.innerHTML = "";
    notices.forEach(notice => {
        noticeElements(notice);
    });
}
const viewNotice = () => {
    let search = document.createElement("input");
    document.body.appendChild(search);
    search.style = 'display: block';
    let n = notices.includes(search.value);
    
}
const deleteNotice = (key) => {
    let delEl = notices[key - 1];
    notices = notices.filter(el => el != delEl);
    NoticeView.innerHTML = "";
    notices.forEach(notice => {
        noticeElements(notice);
    });
}
