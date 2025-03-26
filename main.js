// Mengimpor modul SHA256 dari library crypto-js untuk hashing
const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(index, timestamp, Data, previousHash = '') {
        this.index = index;          // Nomor urut blok dalam blockchain
        this.timestamp = timestamp;  // Waktu saat blok dibuat
        this.Data = Data;            // Data yang disimpan dalam blok
        this.previousHash = previousHash; // Hash dari blok sebelumnya dalam rantai
        this.hash = ''; // Hash blok akan dihitung kemudian
    }

    /*
     * Menghitung hash blok berdasarkan properti yang ada
     * Data diubah menjadi string dengan JSON.stringify sebelum diproses
     */
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.Data)).toString();
    }
}

class Blockchain {
    /**
     * Constructor untuk kelas Blockchain
     * Inisialisasi blockchain dengan blok genesis (blok pertama dalam blockchain)
     */
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Memulai blockchain dengan blok genesis
    }

    /**
     * Membuat blok pertama (genesis block) dalam blockchain
     */
    createGenesisBlock() {
        return new Block(0, "27/3/2025", "Genesis Block", "0"); // Blok pertama
    }

    getLatesBlock() {
        return this.chain[this.chain.length - 1]; // Mengambil blok terakhir dalam array blockchain
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatesBlock().hash; // Menyimpan hash blok sebelumnya
        newBlock.hash = newBlock.calculateHash(); // Menghitung hash baru berdasarkan data yang ada
        this.chain.push(newBlock); // Menambahkan blok ke dalam blockchain
    }
}

// Membuat instance dari blockchain bernama "dickCoin"
let dickCoin = new Blockchain();

// Menambahkan blok baru ke dalam blockchain dengan data transaksi
dickCoin.addBlock(new Block(1, "28/3/2025", { amount: 6 })); // Blok kedua
dickCoin.addBlock(new Block(2, "29/3/2025", { amount: 10 })); // Blok ketiga

// Menampilkan blockchain dalam format JSON agar mudah dibaca
console.log(JSON.stringify(dickCoin, null, 6));
