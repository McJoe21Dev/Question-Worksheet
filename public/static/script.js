/* ================ variables ================  */
const urlParams = new URLSearchParams(location.search);
const p_id = urlParams.get("id");

/* ================ on ready ================  */
$(document).ready(() => {
  /* load styles */
 /* $.get("/static/style.css", css => {
    $("head").append(`<style>${css}</style>`)
  }); */

  /* check for "load" parameter */
  if (!p_id) {
    swal({
      text: "Enter Config ID",
      content: "input",
      button: {
        text: "Check",
        closeModal: true,
      },
    })
      .then(id => {
        load(id);
      });
  } else {
    load(p_id);
  }
});

/* ================ functions ================  */

/* load function */
function load(id) {
  /* fetch local config */
  if(localStorage[`config_${id}`]){
    dom(JSON.parse(localStorage[`config_${id}`]));
    return;
  }
  /* fetch config */
  $.getJSON(`configs/${id}.json`, d => {
    localStorage[`config_${id}`] = JSON.stringify(d);
    dom(d);
  })
  .fail(() => {
    useOnline(id);
  })
}

/* online features */
function useOnline(id) {
  $.getJSON("config.json", d => {
    d["hosts"].forEach(host => {
      $.ajax({
    type: 'get',
    timeout: 5000,
    url: `https://${host}/configs/${id}.json`,
    success: function(d){
        localStorage.set(`config_${id}`, JSON.stringify(d));
        dom(d);
        return true;
    },
    error:function (xhr){
        alert(xhr.status);
        return;
    }
});
      
    });
  });
  return false;
}

/* write to dom */
function dom(d) {
  let g = generate(d);
  $("#header").html(g.header);
  $("#main").html(g.body);
}

/* generate dom content */
function generate(c) {
  let ids = [], header = "", body = "";

  for (let i = 0; i < c.questions; i++) {
    let q = question(c, i + 1);

    if (ids.includes(q.id)) { i -= 1; continue; }

    ids.push(q.id);
    body += `<div class="q-container q${i + 1}-container">
  <p class="q-text q${i + 1}-text" tabindex="-1">${q.text}</p>
  ${c.line ? `<input class="q-input q${i + 1}-input${c.interactive ? "" : " is-disabled"}"${c.interactive ? "" : " disabled"} title="For: ${q.text}" type="text"/>` : ""}
  </div>`;
  }
  header = `<span>Name:</span> <input type="text" value="${c.header.name || ""}"" tabindex="-1">
  <span style="margin-left:100px">Date: <input type="date" tabindex="-1"></span>
  </span>
  <div id="border">
  <h1 style="font-family: Arial;">${c.header.title || ""}</h1>
  <h5>${c.header.sub || ""}${c.header.author ? `, Created by ${c.header.author}` : ""}</h5>
  </div>`;

  return { header, body }
}

/* gets random number */
function ran(a, b) {
  return Math.floor(Math.random() * b) + a;
}

/* generates random question */
function question(d, n) {
  let start = ran(0, d.start.length - 1), middle = ran(0, d.middle.length - 1), end = ran(0, d.end.length - 1);
  let d2 = [
    d.start[start],
    d.middle[middle],
    d.end[end]
  ];

  return { text: `${n}. ${d2[0]} ${d2[1]} ${d2[2]}?`, id: `${start}+${middle}+${end}` };
}
