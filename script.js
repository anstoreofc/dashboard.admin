// Fungsi untuk menampilkan data barang pada tabel
    function displayBarangData() {
      var tbody = document.getElementById("barangTableBody");
      tbody.innerHTML = "";
      barangData.forEach(function (barang, index) {
        var row = `
          <tr>
            <td>${barang.nama}</td>
            <td>Rp ${formatRupiah(barang.hargaBeli)}</td>
            <td>Rp ${formatRupiah(barang.hargaJual)}</td>
            <td>Rp ${formatRupiah(calculateKeuntungan(barang.hargaBeli, barang.hargaJual))}</td>
            <td>${barang.tanggal}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="editBarang(${index})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="deleteBarang(${index})">Hapus</button>
            </td>
          </tr>
        `;
        tbody.innerHTML += row;
      });
    }

    // Fungsi untuk menghapus barang
    function deleteBarang(index) {
      barangData.splice(index, 1);
      displayBarangData();
      saveToLocalStorage();
    }

    // Fungsi untuk mengedit barang
    function editBarang(index) {
      var barang = barangData[index];
      var namaBarang = prompt("Nama Barang:", barang.nama);
      var hargaBeli = prompt("Harga Beli:", barang.hargaBeli);
      var hargaJual = prompt("Harga Jual:", barang.hargaJual);
      barangData[index] = { nama: namaBarang, hargaBeli: hargaBeli, hargaJual: hargaJual, tanggal: barang.tanggal };
      displayBarangData();
      saveToLocalStorage();
    }

    // Fungsi untuk menghitung keuntungan
    function calculateKeuntungan(hargaBeli, hargaJual) {
      return hargaJual - hargaBeli;
    }

    // Fungsi untuk menambahkan data hari saat data barang ditambahkan
    function addDayToBarangData() {
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1; // Months are zero-based
      var year = currentDate.getFullYear();

      var formattedDate = day + "/" + month + "/" + year;
      return formattedDate;
    }

    // Fungsi untuk menyimpan data barang ke local storage
    function saveToLocalStorage() {
      localStorage.setItem("barangData", JSON.stringify(barangData));
    }

    // Fungsi untuk mengambil data barang dari local storage (jika ada)
    function getFromLocalStorage() {
      var data = localStorage.getItem("barangData");
      if (data) {
        barangData = JSON.parse(data);
      }
    }

    // Fungsi untuk menambahkan data barang saat form ditambahkan
    function addBarang(event) {
      event.preventDefault();
      var namaBarang = document.getElementById("namaBarang").value;
      var hargaBeli = document.getElementById("hargaBeli").value;
      var hargaJual = document.getElementById("hargaJual").value;
      var tanggalBarang = addDayToBarangData(); // Tambah data hari pada data barang
      var newBarang = { nama: namaBarang, hargaBeli: hargaBeli, hargaJual: hargaJual, tanggal: tanggalBarang };
      barangData.push(newBarang);
      displayBarangData();
      document.getElementById("addBarangForm").reset();
      saveToLocalStorage();
    }

    // Fungsi untuk mengubah angka menjadi format Rupiah
    function formatRupiah(angka) {
      var number_string = angka.toString();
      var split = number_string.split(',');
      var sisa = split[0].length % 3;
      var rupiah = split[0].substr(0, sisa);
      var ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      if (ribuan) {
        var separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }

      return split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    }

    // Data barang yang akan disimpan di local storage
    var barangData = [];

    // Setel form tambah barang
    document.getElementById("addBarangForm").addEventListener("submit", addBarang);

    // Inisialisasi aplikasi dengan memuat data barang dari local storage (jika ada)
    getFromLocalStorage();
    displayBarangData();
