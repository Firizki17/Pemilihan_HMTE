let userNama = '';
let userNpm = '';

function enableVoting() {
  const nama = document.getElementById('nama').value.trim();
  const npm = document.getElementById('npm').value.trim();

  if (!nama || !npm) {
    alert("Nama dan NPM wajib diisi.");
    return;
  }

  userNama = nama;
  userNpm = npm;

  document.querySelector('.form-group').style.display = 'none';
  document.getElementById('candidates').style.display = 'grid';
}

function vote(name) {
  if (localStorage.getItem('voted')) {
    document.getElementById('status').innerText = "Kamu sudah memilih!";
    return;
  }

  const formData = new FormData();
  formData.append('entry.1726704042', userNama);  // Nama Lengkap
  formData.append('entry.207986353', userNpm);    // NPM
  formData.append('entry.958644190', name);       // Pilihan Ketua

  fetch('https://docs.google.com/forms/d/e/1FAIpQLSd8zayxC0_DFgMnbjJx2iNysRjS53Mo2Kd5GzZcE38-bTuN5Q/formResponse', {
    method: 'POST',
    mode: 'no-cors',  // agar CORS tidak jadi masalah
    body: formData
  })
  .then(() => {
    localStorage.setItem('voted', JSON.stringify({ nama: userNama, npm: userNpm, pilihan: name }));
    document.getElementById('status').innerText = `Kamu memilih ${name}. Terima kasih!`;
  })
  .catch(() => {
    document.getElementById('status').innerText = 'Terjadi kesalahan koneksi.';
  });
}
