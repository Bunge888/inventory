import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyCbqYHEkbK8rlmTEvT7IRxamrueBVOvf2o",
  authDomain: "insan-cemerlang-25a53.firebaseapp.com",
  projectId: "insan-cemerlang-25a53",
  storageBucket: "insan-cemerlang-25a53.appspot.com",
  messagingSenderId: "383282706725",
  appId: "1:383282706725:web:bf9fd56cea37cb3a0fc2cc",
  measurementId: "G-31EQF6PDVN"
};

// inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function ambilDaftarbarang() {
  const refDokumen = collection(basisdata, "inventory");
  const kueri = query(refDokumen, orderBy("item"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      harga: dokumen.data().harga,
      jumlah: dokumen.data().jumlah
    })
  })

  return hasilKueri;
}
export async function hapusbarang(id) {
  await deleteDoc(doc(basisdata, "barang", id))
}


export async function tambahbarang(item, harga, jumlah) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "inventory"), {
      item: item,
      harga: harga,
      jumlah: jumlah
    })

    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data buah")
  } catch (error) {
    // menampilkan pesan gagal
    console.log("gagal menyimpan data buah")
  }
}