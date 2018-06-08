try {
    $('.button-collapse').sideNav();
    $('.collapsible').collapsible();
    $('select').material_select();
} catch (err) {}
$('#ok').click(function() {
    $('#popup').fadeOut();
    window.location.replace("index.html");
});

function date() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    $("#dateInscription").attr("value", today);
}

var table = document.getElementById('table');
if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].onmouseover = function() {
            //rIndex = this.rowIndex;
            document.getElementById("nom").innerHTML = this.cells[0].innerHTML;
            document.getElementById("prenom").innerHTML = this.cells[1].innerHTML;
            document.getElementById("specialiter").innerHTML = this.cells[5].innerHTML;
            document.getElementById("date-soutenance").innerHTML = this.cells[4].innerHTML;
            document.getElementById("ne").innerHTML = this.cells[2].innerHTML;
            document.getElementById("lieu").innerHTML = this.cells[3].innerHTML;
            document.getElementById("titre").innerHTML = this.cells[9].innerHTML;
            document.getElementById("nom-president").innerHTML = this.cells[6].innerHTML;
            document.getElementById("nom-encadreur").innerHTML = this.cells[7].innerHTML;
            document.getElementById("nom-coencadreur").innerHTML = this.cells[8].innerHTML;
        };
    }
}

function printerDiv() {
    var printContents = document.getElementById('printablediv').innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

function ArrayFromList() {
        var modulecount = 0;
        var x = document.getElementById("mySelect").value;
        var request = new XMLHttpRequest();
        request.open('GET', 'http://127.0.0.1:8000/Administration/module/', true);
        request.onload = function() {
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                data.forEach(coursesList => {
                    console.log(coursesList.nom);
                    if (coursesList.niveau == x) {
                        var elMainSelect = document.getElementById('courses');
                        var frag = document.createDocumentFragment(),
                            elOption;
                        elOption = frag.appendChild(document.createElement('option'));
                        elOption.text = coursesList.nom;
                        elMainSelect.appendChild(frag);
                        modulecount++;
                    }
                });
                CreationEmploitDuTemp(modulecount);
            } else {
                console.log('error');
            }
        }
        request.send();
        //CreationEmploitDuTemp(coursesArray);
    }
    //var courses = ["Math","Physic","Chimy","Science","info","mobile","Security","web"];
function CreationEmploitDuTemp(lenght) {
    var x = document.getElementById("courses");
    var courses = new Array();
    for (i = 0; i < x.length; i++) {
        courses.push(x.options[i].text);
    }
    var coursecategory = ["tp", "td", "cour"];
    var array = [
        ["08:30 - 10:00", "", "", "", "", ""],
        ["10:15 - 11:45", "", "", "", "", ""],
        ["11:45 - 12:30", "P", "A", "U", "S", "E"],
        ["12:30 - 14:00", "", "", "", "", ""],
        ["14:15 - 15:45", "", "", "", "", ""]
    ];
    table = document.getElementById("table");
    table.innerHTML = '';
    for (var i = 0; i < array.length; i++) {
        // create a new row
        var newRow = table.insertRow(table.length);
        for (var j = 0; j < array[i].length; j++) {
            // create a new cell
            var cell = newRow.insertCell(j);
            // add value to the cell
            cell.innerHTML = array[i][j];
        }
    }
    for (var k = 0; k < table.rows.length; k++) {
        // cells
        for (var m = 1; m < table.rows[k].cells.length; m++) {
            table.rows[k].cells[m].innerHTML = coursecategory[Math.floor(Math.random() * 3)] + " " + courses[Math.floor(Math.random() * lenght + 1)];
        }
    }
}

function hideandshow() {
    var x = document.getElementById("title");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    printJS('printable', 'html');
}

function listDoctorant(isAccepted) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://127.0.0.1:8000/Administration/doctorant/', true);
    let result = '';
    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(coursesList => {
                if (coursesList.accepted == isAccepted) {
                    result += `
                <tr>
                <td>${coursesList.nom}</td>
                <td>${coursesList.prenom}</td>
                <td>${coursesList.sexe}</td>
                <td>${coursesList.date_naissance}</td>
                <td>${coursesList.lieu_naissance}</td>
                <td>${coursesList.email}</td>
                <td>${coursesList.addresse}</td>`
                    if (coursesList.accepted == false) {
                        result += `
                <td><button class="waves-effect waves-light btn accept" onclick="AcceptDoctorant(${coursesList.id})" >accepter</button> <button class="waves-effect waves-light btn refuse" onclick="deleteData('${coursesList.id}','doctorant')" >refuser</button></td>
                </tr>
                `;
                    }
                }
            });
        } else {
            console.log('error');
        }
        document.getElementById('result').innerHTML = result;
    }
    request.send();
}

function AcceptDoctorant(reqid) {
    $.ajax({
        url: 'http://127.0.0.1:8000/Administration/doctorant/' + reqid + '/',
        type: "PATCH",
        crossDomain: true,
        data: "accepted=" + true,
        success: function(data) {
            listDoctorant(false);
        }
    });
}

function listRecoursDoctorant() {
    document.getElementById('result').innerHTML = '';
    var request2 = new XMLHttpRequest();
    request2.open('GET', 'http://127.0.0.1:8000/Administration/doctorant/', true);
    request2.onload = function() {
        var data2 = JSON.parse(this.response);
        if (request2.status >= 200 && request2.status < 400) {
            data2.forEach(coursesList => {
                for (let i = 0; i < coursesList.recours.length; i++) {
                    var request = new XMLHttpRequest();
                    request.open('GET', coursesList.recours[i], true);
                    request.onload = function() {
                        var data = JSON.parse(this.response);
                        if (request.status >= 200 && request.status < 400) {
                            if (data.accepted == false) {
                                document.getElementById('result').innerHTML += `
                                <tr>
                                <td>${coursesList.nom}</td>
                                <td>${coursesList.prenom}</td>
                                <td>${data.sujet}</td>
                                <td>${coursesList.email}</td>
                                <td><button class="waves-effect waves-light btn accept" onclick="AcceptRecours('${coursesList.recours[i]}')" >accepter</button> <button class="waves-effect waves-light btn refuse" onclick="deleteRecours('${coursesList.recours[i]}')" >refuser</button></td>
                                </tr>
                                `;
                            }
                        }
                    }
                    request.send();
                }
            });
        } else {
            console.log('error');
        }
    }
    request2.send();
}

function AcceptRecours(requrl) {
    $.ajax({
        url: requrl,
        type: "PATCH",
        crossDomain: true,
        data: "accepted=" + true,
        success: function(data) {
            listRecoursDoctorant();
        }
    });
}

function deleteRecours(requrl) {
    $.ajax({
        url: requrl,
        type: "DELETE",
        data: "",
        success: function(data) {
            listRecoursDoctorant();
        }
    });
}

function listSujet(isAccepted) {
    document.getElementById('result').innerHTML = '';
    var request = new XMLHttpRequest();
    request.open('GET', 'http://127.0.0.1:8000/Administration/sujet/', true);
    let result = '';
    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(coursesList => {
                if (coursesList.accepted == isAccepted) {
                    document.getElementById('result').innerHTML += `
                <tr>
                <td style="width:15%;">${coursesList.titre}</td>
                <td style="width:60%;">${coursesList.description}</td>
                <td style="width:15%;"><button class="waves-effect waves-light btn accept" onclick="AcceptSujet('${coursesList.id}')" >accepter</button> <button class="waves-effect waves-light btn refuse" onclick="deleteSujet('${coursesList.id}','sujet')">	&nbsp;refuser &nbsp;</button></td>
                </tr>
                `;
                }
            });
        } else {
            console.log('error');
        }
    }
    request.send();
}

function deleteSujet(reqid) {
    $.ajax({
        url: 'http://127.0.0.1:8000/Administration/sujet/' + reqid + '/',
        type: "DELETE",
        data: "",
        success: function(data) {
            listSujet(false);
        }
    });
}

function AcceptSujet(reqid, url) {
    $.ajax({
        url: 'http://127.0.0.1:8000/Administration/sujet/' + reqid + '/',
        type: "PATCH",
        data: "accepted=" + true,
        success: function(data) {
            listSujet(false);
        }
    });
}

function listRinscriptionDoctorant() {
    document.getElementById('result').innerHTML = '';
    var request2 = new XMLHttpRequest();
    request2.open('GET', 'http://127.0.0.1:8000/Administration/doctorant/', true);
    request2.onload = function() {
        var data2 = JSON.parse(this.response);
        if (request2.status >= 200 && request2.status < 400) {
            data2.forEach(coursesList => {
                for (let i = 0; i < coursesList.reinscriptions.length; i++) {
                    var request = new XMLHttpRequest();
                    request.open('GET', coursesList.reinscriptions[i], true);
                    request.onload = function() {
                        var data = JSON.parse(this.response);
                        if (request.status >= 200 && request.status < 400) {
                            document.getElementById('result').innerHTML += `
                                <tr>
                                <td>${coursesList.nom}</td>
                                <td>${coursesList.prenom}</td>
                                <td>${coursesList.email}</td>
                                <td>${data.intitulerPostGrade}</td>
                                <td>${data.intitulerSujet}</td>
                                <td>${data.diplomeGraduation}</td>
                                <td>${data.nomEncadreur}</td>
                                <td>${data.nomCoEncadreur}</td>
                                <td>${data.dateReinscription}</td>
                                </tr>
                                `;
                        }
                    }
                    request.send();
                }
            });
        } else {
            console.log('error');
        }
    }
    request2.send();
}

function pvHandler() {
    let today = new Date().toISOString().slice(0, 10)
    var request2 = new XMLHttpRequest();
    request2.open('GET', 'http://127.0.0.1:8000/Administration/doctorant/', true);
    request2.onload = function() {
        var data2 = JSON.parse(this.response);
        if (request2.status >= 200 && request2.status < 400) {
            data2.forEach(coursesList => {
                for (let i = 0; i < coursesList.reinscriptions.length; i++) {
                    var request = new XMLHttpRequest();
                    request.open('GET', coursesList.reinscriptions[i], true);
                    request.onload = function() {
                        var data = JSON.parse(this.response);
                        if (request.status >= 200 && request.status < 400) {
                            document.getElementById('table').innerHTML += `
                                <tr>
                                <td>${coursesList.nom}</td>
                                <td>${coursesList.prenom}</td>
                                <td>${coursesList.date_naissance}</td>
                                <td>${coursesList.lieu_naissance}</td>
                                <td>${today}</td>
                                <td>${data.intitulerPostGrade}</td>
                                <td>president</td>
                                <td>${data.nomEncadreur}</td>
                                <td>${data.nomCoEncadreur}</td>
                                <td>${data.intitulerSujet}</td>
                                <td><button id="imp" class="waves-effect waves-light btn imprimer">imprimer</a> </td>
                                </tr>
                                `;
                        }
                    }
                    request.send();
                }
            });
        } else {
            console.log('error');
        }
    }
    request2.send();
}

function dexiemeInscriptionInscription(id) {
    document.getElementById("inscription").innerHTML = `
    <div class="contact-grids">
    <div id="inscription" class=" col-md-12 contact-form">
    <h4 class="heading">Inscription etape(2)</h4>
                <input type="text" id="etudiant_id" style="visibility: none;" value="${id}" />
                <label>Intitulé de la Post-graduation </label><br>
                <select id="intitulerPostGrade">
                        <option>ARCHITECTURES DES SYSTEMES ET RESEAUXINFORMATIQUES</option>
                        <option>BASES DE DONNEES ET SYSTEMES D'INFORMATION DISTRIBUES</option>
                        <option>BASES DE DONNEES, RESEAUX ET SYSTEMES D'INFORMATION</option>
                        <option>CONDUITE DE PROJETS INFORMATIQUES</option>
                        <option>CRYPTOGRAPHIE ET SECURITE</option>
                        <option>FONDEMENTS ET INGENIERIE DE L'INFORMATION ET DE L'IMAGE (F3I)</option>
                        <option>INFORMATIQUE INDUSTRIELLE</option>
                        <option>TECHNOLOGIE DES APPLICATIONS WEB</option>
                </select><br>
                <label>Intitulé du sujet</label>
                <input id="intitulerSujet" type="text" placeholder="" required=""/>
                <label>Licence / Ingéniorat / DES ou autre Diplôme de graduation obtenu</label>
                <input id="diplomeGraduation" type="text" placeholder="" required=""/>
                <label>Nom et Prénom de l'encadreur en Doctorat</label>
                <input id="nomEncadreur" type="text" placeholder="" required=""/>
                <label>Grade de l'encadreur</label>
                <input id="gradeEncadreur"  type="text" placeholder="" required=""/>
                <label>Nom et Prénom du co-encadreur</label>
                <input id="nomCoEncadreur" type="text" placeholder="" required=""/>
                <label>Grade du co-encadreur</label>
                <input id="gradeCoEncadreur" type="text" placeholder="" required=""/>
                <input style="visibility: none;" type="date" id="dateInscription">
                <div class="submit1" align="center"><br>
                    <button onclick="inscriptionPostGrade()" class="btn btn1">Enregistrer</button>
                </div>
    </div>
</div>
    `;
    date();
}

function premiereInscription() {
    document.getElementById("inscription").innerHTML = `
    <div class="contact-grids">
        <div class=" col-md-12 contact-form">
        <h4 class="heading">Inscription - etape(1)</h4>
                    <label>Nationalité : </label>
                    <input id="nationaliter" type="text" placeholder="" required=""/>
                    <label>Nom : </label>
                    <input id="nom" type="text" placeholder="" required=""/>
                    <label>Prenom : </label>
                    <input id="prenom" type="text" placeholder="" required=""/>
                    <label>Sexe : </label><br>
                    <select id="sexe">
                        <option value="masculin">masculin</option>
                        <option value="feminin">feminin</option>
                    </select>
                    <label>Date de naissance : </label><br>
                    <select id="day" style="width:33%;">
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                    </select>
                    <select id="month" style="width:33%;">
                            <option value="01">Janvier</option>
                            <option value="02">Fevrier</option>
                            <option value="03">Mars</option>
                            <option value="11">Avril</option>
                            <option value="04">May</option>
                            <option value="05">Juin</option>
                            <option value="06">Juiller</option>
                            <option value="07">Aoute</option>
                            <option value="08">Septembre</option>
                            <option value="09">Octobre</option>
                            <option value="10">Novembre</option>
                            <option value="12">Desembre</option>
                    </select>
                    <select id="year" style="width:33%;">
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                    </select>
                    <br><label>Lieu de naissance : </label>
                    <input id="lieu_naissance" type="text" placeholder="" required=""/>
                    <label>Adresse : </label>
                    <input id="addresse" type="text" placeholder="" required=""/>
                    <label>Email : </label>
                    <input id="email" type="email" placeholder="" required=""/>
                    <label>Téléphone : </label>
                    <input id="telephone" style="width:100%" type="number" placeholder="" required=""/>
                    <label>Nom et prénom de la mère : </label>
                    <input id="nom_prenom_mere" type="text" placeholder="" required=""/>
                    <label>Prénom du père : </label>
                    <input id="nom_pere" type="text" placeholder="" required=""/>
                    <label>Mot de passe : </label>
                    <input id="password" minlength="8" type="text" placeholder="" required=""/>
                    <div class="submit1" align="center"><br>
                        <button class="btn btn1" onclick="inscriptionEtudiant()">Enregistrer</button>
                    </div>
        </div>
    </div>
    `;
}

function inscriptionEtudiant() {
    $.ajax({
        url: 'http://127.0.0.1:8000/Administration/doctorant/',
        async: true,
        dataType: 'json',
        type: 'POST',
        data: {
            nationaliter: document.getElementById("nationaliter").value,
            nom: document.getElementById("nom").value,
            prenom: document.getElementById("prenom").value,
            sexe: document.getElementById("sexe").value,
            date_naissance: document.getElementById("year").value + "-" + document.getElementById("month").value + "-" + document.getElementById("day").value,
            lieu_naissance: document.getElementById("lieu_naissance").value,
            addresse: document.getElementById("addresse").value,
            email: document.getElementById("email").value,
            telephone: document.getElementById("telephone").value,
            nom_prenom_mere: document.getElementById("nom_prenom_mere").value,
            nom_pere: document.getElementById("nom_pere").value,
            password: document.getElementById("password").value
        }
    }).done(function(data) {
        dexiemeInscriptionInscription(data.id);
    }).fail(function(xhr, status, error) {
        alert("Veillez saisire tout les champs correctement");
    });

}

function inscriptionPostGrade() {
    $.ajax({
        url: 'http://127.0.0.1:8000/Administration/inscription/',
        async: true,
        dataType: 'json',
        type: 'POST',
        data: {
            doctorant: document.getElementById("etudiant_id").value,
            intitulerPostGrade: document.getElementById("intitulerPostGrade").value,
            intitulerSujet: document.getElementById("intitulerSujet").value,
            diplomeGraduation: document.getElementById("diplomeGraduation").value,
            nomEncadreur: document.getElementById("nomEncadreur").value,
            nomCoEncadreur: document.getElementById("nomCoEncadreur").value,
            dateInscription: document.getElementById("dateInscription").value,
            gradeEncadreur: document.getElementById("gradeEncadreur").value,
            gradeCoEncadreur: document.getElementById("gradeCoEncadreur").value
        }
    }).done(function(data) {
        $('#popup').fadeIn().css('top', $(document).height() / 2);
    }).fail(function(xhr, status, error) {
        alert("Veillez saisire tout les champs correctement");
    });
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function ajouterRecours(id) {
    $.ajax({
        url: 'http://127.0.0.1:8000/Administration/recours/',
        async: true,
        dataType: 'json',
        type: 'POST',
        data: {
            doctorant: id,
            sujet: document.getElementById("sujet").value,
            message: document.getElementById("message").value,
            accepted: false
        }
    }).done(function(data) {
        $('#popup').fadeIn().css('top', $(document).height() / 2);
        window.location.replace("./recours.html");
    }).fail(function(xhr, status, error) {
        alert("Veillez saisire tout les champs correctement");
    });
}

function ajouterPassageGrade(id) {
    $.ajax({
        url: 'http://127.0.0.1:8000/Administration/passagegrade/',
        async: true,
        dataType: 'json',
        type: 'POST',
        data: {
            enseignant: id,
            gradeVoulu: document.getElementById("gradeVoulu").value,
            argument: document.getElementById("argument").value
        }
    }).done(function(data) {
        $('#popup').fadeIn().css('top', $(document).height() / 2);
        window.location.replace("./passagegrade.html");
    }).fail(function(xhr, status, error) {
        alert("Veillez saisire tout les champs correctement");
    });
}