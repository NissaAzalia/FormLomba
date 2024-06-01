const judul = document.getElementById("judul");

// element button
const elDaftar = document.getElementById("btn-dftr");
const elCancel = document.getElementById("btn-cancelRg");
const elEdit = document.getElementById("btn-edit");
const elHapus = document.getElementById("btn-hapus");

const eldaftarlist = document.getElementById("list");

// element data
const inputNama = document.getElementById("nama");
const inputKelas = document.getElementById("kelas");
const inputNohp = document.getElementById("nohp");
const inputLomba = document.getElementById("lomba");

let editingIndex = null;

// localStorage
let listArray = JSON.parse(localStorage.getItem("listArray")) || [];

//simpan
elDaftar.addEventListener(`click`, (event) => {
    event.preventDefault();
    const daftar = {
        nama: inputNama.value,
        kelas: inputKelas.value,
        noHp: inputNohp.value,
        lomba: inputLomba.value
    };

    if (editingIndex != null) {
        listArray[editingIndex] = daftar
        editingIndex = null;
    } else {
        listArray.push(daftar)
    }
    initialize();
    saveToLocalStorage();

    inputNama.value = "",
    inputKelas.value = "",
    inputNohp.value = "",
    inputLomba.value = ""

    judul.innerHTML = "PENDAFTARAN LOMBA"
})

//cancel
elCancel.addEventListener(`click`, (event) => {
    event.preventDefault();
    inputNama.value = "",
    inputKelas.value = "",
    inputNohp.value = "", 
    inputLomba.value = ""

    editingIndex = null;
    judul.innerHTML = "PENDAFTARAN LOMBA"
})

// initialize
const initialize = () => {
    eldaftarlist.innerHTML = ""

    for (let idx in listArray) {
        eldaftarlist.innerHTML += `
            <div class="isian">
                <div class="item">
                    <span><b>Nama   :</b> ${listArray[idx].nama}</span>
                    <span><b>Kelas  :</b> ${listArray[idx].kelas}</span>
                    <span><b>No Hp  :</b> ${listArray[idx].noHp}</span>
                    <span><b>Kategori lomba:</b> ${listArray[idx].lomba} </span>
                </div>
                <div class="butn">
                    <button class="btn-edt" id="btn-edit" onClick="editHandler(${idx})">Edit</button>
                    <button class="btn-hps" id="btn-hapus" onClick="hapusHandler(${idx})">Hapus</button>
                </div>
            </div>`
    }
}
initialize()

// hapus
const hapusHandler = (idx) => {
    // const yakin = confirm("Apakah anda yakin akan menghapus data tersebut?")
        listArray.splice(idx, 1)
        saveToLocalStorage();
    
    initialize()
}

//edit
const editHandler = (idx) => {
    judul.innerHTML = "Edit Pendaftaran"
    const dataTerpilih = listArray[idx]
    editingIndex = idx

    inputNama.value = dataTerpilih.nama
    inputKelas.value = dataTerpilih.kelas
    inputNohp.value = dataTerpilih.noHp
    inputLomba.value = dataTerpilih.lomba
};

// localStorage
const saveToLocalStorage = () => {
    localStorage.setItem("listArray", JSON.stringify(listArray));
};
initialize();