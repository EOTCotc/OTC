export default {
  navbar: ['Terapkan untuk arbitrase ulang', 'Mulai arbitrase'],
  unit: 'rakyat',
  form: {
    title: 'Catatan Khusus:\nMemalsukan dan mengubah voucher pembayaran adalah tindakan ilegal yang serius，Jika Anda mengirimkan kata sandi permintaan yang relevan, harap perhatikan untuk memastikan keamanan aset pribadi',
    event: {
      title: 'acara arbitrase',
      label: 'Bukti informasi teks',
      placeholder: 'Jelaskan keadaan dan berikan informasi yang diperlukan arbiter untuk memverifikasi keadaan',
      type: ['keberatan arbitrase', 'lainnya']
    },
    upload: {
      title: ['Bukti informasi gambar', 'Bukti yang relevan dengan kekuatan hukum'],
    },
    arbitrator: {
      title: 'menambahkan arbiter',
      default: 'bawaan',
    },
    pay: {
      title: 'Perlu membayar',
      explain: {
        start: [
          'menjelaskan: Setelah arbitrase dimulai, platform akan mendelegasikan',
          'arbiter untuk memutuskan',
          'perlu membayar',
          'Jika arbitrase dibatalkan atau arbitrase final menang',
          'Akan dikembalikan ke akun Anda'
        ],
        again: [
          'menjelaskan: Permohonan untuk arbitrase ulang harus dibayar',
          'bawaan arbiter',
          'Satu arbiter tambahan perlu membayar'
        ]
      }
    },
    submit: 'Kirimkan'
  },
  popup: {
    title: 'Konfirmasi kirim dan bayar',
    text: 'Setiap orang hanya dapat mengajukan satu permohonan perpanjangan，Silakan isi dengan hati-hati，Apakah Anda yakin untuk mengirimkan aplikasi untuk perpanjangan dan membayar？',
    checkbox: 'Saya telah mengkonfirmasi',
    submit: 'OK untuk mengirimkan dan membayar',
    cancel: 'biarkan aku berpikir lagi'
  }
}