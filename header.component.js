let createButton = document.getElementsByClassName("create")[0];
let viewButton = document.getElementsByClassName("view")[0];

let home = document.getElementById("home");
let buttons = document.getElementsByClassName("buttons")[0];
let isButtonView = false;
let buttonView = document.getElementsByClassName("buttons")[0];

let searchEl = document.getElementById("search");
let searchInput = document.getElementById("searchVal")
let cancelSearch = document.getElementById("cancel");
let searchBtn = document.getElementById("submit");

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

cancelSearch.addEventListener("click", () => {
    searchEl.style = "display: none";
})

viewButton.addEventListener("click", () => {
    searchEl.style = "display: block";
});

home.addEventListener("click", () => {
    NoticeView.innerHTML = "";
    NoticeCraft.style = "display: none";
    notices.forEach(notice => {
        noticeElements(notice);
    })
})

craftButton.addEventListener("click", (el) => {
    let button = checkButton(el.target.innerHTML);
    console.log(button)
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
    del.classList.add('button');
    del.style = "color: red;";
    edit.classList.add('button');
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
    NoticeCraft.style = "display: none;"
}
const viewNotice = () => {
    console.log("Fired!")
    searchEl.style = "display: block";
    
}
const deleteNotice = (key) => {
    let delEl = notices[key - 1];
    notices = notices.filter(el => el != delEl);
    NoticeView.innerHTML = "";
    notices.forEach(notice => {
        noticeElements(notice);
    });
}

searchBtn.addEventListener("click", () => {
    searchEl.style = "display: none";
    let snap = searchInput.value;
    let snapShot = notices.filter(el => el.search(snap) != -1);
    NoticeView.innerHTML = "";
    snapShot.forEach(res => {
        noticeElements(res);
    });
});