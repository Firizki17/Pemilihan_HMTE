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

  const voteData = {
    nama: userNama,
    npm: userNpm,
    pilihan: name,
    waktu: new Date().toLocaleString()
  };

  fetch('https://script.google.com/macros/s/AKfycbwFMi2tqrLkVGlDHzs8vVlTRHE6jZNN2OSujzgZCUZCXtBAI-5Sf3g68cianK5uWxD-/exec', {
    method: 'POST',
    body: JSON.stringify(voteData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      localStorage.setItem('voted', JSON.stringify(voteData));
      document.getElementById('status').innerText = `Kamu memilih ${name}. Terima kasih!`;
    } else {
      document.getElementById('status').innerText = 'Terjadi kesalahan, coba lagi.';
    }
  })
  .catch(() => {
    document.getElementById('status').innerText = 'Terjadi kesalahan koneksi.';
  });
}
